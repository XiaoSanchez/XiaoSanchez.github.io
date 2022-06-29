(function($) {

    // Global initialisation flag
    var initialized = false;

    // For detecting browser prefix and capabilities
    var element = document.createElement('div');
    var vendors = 'moz ms o webkit'.split(' ');
    var toupper = function(str) { return str.toUpperCase(); };

    // Establish vendor prefix and CSS 3D support
    var vendor;

    for (var prop, i = 0; i < vendors.length; i++) {

        prop = (vendor = vendors[i]) + 'Perspective';
        if (prop in element.style || prop.replace(/^(\w)/, toupper) in element.style) break;
    }

    var canRun = !!vendor;
    var prefix = '-' + vendor + '-';

    var $this, $root, $base, $kids, $node, $item, $over, $back;
    var wait, anim, last;

    // Public API
    var api = {

        // Toggle open / closed
        toggle: function() {

            $this = $(this);
            $this.project($this.hasClass('open') ? 'close' : 'open');
        },

        // Trigger the unfold animation
        open: function(speed, overlap, easing) {

            // Cache DOM references
            $this = $(this);
            $root = $this.find('.root');
            $kids = $this.find('.node').not($root);

            // Establish values or fallbacks
            speed = utils.resolve($this, 'speed', speed);
            easing = utils.resolve($this, 'easing', easing);
            overlap = utils.resolve($this, 'overlap', overlap);

            $kids.each(function(index, el) {

                // Establish settings for this iteration
                anim = 'unfold' + (!index ? '-first' : '');
                last = index === $kids.length - 1;
                time = speed * (1 - overlap);
                wait = index * time;

                // Cache DOM references
                $item = $(el);
                $over = $item.find('.over');

                // Element animation
                $item.css(utils.prefix({
                    'transform': 'rotateX(180deg)',
                    'animation': anim + ' ' + speed + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));

                // Shading animation happens when the next item starts
                if (!last) wait = (index + 1) * time;

                // Shading animation
                $over.css(utils.prefix({
                    'animation': 'unfold-over ' + (speed * 0.45) + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));
            });

            // Add momentum to the container
            $root.css(utils.prefix({
                'animation': 'swing-out ' + ($kids.length * time * 1.4) + 's ease-in-out 0s 1 normal forwards'
            }));

            $this.addClass('open');
        },

        // Trigger the fold animation
        close: function(speed, overlap, easing) {

            // Cache DOM references
            $this = $(this);
            $root = $this.find('.root');
            $kids = $this.find('.node').not($root);

            // Establish values or fallbacks
            speed = utils.resolve($this, 'speed', speed) * 0.66;
            easing = utils.resolve($this, 'easing', easing);
            overlap = utils.resolve($this, 'overlap', overlap);

            $kids.each(function(index, el) {

                // Establish settings for this iteration
                anim = 'fold' + (!index ? '-first' : '');
                last = index === 0;
                time = speed * (1 - overlap);
                wait = ($kids.length - index - 1) * time;

                // Cache DOM references
                $item = $(el);
                $over = $item.find('.over');

                // Element animation
                $item.css(utils.prefix({
                    'transform': 'rotateX(0deg)',
                    'animation': anim + ' ' + speed + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));

                // Adjust delay for shading
                if (!last) wait = (($kids.length - index - 2) * time) + (speed * 0.35);

                // Shading animation
                $over.css(utils.prefix({
                    'animation': 'fold-over ' + (speed * 0.45) + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));
            });

            // Add momentum to the container
            $root.css(utils.prefix({
                'animation': 'swing-in ' + ($kids.length * time * 1.0) + 's ease-in-out 0s 1 normal forwards'
            }));

            $this.removeClass('open');
        }
    };

    // Utils
    var utils = {

        // Resolves argument values to defaults
        resolve: function($el, key, val) {
            return typeof val === 'undefined' ? $el.data(key) : val;
        },

        // Prefixes a hash of styles with the current vendor
        prefix: function(style) {

            for (var key in style) {
                style[prefix + key] = style[key];
            }

            return style;
        },

        // Inserts rules into the document styles
        inject: function(rule) {

            try {

                var style = document.createElement('style');
                style.innerHTML = rule;
                document.getElementsByTagName('head')[0].appendChild(style);

            } catch (error) {}
        },

        keyframes: function(name, frames) {

            var anim = '@' + prefix + 'keyframes ' + name + '{';

            for (var frame in frames)

                anim += frame + '%' + '{' + prefix + frames[frame] + ';}';

            utils.inject(anim + '}');
        }
    };

    // Element templates
    var markup = {
        node: '<span class="node"/>',
        back: '<span class="face back"/>',
        over: '<span class="face over"/>'
    };

    // Plugin definition
    $.fn.project = function(options) {

        // Notify if 3D isn't available
        if (!canRun) {

            var message = 'Failed to detect CSS 3D support';

            if (console && console.warn) {

                // Print warning to the console
                console.warn(message);

                // Trigger errors on elements
                this.each(function() {
                    $(this).trigger('error', message);
                });
            }

            return;
        }

        // Fires only once
        if (!initialized) {

            initialized = true;

            // Unfold

            utils.keyframes('unfold', {
                0: 'transform: rotateX(180deg)',
                50: 'transform: rotateX(-30deg)',
                100: 'transform: rotateX(0deg)'
            });

            // Unfold (first item)
            utils.keyframes('unfold-first', {
                0: 'transform: rotateX(-90deg)',
                50: 'transform: rotateX(60deg)',
                100: 'transform: rotateX(0deg)'
            });

            // Fold
            utils.keyframes('fold', {
                0: 'transform: rotateX(0deg)',
                100: 'transform: rotateX(180deg)'
            });

            // Fold (first item)
            utils.keyframes('fold-first', {
                0: 'transform: rotateX(0deg)',
                100: 'transform: rotateX(-180deg)'
            });

            // Swing out
            utils.keyframes('swing-out', {
                0: 'transform: rotateX(0deg)',
                30: 'transform: rotateX(-30deg)',
                60: 'transform: rotateX(15deg)',
                100: 'transform: rotateX(0deg)'
            });

            // Swing in
            utils.keyframes('swing-in', {
                0: 'transform: rotateX(0deg)',
                50: 'transform: rotateX(-10deg)',
                90: 'transform: rotateX(15deg)',
                100: 'transform: rotateX(0deg)'
            });

            // Shading (unfold)
            utils.keyframes('unfold-over', {
                0: 'opacity: 1.0',
                100: 'opacity: 0.0'
            });

            // Shading (fold)
            utils.keyframes('fold-over', {
                0: 'opacity: 0.0',
                100: 'opacity: 1.0'
            });

            // Node styles
            utils.inject('.node {' +
                'position: relative;' +
                'display: block;' +
                '}');

            // Face styles
            utils.inject('.face {' +
                'pointer-events: none;' +
                'position: absolute;' +
                'display: block;' +
                'height: 100%;' +
                'width: 100%;' +
                'left: 0;' +
                'top: 0;' +
                '}');
        }

        // Merge options & defaults
        var opts = $.extend({}, $.fn.project.defaults, options);

        // Extract api method arguments
        var args = Array.prototype.slice.call(arguments, 1);

        // Main plugin loop
        return this.each(function() {

            // If the user is calling a method...
            if (api[options]) {
                return api[options].apply(this, args);
            }

            // Store options in view
            $this = $(this).data(opts);

            // Only proceed if the scene hierarchy isn't already built
            if (!$this.data('initialized')) {

                $this.data('initialized', true);

                // Select the first level of matching child elements
                $kids = $this.children(opts.selector);

                // Build a scene graph for elements
                $root = $(markup.node).addClass('root');
                $base = $root;

                // Process each element and insert into hierarchy
                $kids.each(function(index, el) {

                    $item = $(el);

                    // Which animation should this node use?
                    anim = 'fold' + (!index ? '-first' : '');

                    // Since we're adding absolutely positioned children
                    $item.css('position', 'relative');

                    // Give the item some depth to avoid clipping artefacts
                    $item.css(utils.prefix({
                        'transform-style': 'preserve-3d',
                        'transform': 'translateZ(-0.1px)'
                    }));

                    // Create back face
                    $back = $(markup.back);
                    $back.css('background', $item.css('background'));
                    $back.css(utils.prefix({ 'transform': 'translateZ(-0.1px)' }));

                    // Create shading
                    $over = $(markup.over);
                    $over.css(utils.prefix({ 'transform': 'translateZ(0.1px)' }));
                    $over.css({
                        'background': opts.shading,
                        'opacity': 0.0
                    });

                    // Begin folded
                    $node = $(markup.node).append($item);
                    $node.css(utils.prefix({
                        'transform-origin': '50% 0%',
                        'transform-style': 'preserve-3d',
                        'animation': anim + ' 1ms linear 0s 1 normal forwards'
                    }));

                    // Build display list
                    $item.append($over);
                    $item.append($back);
                    $base.append($node);

                    // Use as parent in next iteration
                    $base = $node;
                });

                // Set root transform settings
                $root.css(utils.prefix({
                    'transform-origin': '50% 0%',
                    'transform-style': 'preserve-3d'
                }));

                // Apply perspective
                $this.css(utils.prefix({
                    'transform': 'perspective(' + opts.perspective + 'px)'
                }));

                // Display the scene
                $this.append($root);
            }
        });
    };

    // Default options
    $.fn.project.defaults = {

        // Perspective to apply to rotating elements
        perspective: 1200,

        // Default shading to apply (null => no shading)
        shading: 'rgba(0,0,0,0.12)',

        // Area of rotation (fraction or pixel value)
        selector: null,

        // Fraction of speed (0-1)
        overlap: 0.6,

        // Duration per element
        speed: 0.8,

        // Animation curve
        easing: 'ease-in-out'
    };

    $.fn.project.enabled = canRun;

})(jQuery);

! function(e) {
    for (var r, t, o = !1, a = document.createElement("div"), n = "moz ms o webkit".split(" "), s = function(e) { return e.toUpperCase() }, i = 0; i < n.length && (t = (r = n[i]) + "Perspective", !(t in a.style || t.replace(/^(\w)/, s) in a.style)); i++);
    var f, d, l, c, m, p, u, g, v, y, h, k = !!r,
        X = "-" + r + "-",
        x = { toggle: function() { f = e(this), f.project(f.hasClass("open") ? "close" : "open") }, open: function(r, t, o) { f = e(this), d = f.find(".root"), c = f.find(".node").not(d), r = w.resolve(f, "speed", r), o = w.resolve(f, "easing", o), t = w.resolve(f, "overlap", t), c.each(function(a, n) { y = "unfold" + (a ? "" : "-first"), h = a === c.length - 1, time = r * (1 - t), v = a * time, p = e(n), u = p.find(".over"), p.css(w.prefix({ transform: "rotateX(180deg)", animation: y + " " + r + "s " + o + " " + v + "s 1 normal forwards" })), h || (v = (a + 1) * time), u.css(w.prefix({ animation: "unfold-over " + .45 * r + "s " + o + " " + v + "s 1 normal forwards" })) }), d.css(w.prefix({ animation: "swing-out " + 1.4 * c.length * time + "s ease-in-out 0s 1 normal forwards" })), f.addClass("open") }, close: function(r, t, o) { f = e(this), d = f.find(".root"), c = f.find(".node").not(d), r = .66 * w.resolve(f, "speed", r), o = w.resolve(f, "easing", o), t = w.resolve(f, "overlap", t), c.each(function(a, n) { y = "fold" + (a ? "" : "-first"), h = 0 === a, time = r * (1 - t), v = (c.length - a - 1) * time, p = e(n), u = p.find(".over"), p.css(w.prefix({ transform: "rotateX(0deg)", animation: y + " " + r + "s " + o + " " + v + "s 1 normal forwards" })), h || (v = (c.length - a - 2) * time + .35 * r), u.css(w.prefix({ animation: "fold-over " + .45 * r + "s " + o + " " + v + "s 1 normal forwards" })) }), d.css(w.prefix({ animation: "swing-in " + 1 * c.length * time + "s ease-in-out 0s 1 normal forwards" })), f.removeClass("open") } },
        w = {
            resolve: function(e, r, t) { return "undefined" == typeof t ? e.data(r) : t },
            prefix: function(e) { for (var r in e) e[X + r] = e[r]; return e },
            inject: function(e) {
                try {
                    var r = document.createElement("style");
                    r.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(r)
                } catch (t) {}
            },
            keyframes: function(e, r) {
                var t = "@" + X + "keyframes " + e + "{";
                for (var o in r) t += o + "%" + "{" + X + r[o] + ";}";
                w.inject(t + "}")
            }
        },
        b = { node: '<span class="node"/>', back: '<span class="face back"/>', over: '<span class="face over"/>' };
    e.fn.project = function(r) {
        if (!k) { var t = "Failed to detect CSS 3D support"; return console && console.warn && (console.warn(t), this.each(function() { e(this).trigger("error", t) })), void 0 }
        o || (o = !0, w.keyframes("unfold", { 0: "transform: rotateX(180deg)", 50: "transform: rotateX(-30deg)", 100: "transform: rotateX(0deg)" }), w.keyframes("unfold-first", { 0: "transform: rotateX(-90deg)", 50: "transform: rotateX(60deg)", 100: "transform: rotateX(0deg)" }), w.keyframes("fold", { 0: "transform: rotateX(0deg)", 100: "transform: rotateX(180deg)" }), w.keyframes("fold-first", { 0: "transform: rotateX(0deg)", 100: "transform: rotateX(-180deg)" }), w.keyframes("swing-out", { 0: "transform: rotateX(0deg)", 30: "transform: rotateX(-30deg)", 60: "transform: rotateX(15deg)", 100: "transform: rotateX(0deg)" }), w.keyframes("swing-in", { 0: "transform: rotateX(0deg)", 50: "transform: rotateX(-10deg)", 90: "transform: rotateX(15deg)", 100: "transform: rotateX(0deg)" }), w.keyframes("unfold-over", { 0: "opacity: 1.0", 100: "opacity: 0.0" }), w.keyframes("fold-over", { 0: "opacity: 0.0", 100: "opacity: 1.0" }), w.inject(".node {position: relative;display: block;}"), w.inject(".face {pointer-events: none;position: absolute;display: block;height: 100%;width: 100%;left: 0;top: 0;}"));
        var a = e.extend({}, e.fn.project.defaults, r),
            n = Array.prototype.slice.call(arguments, 1);
        return this.each(function() { return x[r] ? x[r].apply(this, n) : (f = e(this).data(a), f.data("initialized") || (f.data("initialized", !0), c = f.children(a.selector), d = e(b.node).addClass("root"), l = d, c.each(function(r, t) { p = e(t), y = "fold" + (r ? "" : "-first"), p.css("position", "relative"), p.css(w.prefix({ "transform-style": "preserve-3d", transform: "translateZ(-0.1px)" })), g = e(b.back), g.css("background", p.css("background")), g.css(w.prefix({ transform: "translateZ(-0.1px)" })), u = e(b.over), u.css(w.prefix({ transform: "translateZ(0.1px)" })), u.css({ background: a.shading, opacity: 0 }), m = e(b.node).append(p), m.css(w.prefix({ "transform-origin": "50% 0%", "transform-style": "preserve-3d", animation: y + " 1ms linear 0s 1 normal forwards" })), p.append(u), p.append(g), l.append(m), l = m }), d.css(w.prefix({ "transform-origin": "50% 0%", "transform-style": "preserve-3d" })), f.css(w.prefix({ transform: "perspective(" + a.perspective + "px)" })), f.append(d)), void 0) })
    }, e.fn.project.defaults = { perspective: 1200, shading: "rgba(0,0,0,0.12)", selector: null, overlap: .6, speed: .8, easing: "ease-in-out" }, e.fn.project.enabled = k
}(jQuery);