/*! Stellar.js v0.6.2 | Copyright 2014, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */ ! function(a, b, c, d) {
    function e(b, c) { this.element = b, this.options = a.extend({}, g, c), this._defaults = g, this._name = f, this.init() }
    var f = "stellar",
        g = { scrollProperty: "scroll", positionProperty: "position", horizontalScrolling: !0, verticalScrolling: !0, horizontalOffset: 0, verticalOffset: 0, responsive: !1, parallaxBackgrounds: !0, parallaxElements: !0, hideDistantElements: !0, hideElement: function(a) { a.hide() }, showElement: function(a) { a.show() } },
        h = { scroll: { getLeft: function(a) { return a.scrollLeft() }, setLeft: function(a, b) { a.scrollLeft(b) }, getTop: function(a) { return a.scrollTop() }, setTop: function(a, b) { a.scrollTop(b) } }, position: { getLeft: function(a) { return -1 * parseInt(a.css("left"), 10) }, getTop: function(a) { return -1 * parseInt(a.css("top"), 10) } }, margin: { getLeft: function(a) { return -1 * parseInt(a.css("margin-left"), 10) }, getTop: function(a) { return -1 * parseInt(a.css("margin-top"), 10) } }, transform: { getLeft: function(a) { var b = getComputedStyle(a[0])[k]; return "none" !== b ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[4], 10) : 0 }, getTop: function(a) { var b = getComputedStyle(a[0])[k]; return "none" !== b ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[5], 10) : 0 } } },
        i = { position: { setLeft: function(a, b) { a.css("left", b) }, setTop: function(a, b) { a.css("top", b) } }, transform: { setPosition: function(a, b, c, d, e) { a[0].style[k] = "translate3d(" + (b - c) + "px, " + (d - e) + "px, 0)" } } },
        j = function() {
            var b, c = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                d = a("script")[0].style,
                e = "";
            for (b in d)
                if (c.test(b)) { e = b.match(c)[0]; break }
            return "WebkitOpacity" in d && (e = "Webkit"), "KhtmlOpacity" in d && (e = "Khtml"),
                function(a) { return e + (e.length > 0 ? a.charAt(0).toUpperCase() + a.slice(1) : a) }
        }(),
        k = j("transform"),
        l = a("<div />", { style: "background:#fff" }).css("background-position-x") !== d,
        m = l ? function(a, b, c) { a.css({ "background-position-x": b, "background-position-y": c }) } : function(a, b, c) { a.css("background-position", b + " " + c) },
        n = l ? function(a) { return [a.css("background-position-x"), a.css("background-position-y")] } : function(a) { return a.css("background-position").split(" ") },
        o = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function(a) { setTimeout(a, 1e3 / 60) };
    e.prototype = {
        init: function() { this.options.name = f + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({ firstLoad: !0 }), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop() },
        _defineElements: function() { this.element === c.body && (this.element = b), this.$scrollElement = a(this.element), this.$element = this.element === b ? a("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== d ? a(this.options.viewportElement) : this.$scrollElement[0] === b || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent() },
        _defineGetters: function() {
            var a = this,
                b = h[a.options.scrollProperty];
            this._getScrollLeft = function() { return b.getLeft(a.$scrollElement) }, this._getScrollTop = function() { return b.getTop(a.$scrollElement) }
        },
        _defineSetters: function() {
            var b = this,
                c = h[b.options.scrollProperty],
                d = i[b.options.positionProperty],
                e = c.setLeft,
                f = c.setTop;
            this._setScrollLeft = "function" == typeof e ? function(a) { e(b.$scrollElement, a) } : a.noop, this._setScrollTop = "function" == typeof f ? function(a) { f(b.$scrollElement, a) } : a.noop, this._setPosition = d.setPosition || function(a, c, e, f, g) { b.options.horizontalScrolling && d.setLeft(a, c, e), b.options.verticalScrolling && d.setTop(a, f, g) }
        },
        _handleWindowLoadAndResize: function() {
            var c = this,
                d = a(b);
            c.options.responsive && d.bind("load." + this.name, function() { c.refresh() }), d.bind("resize." + this.name, function() { c._detectViewport(), c.options.responsive && c.refresh() })
        },
        refresh: function(c) {
            var d = this,
                e = d._getScrollLeft(),
                f = d._getScrollTop();
            c && c.firstLoad || this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), c && c.firstLoad && /WebKit/.test(navigator.userAgent) && a(b).load(function() {
                var a = d._getScrollLeft(),
                    b = d._getScrollTop();
                d._setScrollLeft(a + 1), d._setScrollTop(b + 1), d._setScrollLeft(a), d._setScrollTop(b)
            }), this._setScrollLeft(e), this._setScrollTop(f)
        },
        _detectViewport: function() {
            var a = this.$viewportElement.offset(),
                b = null !== a && a !== d;
            this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = b ? a.top : 0, this.viewportOffsetLeft = b ? a.left : 0
        },
        _findParticles: function() {
            {
                var b = this;
                this._getScrollLeft(), this._getScrollTop()
            }
            if (this.particles !== d)
                for (var c = this.particles.length - 1; c >= 0; c--) this.particles[c].$element.data("stellar-elementIsActive", d);
            this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function() {
                var c, e, f, g, h, i, j, k, l, m = a(this),
                    n = 0,
                    o = 0,
                    p = 0,
                    q = 0;
                if (m.data("stellar-elementIsActive")) { if (m.data("stellar-elementIsActive") !== this) return } else m.data("stellar-elementIsActive", this);
                b.options.showElement(m), m.data("stellar-startingLeft") ? (m.css("left", m.data("stellar-startingLeft")), m.css("top", m.data("stellar-startingTop"))) : (m.data("stellar-startingLeft", m.css("left")), m.data("stellar-startingTop", m.css("top"))), f = m.position().left, g = m.position().top, h = "auto" === m.css("margin-left") ? 0 : parseInt(m.css("margin-left"), 10), i = "auto" === m.css("margin-top") ? 0 : parseInt(m.css("margin-top"), 10), k = m.offset().left - h, l = m.offset().top - i, m.parents().each(function() { var b = a(this); return b.data("stellar-offset-parent") === !0 ? (n = p, o = q, j = b, !1) : (p += b.position().left, void(q += b.position().top)) }), c = m.data("stellar-horizontal-offset") !== d ? m.data("stellar-horizontal-offset") : j !== d && j.data("stellar-horizontal-offset") !== d ? j.data("stellar-horizontal-offset") : b.horizontalOffset, e = m.data("stellar-vertical-offset") !== d ? m.data("stellar-vertical-offset") : j !== d && j.data("stellar-vertical-offset") !== d ? j.data("stellar-vertical-offset") : b.verticalOffset, b.particles.push({ $element: m, $offsetParent: j, isFixed: "fixed" === m.css("position"), horizontalOffset: c, verticalOffset: e, startingPositionLeft: f, startingPositionTop: g, startingOffsetLeft: k, startingOffsetTop: l, parentOffsetLeft: n, parentOffsetTop: o, stellarRatio: m.data("stellar-ratio") !== d ? m.data("stellar-ratio") : 1, width: m.outerWidth(!0), height: m.outerHeight(!0), isHidden: !1 })
            })
        },
        _findBackgrounds: function() {
            var b, c = this,
                e = this._getScrollLeft(),
                f = this._getScrollTop();
            this.backgrounds = [], this.options.parallaxBackgrounds && (b = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (b = b.add(this.$element)), b.each(function() {
                var b, g, h, i, j, k, l, o = a(this),
                    p = n(o),
                    q = 0,
                    r = 0,
                    s = 0,
                    t = 0;
                if (o.data("stellar-backgroundIsActive")) { if (o.data("stellar-backgroundIsActive") !== this) return } else o.data("stellar-backgroundIsActive", this);
                o.data("stellar-backgroundStartingLeft") ? m(o, o.data("stellar-backgroundStartingLeft"), o.data("stellar-backgroundStartingTop")) : (o.data("stellar-backgroundStartingLeft", p[0]), o.data("stellar-backgroundStartingTop", p[1])), h = "auto" === o.css("margin-left") ? 0 : parseInt(o.css("margin-left"), 10), i = "auto" === o.css("margin-top") ? 0 : parseInt(o.css("margin-top"), 10), j = o.offset().left - h - e, k = o.offset().top - i - f, o.parents().each(function() { var b = a(this); return b.data("stellar-offset-parent") === !0 ? (q = s, r = t, l = b, !1) : (s += b.position().left, void(t += b.position().top)) }), b = o.data("stellar-horizontal-offset") !== d ? o.data("stellar-horizontal-offset") : l !== d && l.data("stellar-horizontal-offset") !== d ? l.data("stellar-horizontal-offset") : c.horizontalOffset, g = o.data("stellar-vertical-offset") !== d ? o.data("stellar-vertical-offset") : l !== d && l.data("stellar-vertical-offset") !== d ? l.data("stellar-vertical-offset") : c.verticalOffset, c.backgrounds.push({ $element: o, $offsetParent: l, isFixed: "fixed" === o.css("background-attachment"), horizontalOffset: b, verticalOffset: g, startingValueLeft: p[0], startingValueTop: p[1], startingBackgroundPositionLeft: isNaN(parseInt(p[0], 10)) ? 0 : parseInt(p[0], 10), startingBackgroundPositionTop: isNaN(parseInt(p[1], 10)) ? 0 : parseInt(p[1], 10), startingPositionLeft: o.position().left, startingPositionTop: o.position().top, startingOffsetLeft: j, startingOffsetTop: k, parentOffsetLeft: q, parentOffsetTop: r, stellarRatio: o.data("stellar-background-ratio") === d ? 1 : o.data("stellar-background-ratio") })
            }))
        },
        _reset: function() { var a, b, c, d, e; for (e = this.particles.length - 1; e >= 0; e--) a = this.particles[e], b = a.$element.data("stellar-startingLeft"), c = a.$element.data("stellar-startingTop"), this._setPosition(a.$element, b, b, c, c), this.options.showElement(a.$element), a.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null); for (e = this.backgrounds.length - 1; e >= 0; e--) d = this.backgrounds[e], d.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), m(d.$element, d.startingValueLeft, d.startingValueTop) },
        destroy: function() { this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = a.noop, a(b).unbind("load." + this.name).unbind("resize." + this.name) },
        _setOffsets: function() {
            var c = this,
                d = a(b);
            d.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), d.bind("resize.horizontal-" + this.name, function() { c.horizontalOffset = c.options.horizontalOffset() })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), d.bind("resize.vertical-" + this.name, function() { c.verticalOffset = c.options.verticalOffset() })) : this.verticalOffset = this.options.verticalOffset
        },
        _repositionElements: function() {
            var a, b, c, d, e, f, g, h, i, j, k = this._getScrollLeft(),
                l = this._getScrollTop(),
                n = !0,
                o = !0;
            if (this.currentScrollLeft !== k || this.currentScrollTop !== l || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) { for (this.currentScrollLeft = k, this.currentScrollTop = l, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, j = this.particles.length - 1; j >= 0; j--) a = this.particles[j], b = a.isFixed ? 1 : 0, this.options.horizontalScrolling ? (f = (k + a.horizontalOffset + this.viewportOffsetLeft + a.startingPositionLeft - a.startingOffsetLeft + a.parentOffsetLeft) * -(a.stellarRatio + b - 1) + a.startingPositionLeft, h = f - a.startingPositionLeft + a.startingOffsetLeft) : (f = a.startingPositionLeft, h = a.startingOffsetLeft), this.options.verticalScrolling ? (g = (l + a.verticalOffset + this.viewportOffsetTop + a.startingPositionTop - a.startingOffsetTop + a.parentOffsetTop) * -(a.stellarRatio + b - 1) + a.startingPositionTop, i = g - a.startingPositionTop + a.startingOffsetTop) : (g = a.startingPositionTop, i = a.startingOffsetTop), this.options.hideDistantElements && (o = !this.options.horizontalScrolling || h + a.width > (a.isFixed ? 0 : k) && h < (a.isFixed ? 0 : k) + this.viewportWidth + this.viewportOffsetLeft, n = !this.options.verticalScrolling || i + a.height > (a.isFixed ? 0 : l) && i < (a.isFixed ? 0 : l) + this.viewportHeight + this.viewportOffsetTop), o && n ? (a.isHidden && (this.options.showElement(a.$element), a.isHidden = !1), this._setPosition(a.$element, f, a.startingPositionLeft, g, a.startingPositionTop)) : a.isHidden || (this.options.hideElement(a.$element), a.isHidden = !0); for (j = this.backgrounds.length - 1; j >= 0; j--) c = this.backgrounds[j], b = c.isFixed ? 0 : 1, d = this.options.horizontalScrolling ? (k + c.horizontalOffset - this.viewportOffsetLeft - c.startingOffsetLeft + c.parentOffsetLeft - c.startingBackgroundPositionLeft) * (b - c.stellarRatio) + "px" : c.startingValueLeft, e = this.options.verticalScrolling ? (l + c.verticalOffset - this.viewportOffsetTop - c.startingOffsetTop + c.parentOffsetTop - c.startingBackgroundPositionTop) * (b - c.stellarRatio) + "px" : c.startingValueTop, m(c.$element, d, e) }
        },
        _handleScrollEvent: function() {
            var a = this,
                b = !1,
                c = function() { a._repositionElements(), b = !1 },
                d = function() { b || (o(c), b = !0) };
            this.$scrollElement.bind("scroll." + this.name, d), d()
        },
        _startAnimationLoop: function() {
            var a = this;
            this._animationLoop = function() { o(a._animationLoop), a._repositionElements() }, this._animationLoop()
        }
    }, a.fn[f] = function(b) {
        var c = arguments;
        return b === d || "object" == typeof b ? this.each(function() { a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b)) }) : "string" == typeof b && "_" !== b[0] && "init" !== b ? this.each(function() {
            var d = a.data(this, "plugin_" + f);
            d instanceof e && "function" == typeof d[b] && d[b].apply(d, Array.prototype.slice.call(c, 1)), "destroy" === b && a.data(this, "plugin_" + f, null)
        }) : void 0
    }, a[f] = function() { var c = a(b); return c.stellar.apply(c, Array.prototype.slice.call(arguments, 0)) }, a[f].scrollProperty = h, a[f].positionProperty = i, b.Stellar = e
}(jQuery, this, document);

/*!
 * jQuery Smooth Scroll - v1.5.6 - 2015-09-08
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2015 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
! function(t) { "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? t(require("jquery")) : t(jQuery) }(function(t) {
    function e(t) { return t.replace(/(:|\.|\/)/g, "\\$1") }
    var l = "1.5.6",
        o = {},
        n = { exclude: [], excludeWithin: [], offset: 0, direction: "top", scrollElement: null, scrollTarget: null, beforeScroll: function() {}, afterScroll: function() {}, easing: "swing", speed: 400, autoCoefficient: 2, preventDefault: !0 },
        s = function(e) {
            var l = [],
                o = !1,
                n = e.dir && "left" === e.dir ? "scrollLeft" : "scrollTop";
            return this.each(function() { var e = t(this); if (this !== document && this !== window) return !document.scrollingElement || this !== document.documentElement && this !== document.body ? (e[n]() > 0 ? l.push(this) : (e[n](1), o = e[n]() > 0, o && l.push(this), e[n](0)), void 0) : (l.push(document.scrollingElement), !1) }), l.length || this.each(function() { "BODY" === this.nodeName && (l = [this]) }), "first" === e.el && l.length > 1 && (l = [l[0]]), l
        };
    t.fn.extend({
        scrollable: function(t) { var e = s.call(this, { dir: t }); return this.pushStack(e) },
        firstScrollable: function(t) { var e = s.call(this, { el: "first", dir: t }); return this.pushStack(e) },
        smoothScroll: function(l, o) {
            if (l = l || {}, "options" === l) return o ? this.each(function() {
                var e = t(this),
                    l = t.extend(e.data("ssOpts") || {}, o);
                t(this).data("ssOpts", l)
            }) : this.first().data("ssOpts");
            var n = t.extend({}, t.fn.smoothScroll.defaults, l),
                s = t.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll", function(l) {
                var o = this,
                    r = t(this),
                    i = t.extend({}, n, r.data("ssOpts") || {}),
                    c = n.exclude,
                    a = i.excludeWithin,
                    f = 0,
                    u = 0,
                    h = !0,
                    d = {},
                    m = location.hostname === o.hostname || !o.hostname,
                    p = i.scrollTarget || t.smoothScroll.filterPath(o.pathname) === s,
                    g = e(o.hash);
                if (i.scrollTarget || m && p && g) { for (; h && f < c.length;) r.is(e(c[f++])) && (h = !1); for (; h && u < a.length;) r.closest(a[u++]).length && (h = !1) } else h = !1;
                h && (i.preventDefault && l.preventDefault(), t.extend(d, i, { scrollTarget: i.scrollTarget || g, link: o }), t.smoothScroll(d))
            }), this
        }
    }), t.smoothScroll = function(e, l) {
        if ("options" === e && "object" == typeof l) return t.extend(o, l);
        var n, s, r, i, c, a = 0,
            f = "offset",
            u = "scrollTop",
            h = {},
            d = {};
        "number" == typeof e ? (n = t.extend({ link: null }, t.fn.smoothScroll.defaults, o), r = e) : (n = t.extend({ link: null }, t.fn.smoothScroll.defaults, e || {}, o), n.scrollElement && (f = "position", "static" === n.scrollElement.css("position") && n.scrollElement.css("position", "relative"))), u = "left" === n.direction ? "scrollLeft" : u, n.scrollElement ? (s = n.scrollElement, /^(?:HTML|BODY)$/.test(s[0].nodeName) || (a = s[u]())) : s = t("html, body").firstScrollable(n.direction), n.beforeScroll.call(s, n), r = "number" == typeof e ? e : l || t(n.scrollTarget)[f]() && t(n.scrollTarget)[f]()[n.direction] || 0, h[u] = r + a + n.offset, i = n.speed, "auto" === i && (c = h[u] - s.scrollTop(), 0 > c && (c *= -1), i = c / n.autoCoefficient), d = { duration: i, easing: n.easing, complete: function() { n.afterScroll.call(n.link, n) } }, n.step && (d.step = n.step), s.length ? s.stop().animate(h, d) : n.afterScroll.call(n.link, n)
    }, t.smoothScroll.version = l, t.smoothScroll.filterPath = function(t) { return t = t || "", t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "") }, t.fn.smoothScroll.defaults = n
});

/*!
 * Isotope PACKAGED v2.1.1
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t) {
    function e() {}

    function i(t) {
        function i(e) { e.prototype.option || (e.prototype.option = function(e) { t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e)) }) }

        function n(e, i) {
            t.fn[e] = function(n) {
                if ("string" == typeof n) {
                    for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                        var p = this[a],
                            h = t.data(p, e);
                        if (h)
                            if (t.isFunction(h[n]) && "_" !== n.charAt(0)) { var f = h[n].apply(h, s); if (void 0 !== f) return f } else r("no such method '" + n + "' for " + e + " instance");
                        else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var o = t.data(this, e);
                    o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
                })
            }
        }
        if (t) { var r = "undefined" == typeof console ? e : function(t) { console.error(t) }; return t.bridget = function(t, e) { i(e), n(t, e) }, t.bridget }
    }
    var o = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : "object" == typeof exports ? i(require("jquery")) : i(t.jQuery)
})(window),
function(t) {
    function e(e) { var i = t.event; return i.target = i.target || i.srcElement || e, i }
    var i = document.documentElement,
        o = function() {};
    i.addEventListener ? o = function(t, e, i) { t.addEventListener(e, i, !1) } : i.attachEvent && (o = function(t, i, o) {
        t[i + o] = o.handleEvent ? function() {
            var i = e(t);
            o.handleEvent.call(o, i)
        } : function() {
            var i = e(t);
            o.call(t, i)
        }, t.attachEvent("on" + i, t[i + o])
    });
    var n = function() {};
    i.removeEventListener ? n = function(t, e, i) { t.removeEventListener(e, i, !1) } : i.detachEvent && (n = function(t, e, i) { t.detachEvent("on" + e, t[e + i]); try { delete t[e + i] } catch (o) { t[e + i] = void 0 } });
    var r = { bind: o, unbind: n };
    "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function(t) {
    function e(t) { "function" == typeof t && (e.isReady ? t() : s.push(t)) }

    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== r.readyState;
        e.isReady || i || o()
    }

    function o() {
        e.isReady = !0;
        for (var t = 0, i = s.length; i > t; t++) {
            var o = s[t];
            o()
        }
    }

    function n(n) { return "complete" === r.readyState ? o() : (n.bind(r, "DOMContentLoaded", i), n.bind(r, "readystatechange", i), n.bind(t, "load", i)), e }
    var r = t.document,
        s = [];
    e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], n) : "object" == typeof exports ? module.exports = n(require("eventie")) : t.docReady = n(t.eventie)
}(window),
function() {
    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) { return function() { return this[t].apply(this, arguments) } }
    var o = t.prototype,
        n = this,
        r = n.EventEmitter;
    o.getListeners = function(t) { var e, i, o = this._getEvents(); if (t instanceof RegExp) { e = {}; for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i]) } else e = o[t] || (o[t] = []); return e }, o.flattenListeners = function(t) { var e, i = []; for (e = 0; t.length > e; e += 1) i.push(t[e].listener); return i }, o.getListenersAsObject = function(t) { var e, i = this.getListeners(t); return i instanceof Array && (e = {}, e[t] = i), e || i }, o.addListener = function(t, i) {
        var o, n = this.getListenersAsObject(t),
            r = "object" == typeof i;
        for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : { listener: i, once: !1 });
        return this
    }, o.on = i("addListener"), o.addOnceListener = function(t, e) { return this.addListener(t, { listener: e, once: !0 }) }, o.once = i("addOnceListener"), o.defineEvent = function(t) { return this.getListeners(t), this }, o.defineEvents = function(t) { for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]); return this }, o.removeListener = function(t, i) { var o, n, r = this.getListenersAsObject(t); for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1)); return this }, o.off = i("removeListener"), o.addListeners = function(t, e) { return this.manipulateListeners(!1, t, e) }, o.removeListeners = function(t, e) { return this.manipulateListeners(!0, t, e) }, o.manipulateListeners = function(t, e, i) {
        var o, n, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--;) r.call(this, e, i[o]);
        else
            for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
        return this
    }, o.removeEvent = function(t) {
        var e, i = typeof t,
            o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
            for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this
    }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
        var i, o, n, r, s = this.getListenersAsObject(t);
        for (n in s)
            if (s.hasOwnProperty(n))
                for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, o.trigger = i("emitEvent"), o.emit = function(t) { var e = Array.prototype.slice.call(arguments, 1); return this.emitEvent(t, e) }, o.setOnceReturnValue = function(t) { return this._onceReturnValue = t, this }, o._getOnceReturnValue = function() { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, o._getEvents = function() { return this._events || (this._events = {}) }, t.noConflict = function() { return n.EventEmitter = r, t }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() { return t }) : "object" == typeof module && module.exports ? module.exports = t : n.EventEmitter = t
}.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof o[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, n = 0, r = i.length; r > n; n++)
                    if (e = i[n] + t, "string" == typeof o[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            o = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() { return e }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t) {
        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function i() {}

        function o() {
            for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0, i = s.length; i > e; e++) {
                var o = s[e];
                t[o] = 0
            }
            return t
        }

        function n(i) {
            function n() {
                if (!d) {
                    d = !0;
                    var o = t.getComputedStyle;
                    if (p = function() { var t = o ? function(t) { return o(t, null) } : function(t) { return t.currentStyle }; return function(e) { var i = t(e); return i || r("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? " + "See http://bit.ly/getsizebug1"), i } }(), h = i("boxSizing")) {
                        var n = document.createElement("div");
                        n.style.width = "200px", n.style.padding = "1px 2px 3px 4px", n.style.borderStyle = "solid", n.style.borderWidth = "1px 2px 3px 4px", n.style[h] = "border-box";
                        var s = document.body || document.documentElement;
                        s.appendChild(n);
                        var a = p(n);
                        f = 200 === e(a.width), s.removeChild(n)
                    }
                }
            }

            function a(t) {
                if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var i = p(t);
                    if ("none" === i.display) return o();
                    var r = {};
                    r.width = t.offsetWidth, r.height = t.offsetHeight;
                    for (var a = r.isBorderBox = !(!h || !i[h] || "border-box" !== i[h]), d = 0, l = s.length; l > d; d++) {
                        var c = s[d],
                            y = i[c];
                        y = u(t, y);
                        var m = parseFloat(y);
                        r[c] = isNaN(m) ? 0 : m
                    }
                    var g = r.paddingLeft + r.paddingRight,
                        v = r.paddingTop + r.paddingBottom,
                        _ = r.marginLeft + r.marginRight,
                        I = r.marginTop + r.marginBottom,
                        L = r.borderLeftWidth + r.borderRightWidth,
                        z = r.borderTopWidth + r.borderBottomWidth,
                        b = a && f,
                        x = e(i.width);
                    x !== !1 && (r.width = x + (b ? 0 : g + L));
                    var S = e(i.height);
                    return S !== !1 && (r.height = S + (b ? 0 : v + z)), r.innerWidth = r.width - (g + L), r.innerHeight = r.height - (v + z), r.outerWidth = r.width + _, r.outerHeight = r.height + I, r
                }
            }

            function u(e, i) {
                if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
                var o = e.style,
                    n = o.left,
                    r = e.runtimeStyle,
                    s = r && r.left;
                return s && (r.left = e.currentStyle.left), o.left = i, i = o.pixelLeft, o.left = n, s && (r.left = s), i
            }
            var p, h, f, d = !1;
            return a
        }
        var r = "undefined" == typeof console ? i : function(t) { console.error(t) },
            s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("desandro-get-style-property")) : t.getSize = n(t.getStyleProperty)
    }(window),
    function(t) {
        function e(t, e) { return t[s](e) }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function o(t, e) {
            i(t);
            for (var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length; r > n; n++)
                if (o[n] === t) return !0;
            return !1
        }

        function n(t, o) { return i(t), e(t, o) }
        var r, s = function() {
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, o = e.length; o > i; i++) {
                var n = e[i],
                    r = n + "MatchesSelector";
                if (t[r]) return r
            }
        }();
        if (s) {
            var a = document.createElement("div"),
                u = e(a, "div");
            r = u ? e : n
        } else r = o;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() { return r }) : "object" == typeof exports ? module.exports = r : window.matchesSelector = r
    }(Element.prototype),
    function(t) {
        function e(t, e) { for (var i in e) t[i] = e[i]; return t }

        function i(t) { for (var e in t) return !1; return e = null, !0 }

        function o(t) { return t.replace(/([A-Z])/g, function(t) { return "-" + t.toLowerCase() }) }

        function n(t, n, r) {
            function a(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) }
            var u = r("transition"),
                p = r("transform"),
                h = u && p,
                f = !!r("perspective"),
                d = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[u],
                l = ["transform", "transition", "transitionDuration", "transitionProperty"],
                c = function() {
                    for (var t = {}, e = 0, i = l.length; i > e; e++) {
                        var o = l[e],
                            n = r(o);
                        n && n !== o && (t[o] = n)
                    }
                    return t
                }();
            e(a.prototype, t.prototype), a.prototype._create = function() { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, a.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, a.prototype.getSize = function() { this.size = n(this.element) }, a.prototype.css = function(t) {
                var e = this.element.style;
                for (var i in t) {
                    var o = c[i] || i;
                    e[o] = t[i]
                }
            }, a.prototype.getPosition = function() {
                var t = s(this.element),
                    e = this.layout.options,
                    i = e.isOriginLeft,
                    o = e.isOriginTop,
                    n = parseInt(t[i ? "left" : "right"], 10),
                    r = parseInt(t[o ? "top" : "bottom"], 10);
                n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
                var a = this.layout.size;
                n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
            }, a.prototype.layoutPosition = function() {
                var t = this.layout.size,
                    e = this.layout.options,
                    i = {};
                e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
            };
            var y = f ? function(t, e) { return "translate3d(" + t + "px, " + e + "px, 0)" } : function(t, e) { return "translate(" + t + "px, " + e + "px)" };
            a.prototype._transitionTo = function(t, e) {
                this.getPosition();
                var i = this.position.x,
                    o = this.position.y,
                    n = parseInt(t, 10),
                    r = parseInt(e, 10),
                    s = n === this.position.x && r === this.position.y;
                if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
                var a = t - i,
                    u = e - o,
                    p = {},
                    h = this.layout.options;
                a = h.isOriginLeft ? a : -a, u = h.isOriginTop ? u : -u, p.transform = y(a, u), this.transition({ to: p, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 })
            }, a.prototype.goTo = function(t, e) { this.setPosition(t, e), this.layoutPosition() }, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, a.prototype._nonTransition = function(t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, a.prototype._transition = function(t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var o = this.element.offsetHeight;
                    o = null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            };
            var m = p && o(p) + ",opacity";
            a.prototype.enableTransition = function() { this.isTransitioning || (this.css({ transitionProperty: m, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(d, this, !1)) }, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) { this.ontransitionend(t) }, a.prototype.onotransitionend = function(t) { this.ontransitionend(t) };
            var g = { "-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform" };
            a.prototype.ontransitionend = function(t) {
                if (t.target === this.element) {
                    var e = this._transn,
                        o = g[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                        var n = e.onEnd[o];
                        n.call(this), delete e.onEnd[o]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, a.prototype.disableTransition = function() { this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1 }, a.prototype._removeStyles = function(t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e)
            };
            var v = { transitionProperty: "", transitionDuration: "" };
            return a.prototype.removeTransitionStyles = function() { this.css(v) }, a.prototype.removeElem = function() { this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this]) }, a.prototype.remove = function() {
                if (!u || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
                var t = this;
                this.on("transitionEnd", function() { return t.removeElem(), !0 }), this.hide()
            }, a.prototype.reveal = function() {
                delete this.isHidden, this.css({ display: "" });
                var t = this.layout.options;
                this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0 })
            }, a.prototype.hide = function() {
                this.isHidden = !0, this.css({ display: "" });
                var t = this.layout.options;
                this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: { opacity: function() { this.isHidden && this.css({ display: "none" }) } } })
            }, a.prototype.destroy = function() { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, a
        }
        var r = t.getComputedStyle,
            s = r ? function(t) { return r(t, null) } : function(t) { return t.currentStyle };
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
    }(window),
    function(t) {
        function e(t, e) { for (var i in e) t[i] = e[i]; return t }

        function i(t) { return "[object Array]" === f.call(t) }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) { var i = l(e, t); - 1 !== i && e.splice(i, 1) }

        function r(t) { return t.replace(/(.)([A-Z])/g, function(t, e, i) { return e + "-" + i }).toLowerCase() }

        function s(i, s, f, l, c, y) {
            function m(t, i) {
                if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)) return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
                this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
                var o = ++g;
                this.element.outlayerGUID = o, v[o] = this, this._create(), this.options.isInitLayout && this.layout()
            }
            var g = 0,
                v = {};
            return m.namespace = "outlayer", m.Item = y, m.defaults = { containerStyle: { position: "relative" }, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, isResizingContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }, e(m.prototype, f.prototype), m.prototype.option = function(t) { e(this.options, t) }, m.prototype._create = function() { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize() }, m.prototype.reloadItems = function() { this.items = this._itemize(this.element.children) }, m.prototype._itemize = function(t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
                    var s = e[n],
                        a = new i(s, this);
                    o.push(a)
                }
                return o
            }, m.prototype._filterFindItemElements = function(t) {
                t = o(t);
                for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
                    var s = t[n];
                    if (d(s))
                        if (e) { c(s, e) && i.push(s); for (var a = s.querySelectorAll(e), u = 0, p = a.length; p > u; u++) i.push(a[u]) } else i.push(s)
                }
                return i
            }, m.prototype.getItemElements = function() { for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element); return t }, m.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, t), this._isLayoutInited = !0
            }, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function() { this.getSize() }, m.prototype.getSize = function() { this.size = l(this.element) }, m.prototype._getMeasurement = function(t, e) {
                var i, o = this.options[t];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : d(o) && (i = o), this[t] = i ? l(i)[e] : o) : this[t] = 0
            }, m.prototype.layoutItems = function(t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, m.prototype._getItemsForLayout = function(t) {
                for (var e = [], i = 0, o = t.length; o > i; i++) {
                    var n = t[i];
                    n.isIgnored || e.push(n)
                }
                return e
            }, m.prototype._layoutItems = function(t, e) {
                function i() { o.emitEvent("layoutComplete", [o, t]) }
                var o = this;
                if (!t || !t.length) return i(), void 0;
                this._itemsOn(t, "layout", i);
                for (var n = [], r = 0, s = t.length; s > r; r++) {
                    var a = t[r],
                        u = this._getItemLayoutPosition(a);
                    u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
                }
                this._processLayoutQueue(n)
            }, m.prototype._getItemLayoutPosition = function() { return { x: 0, y: 0 } }, m.prototype._processLayoutQueue = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    this._positionItem(o.item, o.x, o.y, o.isInstant)
                }
            }, m.prototype._positionItem = function(t, e, i, o) { o ? t.goTo(e, i) : t.moveTo(e, i) }, m.prototype._postLayout = function() { this.resizeContainer() }, m.prototype.resizeContainer = function() {
                if (this.options.isResizingContainer) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
                }
            }, m.prototype._getContainerSize = h, m.prototype._setContainerMeasure = function(t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
                }
            }, m.prototype._itemsOn = function(t, e, i) {
                function o() { return n++, n === r && i.call(s), !0 }
                for (var n = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
                    var p = t[a];
                    p.on(e, o)
                }
            }, m.prototype.ignore = function(t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, m.prototype.unignore = function(t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, m.prototype.stamp = function(t) {
                if (t = this._find(t)) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        this.ignore(o)
                    }
                }
            }, m.prototype.unstamp = function(t) {
                if (t = this._find(t))
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        n(o, this.stamps), this.unignore(o)
                    }
            }, m.prototype._find = function(t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0 }, m.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; e > t; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            }, m.prototype._getBoundingRect = function() {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) }
            }, m.prototype._manageStamp = h, m.prototype._getElementOffset = function(t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    o = l(t),
                    n = { left: e.left - i.left - o.marginLeft, top: e.top - i.top - o.marginTop, right: i.right - e.right - o.marginRight, bottom: i.bottom - e.bottom - o.marginBottom };
                return n
            }, m.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, m.prototype.bindResize = function() { this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0) }, m.prototype.unbindResize = function() { this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1 }, m.prototype.onresize = function() {
                function t() { e.resize(), delete e.resizeTimeout }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var e = this;
                this.resizeTimeout = setTimeout(t, 100)
            }, m.prototype.resize = function() { this.isResizeBound && this.needsResizeLayout() && this.layout() }, m.prototype.needsResizeLayout = function() {
                var t = l(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth
            }, m.prototype.addItems = function(t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, m.prototype.appended = function(t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, m.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
                }
            }, m.prototype.reveal = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.reveal()
                    }
            }, m.prototype.hide = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.hide()
                    }
            }, m.prototype.getItem = function(t) { for (var e = 0, i = this.items.length; i > e; e++) { var o = this.items[e]; if (o.element === t) return o } }, m.prototype.getItems = function(t) {
                if (t && t.length) {
                    for (var e = [], i = 0, o = t.length; o > i; i++) {
                        var n = t[i],
                            r = this.getItem(n);
                        r && e.push(r)
                    }
                    return e
                }
            }, m.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (e && e.length) {
                    this._itemsOn(e, "remove", function() { this.emitEvent("removeComplete", [this, e]) });
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        s.remove(), n(s, this.items)
                    }
                }
            }, m.prototype.destroy = function() {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "";
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    o.destroy()
                }
                this.unbindResize();
                var n = this.element.outlayerGUID;
                delete v[n], delete this.element.outlayerGUID, p && p.removeData(this.element, this.constructor.namespace)
            }, m.data = function(t) { var e = t && t.outlayerGUID; return e && v[e] }, m.create = function(t, i) {
                function o() { m.apply(this, arguments) }
                return Object.create ? o.prototype = Object.create(m.prototype) : e(o.prototype, m.prototype), o.prototype.constructor = o, o.defaults = e({}, m.defaults), e(o.defaults, i), o.prototype.settings = {}, o.namespace = t, o.data = m.data, o.Item = function() { y.apply(this, arguments) }, o.Item.prototype = new y, s(function() {
                    for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, h = i.length; h > s; s++) {
                        var f, d = i[s],
                            l = d.getAttribute(n);
                        try { f = l && JSON.parse(l) } catch (c) { u && u.error("Error parsing " + n + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + c); continue }
                        var y = new o(d, f);
                        p && p.data(d, t, y)
                    }
                }), p && p.bridget && p.bridget(t, o), o
            }, m.Item = y, m
        }
        var a = t.document,
            u = t.console,
            p = t.jQuery,
            h = function() {},
            f = Object.prototype.toString,
            d = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) { return t instanceof HTMLElement } : function(t) { return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName },
            l = Array.prototype.indexOf ? function(t, e) { return t.indexOf(e) } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : "object" == typeof exports ? module.exports = s(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
    }(window),
    function(t) {
        function e(t) {
            function e() { t.Item.apply(this, arguments) }
            e.prototype = new t.Item, e.prototype._create = function() { this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {} }, e.prototype.updateSortData = function() {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this)
                    }
                }
            };
            var i = e.prototype.destroy;
            return e.prototype.destroy = function() { i.apply(this, arguments), this.css({ display: "" }) }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window),
    function(t) {
        function e(t, e) {
            function i(t) { this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size) }
            return function() {
                function t(t) { return function() { return e.prototype[t].apply(this.isotope, arguments) } }
                for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
                    var s = o[n];
                    i.prototype[s] = t(s)
                }
            }(), i.prototype.needsVerticalResizeLayout = function() {
                var e = t(this.isotope.element),
                    i = this.isotope.size && e;
                return i && e.innerHeight !== this.isotope.size.innerHeight
            }, i.prototype._getMeasurement = function() { this.isotope._getMeasurement.apply(this, arguments) }, i.prototype.getColumnWidth = function() { this.getSegmentSize("column", "Width") }, i.prototype.getRowHeight = function() { this.getSegmentSize("row", "Height") }, i.prototype.getSegmentSize = function(t, e) {
                var i = t + e,
                    o = "outer" + e;
                if (this._getMeasurement(i, o), !this[i]) {
                    var n = this.getFirstItemSize();
                    this[i] = n && n[o] || this.isotope.size["inner" + e]
                }
            }, i.prototype.getFirstItemSize = function() { var e = this.isotope.filteredItems[0]; return e && e.element && t(e.element) }, i.prototype.layout = function() { this.isotope.layout.apply(this.isotope, arguments) }, i.prototype.getSize = function() { this.isotope.getSize(), this.size = this.isotope.size }, i.modes = {}, i.create = function(t, e) {
                function o() { i.apply(this, arguments) }
                return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
            }, i
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window),
    function(t) {
        function e(t, e) {
            var o = t.create("masonry");
            return o.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var t = this.cols;
                for (this.colYs = []; t--;) this.colYs.push(0);
                this.maxY = 0
            }, o.prototype.measureColumns = function() {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth
                }
                this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, o.prototype.getContainerWidth = function() {
                var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                    i = e(t);
                this.containerWidth = i && i.innerWidth
            }, o.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    o = e && 1 > e ? "round" : "ceil",
                    n = Math[o](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), u = { x: this.columnWidth * a, y: s }, p = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = p;
                return u
            }, o.prototype._getColGroup = function(t) {
                if (2 > t) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                    var n = this.colYs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, o.prototype._manageStamp = function(t) {
                var i = e(t),
                    o = this._getElementOffset(t),
                    n = this.options.isOriginLeft ? o.left : o.right,
                    r = n + i.outerWidth,
                    s = Math.floor(n / this.columnWidth);
                s = Math.max(0, s);
                var a = Math.floor(r / this.columnWidth);
                a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
                for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(u, this.colYs[p])
            }, o.prototype._getContainerSize = function() { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t }, o.prototype._getContainerFitWidth = function() { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++; return (this.cols - t) * this.columnWidth - this.gutter }, o.prototype.needsResizeLayout = function() { var t = this.containerWidth; return this.getContainerWidth(), t !== this.containerWidth }, o
        }
        var i = Array.prototype.indexOf ? function(t, e) { return t.indexOf(e) } : function(t, e) { for (var i = 0, o = t.length; o > i; i++) { var n = t[i]; if (n === e) return i } return -1 };
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window),
    function(t) {
        function e(t, e) { for (var i in e) t[i] = e[i]; return t }

        function i(t, i) {
            var o = t.create("masonry"),
                n = o.prototype._getElementOffset,
                r = o.prototype.layout,
                s = o.prototype._getMeasurement;
            e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
            var a = o.prototype.measureColumns;
            o.prototype.measureColumns = function() { this.items = this.isotope.filteredItems, a.call(this) };
            var u = o.prototype._manageStamp;
            return o.prototype._manageStamp = function() { this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments) }, o
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : "object" == typeof exports ? module.exports = i(require("../layout-mode"), require("masonry-layout")) : i(t.Isotope.LayoutMode, t.Masonry)
    }(window),
    function(t) {
        function e(t) {
            var e = t.create("fitRows");
            return e.prototype._resetLayout = function() { this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth") }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
                var o = { x: this.x, y: this.y };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
            }, e.prototype._getContainerSize = function() { return { height: this.maxY } }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        function e(t) {
            var e = t.create("vertical", { horizontalAlignment: 0 });
            return e.prototype._resetLayout = function() { this.y = 0 }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return this.y += t.size.outerHeight, { x: e, y: i }
            }, e.prototype._getContainerSize = function() { return { height: this.y } }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        function e(t, e) { for (var i in e) t[i] = e[i]; return t }

        function i(t) { return "[object Array]" === h.call(t) }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) { var i = f(e, t); - 1 !== i && e.splice(i, 1) }

        function r(t, i, r, u, h) {
            function f(t, e) {
                return function(i, o) {
                    for (var n = 0, r = t.length; r > n; n++) {
                        var s = t[n],
                            a = i.sortData[s],
                            u = o.sortData[s];
                        if (a > u || u > a) {
                            var p = void 0 !== e[s] ? e[s] : e,
                                h = p ? 1 : -1;
                            return (a > u ? 1 : -1) * h
                        }
                    }
                    return 0
                }
            }
            var d = t.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
            d.Item = u, d.LayoutMode = h, d.prototype._create = function() { this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"]; for (var e in h.modes) this._initLayoutMode(e) }, d.prototype.reloadItems = function() { this.itemGUID = 0, t.prototype.reloadItems.call(this) }, d.prototype._itemize = function() {
                for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
                    var n = e[i];
                    n.id = this.itemGUID++
                }
                return this._updateItemsSortData(e), e
            }, d.prototype._initLayoutMode = function(t) {
                var i = h.modes[t],
                    o = this.options[t] || {};
                this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
            }, d.prototype.layout = function() { return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0) }, d.prototype._layout = function() {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
            }, d.prototype.arrange = function(t) {
                function e() { o.reveal(i.needReveal), o.hide(i.needHide) }
                this.option(t), this._getIsInstant();
                var i = this._filter(this.items);
                this.filteredItems = i.matches;
                var o = this;
                this._isInstant ? this._noTransition(e) : e(), this._sort(), this._layout()
            }, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function() { var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited; return this._isInstant = t, t }, d.prototype._filter = function(t) {
                var e = this.options.filter;
                e = e || "*";
                for (var i = [], o = [], n = [], r = this._getFilterTest(e), s = 0, a = t.length; a > s; s++) {
                    var u = t[s];
                    if (!u.isIgnored) {
                        var p = r(u);
                        p && i.push(u), p && u.isHidden ? o.push(u) : p || u.isHidden || n.push(u)
                    }
                }
                return { matches: i, needReveal: o, needHide: n }
            }, d.prototype._getFilterTest = function(t) { return s && this.options.isJQueryFiltering ? function(e) { return s(e.element).is(t) } : "function" == typeof t ? function(e) { return t(e.element) } : function(e) { return r(e.element, t) } }, d.prototype.updateSortData = function(t) {
                var e;
                t ? (t = o(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
            }, d.prototype._getSorters = function() {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = l(i)
                }
            }, d.prototype._updateItemsSortData = function(t) {
                for (var e = t && t.length, i = 0; e && e > i; i++) {
                    var o = t[i];
                    o.updateSortData()
                }
            };
            var l = function() {
                function t(t) {
                    if ("string" != typeof t) return t;
                    var i = a(t).split(" "),
                        o = i[0],
                        n = o.match(/^\[(.+)\]$/),
                        r = n && n[1],
                        s = e(r, o),
                        u = d.sortDataParsers[i[1]];
                    return t = u ? function(t) { return t && u(s(t)) } : function(t) { return t && s(t) }
                }

                function e(t, e) { var i; return i = t ? function(e) { return e.getAttribute(t) } : function(t) { var i = t.querySelector(e); return i && p(i) } }
                return t
            }();
            d.sortDataParsers = { parseInt: function(t) { return parseInt(t, 10) }, parseFloat: function(t) { return parseFloat(t) } }, d.prototype._sort = function() {
                var t = this.options.sortBy;
                if (t) {
                    var e = [].concat.apply(t, this.sortHistory),
                        i = f(e, this.options.sortAscending);
                    this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
                }
            }, d.prototype._mode = function() {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw Error("No layout mode: " + t);
                return e.options = this.options[t], e
            }, d.prototype._resetLayout = function() { t.prototype._resetLayout.call(this), this._mode()._resetLayout() }, d.prototype._getItemLayoutPosition = function(t) { return this._mode()._getItemLayoutPosition(t) }, d.prototype._manageStamp = function(t) { this._mode()._manageStamp(t) }, d.prototype._getContainerSize = function() { return this._mode()._getContainerSize() }, d.prototype.needsResizeLayout = function() { return this._mode().needsResizeLayout() }, d.prototype.appended = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i)
                }
            }, d.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
                }
            }, d.prototype._filterRevealAdded = function(t) { var e = this._filter(t); return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches }, d.prototype.insert = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i, o, n = e.length;
                    for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
                    var r = this._filter(e).matches;
                    for (i = 0; n > i; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
                    this.reveal(r)
                }
            };
            var c = d.prototype.remove;
            return d.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (c.call(this, t), e && e.length)
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        n(s, this.filteredItems)
                    }
            }, d.prototype.shuffle = function() {
                for (var t = 0, e = this.items.length; e > t; t++) {
                    var i = this.items[t];
                    i.sortData.random = Math.random()
                }
                this.options.sortBy = "random", this._sort(), this._layout()
            }, d.prototype._noTransition = function(t) {
                var e = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var i = t.call(this);
                return this.options.transitionDuration = e, i
            }, d.prototype.getFilteredItemElements = function() { for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element); return t }, d
        }
        var s = t.jQuery,
            a = String.prototype.trim ? function(t) { return t.trim() } : function(t) { return t.replace(/^\s+|\s+$/g, "") },
            u = document.documentElement,
            p = u.textContent ? function(t) { return t.textContent } : function(t) { return t.innerText },
            h = Object.prototype.toString,
            f = Array.prototype.indexOf ? function(t, e) { return t.indexOf(e) } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], r) : "object" == typeof exports ? module.exports = r(require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window);


! function(a) {
    a.fn.animatedModal = function(n) {
        function o() { m.css({ "z-index": e.zIndexOut }), e.afterClose() }

        function t() { e.afterOpen() }
        var i = a(this),
            e = a.extend({ modalTarget: "animatedModal", position: "fixed", width: "100%", height: "100%", top: "0px", left: "0px", zIndexIn: "9999", zIndexOut: "-9999", opacityIn: "1", opacityOut: "0", animatedIn: "zoomIn", animatedOut: "zoomOut", animationDuration: ".6s", overflow: "auto", beforeOpen: function() {}, afterOpen: function() {}, beforeClose: function() {}, afterClose: function() {} }, n),
            d = a(".close-" + e.modalTarget),
            s = a(i).attr("href"),
            m = a("body").find("#" + e.modalTarget),
            l = "#" + m.attr("id");
        m.addClass("animated"), m.addClass(e.modalTarget + "-off");
        var r = { position: e.position, width: e.width, height: e.height, top: e.top, left: e.left, "background-color": e.color, "overflow-y": e.overflow, "z-index": e.zIndexOut, opacity: e.opacityOut, "-webkit-animation-duration": e.animationDuration, "-moz-animation-duration": e.animationDuration, "-ms-animation-duration": e.animationDuration, "animation-duration": e.animationDuration };
        m.css(r), i.click(function(n) { n.preventDefault(), a("body, html").css({ overflow: "hidden" }), s == l && (m.hasClass(e.modalTarget + "-off") && (m.removeClass(e.animatedOut), m.removeClass(e.modalTarget + "-off"), m.addClass(e.modalTarget + "-on")), m.hasClass(e.modalTarget + "-on") && (e.beforeOpen(), m.css({ opacity: e.opacityIn, "z-index": e.zIndexIn }), m.addClass(e.animatedIn), m.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", t))) }), d.click(function(n) { n.preventDefault(), a("body, html").css({ overflow: "auto" }), e.beforeClose(), m.hasClass(e.modalTarget + "-on") && (m.removeClass(e.modalTarget + "-on"), m.addClass(e.modalTarget + "-off")), m.hasClass(e.modalTarget + "-off") && (m.removeClass(e.animatedIn), m.addClass(e.animatedOut), m.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", o)) })
    }
}(jQuery);


/*! waitForImages jQuery Plugin 2016-01-04 */
! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) {
    var b = "waitForImages";
    a.waitForImages = { hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"], hasImageAttributes: ["srcset"] }, a.expr[":"]["has-src"] = function(b) { return a(b).is('img[src][src!=""]') }, a.expr[":"].uncached = function(b) { return a(b).is(":has-src") ? !b.complete : !1 }, a.fn.waitForImages = function() {
        var c, d, e, f = 0,
            g = 0,
            h = a.Deferred();
        if (a.isPlainObject(arguments[0]) ? (e = arguments[0].waitForAll, d = arguments[0].each, c = arguments[0].finished) : 1 === arguments.length && "boolean" === a.type(arguments[0]) ? e = arguments[0] : (c = arguments[0], d = arguments[1], e = arguments[2]), c = c || a.noop, d = d || a.noop, e = !!e, !a.isFunction(c) || !a.isFunction(d)) throw new TypeError("An invalid callback was supplied.");
        return this.each(function() {
            var i = a(this),
                j = [],
                k = a.waitForImages.hasImageProperties || [],
                l = a.waitForImages.hasImageAttributes || [],
                m = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            e ? i.find("*").addBack().each(function() {
                var b = a(this);
                b.is("img:has-src") && !b.is("[srcset]") && j.push({ src: b.attr("src"), element: b[0] }), a.each(k, function(a, c) { var d, e = b.css(c); if (!e) return !0; for (; d = m.exec(e);) j.push({ src: d[2], element: b[0] }) }), a.each(l, function(a, c) { var d = b.attr(c); return d ? void j.push({ src: b.attr("src"), srcset: b.attr("srcset"), element: b[0] }) : !0 })
            }) : i.find("img:has-src").each(function() { j.push({ src: this.src, element: this }) }), f = j.length, g = 0, 0 === f && (c.call(i[0]), h.resolveWith(i[0])), a.each(j, function(e, j) {
                var k = new Image,
                    l = "load." + b + " error." + b;
                a(k).one(l, function m(b) { var e = [g, f, "load" == b.type]; return g++, d.apply(j.element, e), h.notifyWith(j.element, e), a(this).off(l, m), g == f ? (c.call(i[0]), h.resolveWith(i[0]), !1) : void 0 }), j.srcset && (k.srcset = j.srcset), k.src = j.src
            })
        }), h.promise()
    }
});
! function(t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = i.indexOf(e); return -1 != n && i.splice(n, 1), this } }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter) }(window, function(t, e) {
    function i(t, e) { for (var i in e) t[i] = e[i]; return t }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function o(t, e, r) { return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() { this.check() }.bind(this))) : new o(t, e, r) }

    function r(t) { this.img = t }

    function s(t, e) { this.url = t, this.element = e, this.img = new Image }
    var h = t.jQuery,
        a = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() { this.images = [], this.elements.forEach(this.addElementImages, this) }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = { 1: !0, 9: !0, 11: !0 };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
        var i = new s(t, e);
        this.images.push(i)
    }, o.prototype.check = function() {
        function t(t, i, n) { setTimeout(function() { e.progress(t, i, n) }) }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) { e.once("progress", t), e.check() }) : void this.complete()
    }, o.prototype.progress = function(t, e, i) { this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e) }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function() { var t = this.getIsImageComplete(); return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src)) }, r.prototype.getIsImageComplete = function() { return this.img.complete && void 0 !== this.img.naturalWidth }, r.prototype.confirm = function(t, e) { this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]) }, r.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.prototype.onload = function() { this.confirm(!0, "onload"), this.unbindEvents() }, r.prototype.onerror = function() { this.confirm(!1, "onerror"), this.unbindEvents() }, r.prototype.unbindEvents = function() { this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() { this.img.removeEventListener("load", this), this.img.removeEventListener("error", this) }, s.prototype.confirm = function(t, e) { this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]) }, o.makeJQueryPlugin = function(e) { e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) { var i = new o(this, t, e); return i.jqDeferred.promise(h(this)) }) }, o.makeJQueryPlugin(), o
});;
(function(window) {
    'use strict';

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // from http://www.quirksmode.org/js/events_properties.html#position
    function getMousePos(e) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        }
    }

    var DOM = {};
    // The loader.
    DOM.loader = document.querySelector('.overlay--loader');
    // The room wrapper. This will be the element to be transformed in order to move around.
    DOM.scroller = document.querySelector('.container > .scroller');
    // The rooms.
    DOM.rooms = [].slice.call(DOM.scroller.querySelectorAll('.room'));
    // The content wrapper.
    DOM.content = document.querySelector('.content');
    // Rooms navigation controls.
    DOM.nav = {
        leftCtrl: DOM.content.querySelector('nav > .btn--nav-left'),
        rightCtrl: DOM.content.querySelector('nav > .btn--nav-right')
    };
    // Content slides.
    DOM.slides = [].slice.call(DOM.content.querySelectorAll('.slides > .slide'));
    // The off canvas menu button.
    DOM.menuCtrl = DOM.content.querySelector('.btn--menu');
    // The menu overlay.
    DOM.menuOverlay = DOM.content.querySelector('.overlay--menu');
    // The menu items
    DOM.menuItems = DOM.menuOverlay.querySelectorAll('.menu > .menu__item');
    // The info button.
    DOM.infoCtrl = DOM.content.querySelector('.btn--info');
    // The info overlay.
    DOM.infoOverlay = DOM.content.querySelector('.overlay--info');
    // The info text.
    DOM.infoText = DOM.infoOverlay.querySelector('.info');

    var currentRoom = 0,
        // Total number of rooms.
        totalRooms = DOM.rooms.length,
        // Initial transform.
        initTransform = { translateX: 0, translateY: 0, translateZ: '500px', rotateX: 0, rotateY: 0, rotateZ: 0 },
        // Reset transform.
        resetTransform = { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
        // View from top.
        menuTransform = { translateX: 0, translateY: '150%', translateZ: 0, rotateX: '15deg', rotateY: 0, rotateZ: 0 },
        menuTransform = { translateX: 0, translateY: '50%', translateZ: 0, rotateX: '-10deg', rotateY: 0, rotateZ: 0 },
        // Info view transform.
        infoTransform = { translateX: 0, translateY: 0, translateZ: '200px', rotateX: '2deg', rotateY: 0, rotateZ: '4deg' },
        // Room initial moving transition.
        initTransition = { speed: '0.9s', easing: 'ease' },
        // Room moving transition.
        roomTransition = { speed: '0.4s', easing: 'ease' },
        // View from top transition.
        menuTransition = { speed: '1.5s', easing: 'cubic-bezier(0.2,1,0.3,1)' },
        // Info transition.
        infoTransition = { speed: '15s', easing: 'cubic-bezier(0.3,1,0.3,1)' },
        // Tilt transition
        tiltTransition = { speed: '0.2s', easing: 'ease-out' },
        tilt = false,
        // How much to rotate when the mouse moves.
        tiltRotation = {
            rotateX: 1, // a relative rotation of -1deg to 1deg on the x-axis
            rotateY: -3 // a relative rotation of -3deg to 3deg on the y-axis
        },
        // Transition end event handler.
        onEndTransition = function(el, callback) {
            var onEndCallbackFn = function(ev) {
                this.removeEventListener('transitionend', onEndCallbackFn);
                if (callback && typeof callback === 'function') { callback.call(); }
            };
            el.addEventListener('transitionend', onEndCallbackFn);
        },
        // Window sizes.
        win = { width: window.innerWidth, height: window.innerHeight },
        // Check if moving inside the room and check if navigating.
        isMoving, isNavigating;

    function init() {
        // Move into the current room.
        move({ transition: initTransition, transform: initTransform }).then(function() {
            initTilt();
        });
        // Animate the current slide in.
        showSlide(100);
        // Init/Bind events.
        initEvents();
    }

    function initTilt() {
        applyRoomTransition(tiltTransition);
        tilt = true;
    }

    function removeTilt() {
        tilt = false;
    }

    function move(opts) {
        return new Promise(function(resolve, reject) {
            if (isMoving && !opts.stopTransition) {
                return false;
            }
            isMoving = true;

            if (opts.transition) {
                applyRoomTransition(opts.transition);
            }

            if (opts.transform) {
                applyRoomTransform(opts.transform);
                var onEndFn = function() {
                    isMoving = false;
                    resolve();
                };
                onEndTransition(DOM.scroller, onEndFn);
            } else {
                resolve();
            }

        });
    }

    function initEvents() {
        // Mousemove event / Tilt functionality.
        var onMouseMoveFn = function(ev) {
                requestAnimationFrame(function() {
                    if (!tilt) return false;


                    var mousepos = getMousePos(ev),
                        // transform values
                        rotX = tiltRotation.rotateX ? initTransform.rotateX - (2 * tiltRotation.rotateX / win.height * mousepos.y - tiltRotation.rotateX) : 0,
                        rotY = tiltRotation.rotateY ? initTransform.rotateY - (2 * tiltRotation.rotateY / win.width * mousepos.x - tiltRotation.rotateY) : 0;

                    // apply transform
                    applyRoomTransform({
                        'translateX': initTransform.translateX,
                        'translateY': initTransform.translateY,
                        'translateZ': initTransform.translateZ,
                        'rotateX': rotX + 'deg',
                        'rotateY': rotY + 'deg',
                        'rotateZ': initTransform.rotateZ
                    });
                });
            },
            // Window resize.
            debounceResizeFn = debounce(function() {
                win = { width: window.innerWidth, height: window.innerHeight };
            }, 10);

        document.addEventListener('mousemove', onMouseMoveFn);
        window.addEventListener('resize', debounceResizeFn);

        // Room navigation.
        var onNavigatePrevFn = function() { navigate('prev'); },
            onNavigateNextFn = function() { navigate('next'); };

        DOM.nav.leftCtrl.addEventListener('click', onNavigatePrevFn);
        DOM.nav.rightCtrl.addEventListener('click', onNavigateNextFn);

        // Menu click.
        DOM.menuCtrl.addEventListener('click', toggleMenu);

        // Info click.
        DOM.infoCtrl.addEventListener('click', toggleInfo);
    }

    function applyRoomTransform(transform) {
        DOM.scroller.style.transform = 'translate3d(' + transform.translateX + ', ' + transform.translateY + ', ' + transform.translateZ + ') ' +
            'rotate3d(1,0,0,' + transform.rotateX + ') rotate3d(0,1,0,' + transform.rotateY + ') rotate3d(0,0,1,' + transform.rotateZ + ')';
    }

    function applyRoomTransition(transition) {
        DOM.scroller.style.transition = transition === 'none' ? transition : 'transform ' + transition.speed + ' ' + transition.easing;
    }

    function toggleSlide(dir, delay) {
        var slide = DOM.slides[currentRoom],
            // Slide's name.
            name = slide.querySelector('.slide__name'),
            // Slide's title and date elements.
            title = slide.querySelector('.slide__title'),
            date = slide.querySelector('.slide__date');

        delay = delay !== undefined ? delay : 0;

        anime.remove([name, title, date]);
        var animeOpts = {
            targets: [name, title, date],
            duration: dir === 'in' ? 400 : 400,
            //delay: 0,//dir === 'in' ? 150 : 0,
            delay: function(t, i, c) {
                return delay + 75 + i * 75;
            },
            easing: [0.25, 0.1, 0.25, 1],
            opacity: {
                value: dir === 'in' ? [0, 1] : [1, 0],
                duration: dir === 'in' ? 550 : 250
            },
            translateY: function(t, i) {
                return dir === 'in' ? [150, 0] : [0, -150];
            }
        };
        if (dir === 'in') {
            animeOpts.begin = function() {
                slide.classList.add('slide--current');
            };
        } else {
            animeOpts.complete = function() {
                slide.classList.remove('slide--current');
            };
        }
        anime(animeOpts);
    }

    function showSlide(delay) {
        toggleSlide('in', delay);
    }

    function hideSlide(delay) {
        toggleSlide('out', delay);
    }

    function navigate(dir) {
        if (isMoving || isNavigating) {
            return false;
        }
        isNavigating = true;

        var room = DOM.rooms[currentRoom];

        // Remove tilt.
        removeTilt();
        // Animate the current slide out - animate the name, title and date elements.
        hideSlide();

        // Update currentRoom.
        if (dir === 'next') {
            currentRoom = currentRoom < totalRooms - 1 ? currentRoom + 1 : 0;
        } else {
            currentRoom = currentRoom > 0 ? currentRoom - 1 : totalRooms - 1;
        }

        // Position the next room.
        var nextRoom = DOM.rooms[currentRoom];
        nextRoom.style.transform = 'translate3d(' + (dir === 'next' ? 100 : -100) + '%,0,0) translate3d(' + (dir === 'next' ? 1 : -1) + 'px,0,0)';
        nextRoom.style.opacity = 1;

        // Move back.
        move({ transition: roomTransition, transform: resetTransform })
            .then(function() {
                // Move left or right.
                return move({ transform: { translateX: (dir === 'next' ? -100 : 100) + '%', translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0 } });
            })
            .then(function() {
                // Update current room class.
                nextRoom.classList.add('room--current');
                room.classList.remove('room--current');
                room.style.opacity = 0;

                // Show the next slide.
                showSlide();

                // Move into room.
                // Update final transform state:
                return move({ transform: { translateX: (dir === 'next' ? -100 : 100) + '%', translateY: 0, translateZ: '500px', rotateX: 0, rotateY: 0, rotateZ: 0 } });
            })
            .then(function() {
                // Reset positions.
                applyRoomTransition('none');
                nextRoom.style.transform = 'translate3d(0,0,0)';
                applyRoomTransform(initTransform);

                setTimeout(function() {
                    initTilt();
                }, 60);
                isNavigating = false;
            });
    }

    function toggleMenu() {
        if ( /*isMoving ||*/ isNavigating) {
            return false;
        }
        if (DOM.menuCtrl.classList.contains('btn--active')) {
            // Close it.
            closeMenu();
        } else {
            // Open it.
            showMenu();
        }
    }

    function showMenu() {
        // Button becomes cross.
        DOM.menuCtrl.classList.add('btn--active');
        // Remove tilt.
        removeTilt();
        // Add adjacent rooms.
        //addAdjacentRooms();
        // Hide current slide.
        hideSlide();
        // Apply menu transition.
        applyRoomTransition(menuTransition);
        // View from top:
        move({ transform: menuTransform, stopTransition: true });
        // Show menu items
        anime.remove(DOM.menuItems);
        anime({
            targets: DOM.menuItems,
            duration: 500,
            easing: [0.2, 1, 0.3, 1],
            delay: function(t, i) {
                return 250 + 50 * i;
            },
            translateY: [150, 0],
            opacity: {
                value: [0, 1],
                duration: 200,
                easing: 'linear'
            },
            begin: function() {
                DOM.menuOverlay.classList.add('overlay--active');
            }
        });
        anime.remove(DOM.menuOverlay);
        anime({
            targets: DOM.menuOverlay,
            duration: 1000,
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [0, 1]
        });
    }

    function closeMenu() {
        // Button becomes menu.
        DOM.menuCtrl.classList.remove('btn--active');
        // Apply room transition.
        applyRoomTransition(roomTransition);
        // Show current slide.
        showSlide(150);
        // back to room view:
        move({ transform: initTransform, stopTransition: true }).then(function() {
            // Remove adjacent rooms.
            //removeAdjacentRooms();
            // Init tilt.
            initTilt();
        });
        anime.remove(DOM.menuItems);
        anime({
            targets: DOM.menuItems,
            duration: 250,
            easing: [0.25, 0.1, 0.25, 1],
            delay: function(t, i, c) {
                return 40 * (c - i - 1);
            },
            translateY: [0, 150],
            opacity: {
                value: [1, 0],
                duration: 250
            },
            complete: function() {
                DOM.menuOverlay.classList.remove('overlay--active');
            }
        });
        anime.remove(DOM.menuOverlay);
        anime({
            targets: DOM.menuOverlay,
            duration: 400,
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [1, 0]
        });
    }

    function addAdjacentRooms() {
        // Current room.
        var room = DOM.rooms[currentRoom],
            // Adjacent rooms.
            nextRoom = DOM.rooms[currentRoom < totalRooms - 1 ? currentRoom + 1 : 0],
            prevRoom = DOM.rooms[currentRoom > 0 ? currentRoom - 1 : totalRooms - 1];

        // Position the adjacent rooms.
        nextRoom.style.transform = 'translate3d(100%,0,0) translate3d(3px,0,0)';
        nextRoom.style.opacity = 1;
        prevRoom.style.transform = 'translate3d(-100%,0,0) translate3d(-3px,0,0)';
        prevRoom.style.opacity = 1;
    }

    function removeAdjacentRooms() {
        // Current room.
        var room = DOM.rooms[currentRoom],
            // Adjacent rooms.
            nextRoom = DOM.rooms[currentRoom < totalRooms - 1 ? currentRoom + 1 : 0],
            prevRoom = DOM.rooms[currentRoom > 0 ? currentRoom - 1 : totalRooms - 1];

        // Position the adjacent rooms.
        nextRoom.style.transform = 'none';
        nextRoom.style.opacity = 0;
        prevRoom.style.transform = 'none';
        prevRoom.style.opacity = 0;
    }

    function toggleInfo() {
        if (isNavigating) {
            return false;
        }
        if (DOM.infoCtrl.classList.contains('btn--active')) {
            // Close it.
            closeInfo();
        } else {
            // Open it.
            showInfo();
        }
    }

    function showInfo() {
        // Button becomes cross.
        DOM.infoCtrl.classList.add('btn--active');
        // Remove tilt.
        removeTilt();
        // Hide current slide.
        hideSlide();
        // Apply info transition.
        applyRoomTransition(infoTransition);
        // Infoview:
        move({ transform: infoTransform, stopTransition: true });
        // Show info text and animate photos out of the walls.
        var photos = DOM.rooms[currentRoom].querySelectorAll('.room__img');
        anime.remove(photos);
        anime({
            targets: photos,
            duration: function() {
                return anime.random(15000, 30000);
            },
            easing: [0.3, 1, 0.3, 1],
            translateY: function() {
                return anime.random(-50, 50);
            },
            rotateX: function() {
                return anime.random(-2, 2);
            },
            rotateZ: function() {
                return anime.random(-5, 5);
            },
            translateZ: function() {
                return [10, anime.random(50, win.width / 3)];
            }
        });
        // Animate info text and overlay.
        anime.remove([DOM.infoOverlay, DOM.infoText]);
        var animeInfoOpts = {
            targets: [DOM.infoOverlay, DOM.infoText],
            duration: 1500,
            delay: function(t, i) {
                return !i ? 0 : 150;
            },
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [0, 1],
            translateY: function(t, i) {
                return !i ? 0 : [30, 0];
            },
            begin: function() {
                DOM.infoOverlay.classList.add('overlay--active');
            }
        };
        anime(animeInfoOpts);
    }

    function closeInfo() {
        // Button becomes info.
        DOM.infoCtrl.classList.remove('btn--active');
        // Apply room transition.
        applyRoomTransition(roomTransition);
        // Show current slide.
        showSlide(100);
        // back to room view:
        move({ transform: initTransform, stopTransition: true }).then(function() {
            initTilt();
        });

        // Hide info text and animate photos into the walls.
        var photos = DOM.rooms[currentRoom].querySelectorAll('.room__img');
        anime.remove(photos);
        anime({
            targets: photos,
            duration: 400,
            easing: [0.3, 1, 0.3, 1],
            translateY: 0,
            rotateX: 0,
            rotateZ: 0,
            translateZ: 10
        });
        // Animate info text and overlay.
        anime.remove([DOM.infoOverlay, DOM.infoText]);
        var animeInfoOpts = {
            targets: [DOM.infoOverlay, DOM.infoText],
            duration: 400,
            easing: [0.25, 0.1, 0.25, 1],
            opacity: [1, 0],
            translateY: function(t, i) {
                return !i ? 0 : [0, 30];
            },
            complete: function() {
                DOM.infoOverlay.classList.remove('overlay--active');
            }
        };
        anime(animeInfoOpts);
    }

    // Preload all the images.
    imagesLoaded(DOM.scroller, function() {
        var extradelay = 1000;
        // Slide out loader.
        anime({
            targets: DOM.loader,
            duration: 600,
            easing: 'easeInOutCubic',
            delay: extradelay,
            translateY: '-100%',
            begin: function() {
                init();
            },
            complete: function() {
                DOM.loader.classList.remove('overlay--active');
            }
        });
    });

})(window);
var $jscomp$this = this;
(function(u, r) { "function" === typeof define && define.amd ? define([], r) : "object" === typeof module && module.exports ? module.exports = r() : u.anime = r() })(this, function() {
    function u(a) { if (!g.col(a)) try { return document.querySelectorAll(a) } catch (b) {} }

    function r(a) { return a.reduce(function(a, c) { return a.concat(g.arr(c) ? r(c) : c) }, []) }

    function v(a) {
        if (g.arr(a)) return a;
        g.str(a) && (a = u(a) || a);
        return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a]
    }

    function E(a, b) { return a.some(function(a) { return a === b }) }

    function z(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    }

    function F(a, b) {
        var c = z(a),
            d;
        for (d in a) c[d] = b.hasOwnProperty(d) ? b[d] : a[d];
        return c
    }

    function A(a, b) {
        var c = z(a),
            d;
        for (d in b) c[d] = g.und(a[d]) ? b[d] : a[d];
        return c
    }

    function R(a) {
        a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a, b, c, h) { return b + b + c + c + h + h });
        var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
        a = parseInt(b[1], 16);
        var c = parseInt(b[2], 16),
            b = parseInt(b[3], 16);
        return "rgb(" + a + "," + c + "," + b + ")"
    }

    function S(a) {
        function b(a, b, c) {
            0 >
                c && (c += 1);
            1 < c && --c;
            return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
        }
        var c = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);
        a = parseInt(c[1]) / 360;
        var d = parseInt(c[2]) / 100,
            c = parseInt(c[3]) / 100;
        if (0 == d) d = c = a = c;
        else {
            var e = .5 > c ? c * (1 + d) : c + d - c * d,
                k = 2 * c - e,
                d = b(k, e, a + 1 / 3),
                c = b(k, e, a);
            a = b(k, e, a - 1 / 3)
        }
        return "rgb(" + 255 * d + "," + 255 * c + "," + 255 * a + ")"
    }

    function w(a) { if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a)) return a[2] }

    function T(a) {
        if (-1 < a.indexOf("translate")) return "px";
        if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg"
    }

    function G(a, b) { return g.fnc(a) ? a(b.target, b.id, b.total) : a }

    function B(a, b) { if (b in a.style) return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0" }

    function H(a, b) { if (g.dom(a) && E(U, b)) return "transform"; if (g.dom(a) && (a.getAttribute(b) || g.svg(a) && a[b])) return "attribute"; if (g.dom(a) && "transform" !== b && B(a, b)) return "css"; if (null != a[b]) return "object" }

    function V(a, b) {
        var c = T(b),
            c = -1 < b.indexOf("scale") ?
            1 : 0 + c;
        a = a.style.transform;
        if (!a) return c;
        for (var d = [], e = [], k = [], h = /(\w+)\((.+?)\)/g; d = h.exec(a);) e.push(d[1]), k.push(d[2]);
        a = k.filter(function(a, c) { return e[c] === b });
        return a.length ? a[0] : c
    }

    function I(a, b) {
        switch (H(a, b)) {
            case "transform":
                return V(a, b);
            case "css":
                return B(a, b);
            case "attribute":
                return a.getAttribute(b)
        }
        return a[b] || 0
    }

    function J(a, b) {
        var c = /^(\*=|\+=|-=)/.exec(a);
        if (!c) return a;
        b = parseFloat(b);
        a = parseFloat(a.replace(c[0], ""));
        switch (c[0][0]) {
            case "+":
                return b + a;
            case "-":
                return b - a;
            case "*":
                return b *
                    a
        }
    }

    function C(a) { return g.obj(a) && a.hasOwnProperty("totalLength") }

    function W(a, b) {
        function c(c) { c = void 0 === c ? 0 : c; return a.el.getPointAtLength(1 <= b + c ? b + c : 0) }
        var d = c(),
            e = c(-1),
            k = c(1);
        switch (a.property) {
            case "x":
                return d.x;
            case "y":
                return d.y;
            case "angle":
                return 180 * Math.atan2(k.y - e.y, k.x - e.x) / Math.PI
        }
    }

    function K(a, b) {
        var c = /-?\d*\.?\d+/g;
        a = C(a) ? a.totalLength : a;
        if (g.col(a)) b = g.rgb(a) ? a : g.hex(a) ? R(a) : g.hsl(a) ? S(a) : void 0;
        else {
            var d = w(a);
            a = d ? a.substr(0, a.length - d.length) : a;
            b = b ? a + b : a
        }
        b += "";
        return {
            original: b,
            numbers: b.match(c) ? b.match(c).map(Number) : [0],
            strings: b.split(c)
        }
    }

    function X(a, b) { return b.reduce(function(b, d, e) { return b + a[e - 1] + d }) }

    function L(a) { return (a ? r(g.arr(a) ? a.map(v) : v(a)) : []).filter(function(a, c, d) { return d.indexOf(a) === c }) }

    function Y(a) { var b = L(a); return b.map(function(a, d) { return { target: a, id: d, total: b.length } }) }

    function Z(a, b) {
        var c = z(b);
        if (g.arr(a)) {
            var d = a.length;
            2 !== d || g.obj(a[0]) ? g.fnc(b.duration) || (c.duration = b.duration / d) : a = { value: a }
        }
        return v(a).map(function(a, c) {
            c = c ? 0 : b.delay;
            a = g.obj(a) && !C(a) ? a : { value: a };
            g.und(a.delay) && (a.delay = c);
            return a
        }).map(function(a) { return A(a, c) })
    }

    function aa(a, b) {
        var c = {},
            d;
        for (d in a) {
            var e = G(a[d], b);
            g.arr(e) && (e = e.map(function(a) { return G(a, b) }), 1 === e.length && (e = e[0]));
            c[d] = e
        }
        c.duration = parseFloat(c.duration);
        c.delay = parseFloat(c.delay);
        return c
    }

    function ba(a) { return g.arr(a) ? x.apply(this, a) : M[a] }

    function ca(a, b) {
        var c;
        return a.tweens.map(function(d) {
            d = aa(d, b);
            var e = d.value,
                k = I(b.target, a.name),
                h = c ? c.to.original : k,
                h = g.arr(e) ? e[0] : h,
                n = J(g.arr(e) ?
                    e[1] : e, h),
                k = w(n) || w(h) || w(k);
            d.isPath = C(e);
            d.from = K(h, k);
            d.to = K(n, k);
            d.start = c ? c.end : a.offset;
            d.end = d.start + d.delay + d.duration;
            d.easing = ba(d.easing);
            d.elasticity = (1E3 - Math.min(Math.max(d.elasticity, 1), 999)) / 1E3;
            g.col(d.from.original) && (d.round = 1);
            return c = d
        })
    }

    function da(a, b) {
        return r(a.map(function(a) {
            return b.map(function(b) {
                var c = H(a.target, b.name);
                if (c) {
                    var d = ca(b, a);
                    b = { type: c, property: b.name, animatable: a, tweens: d, duration: d[d.length - 1].end, delay: d[0].delay }
                } else b = void 0;
                return b
            })
        })).filter(function(a) { return !g.und(a) })
    }

    function N(a, b, c) { var d = "delay" === a ? Math.min : Math.max; return b.length ? d.apply(Math, b.map(function(b) { return b[a] })) : c[a] }

    function ea(a) {
        var b = F(fa, a),
            c = F(ga, a),
            d = Y(a.targets),
            e = [],
            g = A(b, c),
            h;
        for (h in a) g.hasOwnProperty(h) || "targets" === h || e.push({ name: h, offset: g.offset, tweens: Z(a[h], c) });
        a = da(d, e);
        return A(b, { animatables: d, animations: a, duration: N("duration", a, c), delay: N("delay", a, c) })
    }

    function m(a) {
        function b() { return window.Promise && new Promise(function(a) { return P = a }) }

        function c(a) {
            return f.reversed ?
                f.duration - a : a
        }

        function d(a) {
            for (var b = 0, c = {}, d = f.animations, e = {}; b < d.length;) {
                var g = d[b],
                    h = g.animatable,
                    n = g.tweens;
                e.tween = n.filter(function(b) { return a < b.end })[0] || n[n.length - 1];
                e.isPath$0 = e.tween.isPath;
                e.round = e.tween.round;
                e.eased = e.tween.easing(Math.min(Math.max(a - e.tween.start - e.tween.delay, 0), e.tween.duration) / e.tween.duration, e.tween.elasticity);
                n = X(e.tween.to.numbers.map(function(a) {
                    return function(b, c) {
                        c = a.isPath$0 ? 0 : a.tween.from.numbers[c];
                        b = c + a.eased * (b - c);
                        a.isPath$0 && (b = W(a.tween.value,
                            b));
                        a.round && (b = Math.round(b * a.round) / a.round);
                        return b
                    }
                }(e)), e.tween.to.strings);
                ha[g.type](h.target, g.property, n, c, h.id);
                g.currentValue = n;
                b++;
                e = { isPath$0: e.isPath$0, tween: e.tween, eased: e.eased, round: e.round }
            }
            if (c)
                for (var k in c) D || (D = B(document.body, "transform") ? "transform" : "-webkit-transform"), f.animatables[k].target.style[D] = c[k].join(" ");
            f.currentTime = a;
            f.progress = a / f.duration * 100
        }

        function e(a) { if (f[a]) f[a](f) }

        function g() { f.remaining && !0 !== f.remaining && f.remaining-- }

        function h(a) {
            var h = f.duration,
                k = f.offset,
                m = f.delay,
                O = f.currentTime,
                p = f.reversed,
                q = c(a),
                q = Math.min(Math.max(q, 0), h);
            q > k && q < h ? (d(q), !f.began && q >= m && (f.began = !0, e("begin")), e("run")) : (q <= k && 0 !== O && (d(0), p && g()), q >= h && O !== h && (d(h), p || g()));
            a >= h && (f.remaining ? (t = n, "alternate" === f.direction && (f.reversed = !f.reversed)) : (f.pause(), P(), Q = b(), f.completed || (f.completed = !0, e("complete"))), l = 0);
            if (f.children)
                for (a = f.children, h = 0; h < a.length; h++) a[h].seek(q);
            e("update")
        }
        a = void 0 === a ? {} : a;
        var n, t, l = 0,
            P = null,
            Q = b(),
            f = ea(a);
        f.reset = function() {
            var a =
                f.direction,
                b = f.loop;
            f.currentTime = 0;
            f.progress = 0;
            f.paused = !0;
            f.began = !1;
            f.completed = !1;
            f.reversed = "reverse" === a;
            f.remaining = "alternate" === a && 1 === b ? 2 : b
        };
        f.tick = function(a) {
            n = a;
            t || (t = n);
            h((l + n - t) * m.speed)
        };
        f.seek = function(a) { h(c(a)) };
        f.pause = function() {
            var a = p.indexOf(f); - 1 < a && p.splice(a, 1);
            f.paused = !0
        };
        f.play = function() { f.paused && (f.paused = !1, t = 0, l = f.completed ? 0 : c(f.currentTime), p.push(f), y || ia()) };
        f.reverse = function() {
            f.reversed = !f.reversed;
            t = 0;
            l = c(f.currentTime)
        };
        f.restart = function() {
            f.pause();
            f.reset();
            f.play()
        };
        f.finished = Q;
        f.reset();
        f.autoplay && f.play();
        return f
    }
    var fa = { update: void 0, begin: void 0, run: void 0, complete: void 0, loop: 1, direction: "normal", autoplay: !0, offset: 0 },
        ga = { duration: 1E3, delay: 0, easing: "easeOutElastic", elasticity: 500, round: 0 },
        U = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
        D, g = {
            arr: function(a) { return Array.isArray(a) },
            obj: function(a) { return -1 < Object.prototype.toString.call(a).indexOf("Object") },
            svg: function(a) {
                return a instanceof
                SVGElement
            },
            dom: function(a) { return a.nodeType || g.svg(a) },
            str: function(a) { return "string" === typeof a },
            fnc: function(a) { return "function" === typeof a },
            und: function(a) { return "undefined" === typeof a },
            hex: function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
            rgb: function(a) { return /^rgb/.test(a) },
            hsl: function(a) { return /^hsl/.test(a) },
            col: function(a) { return g.hex(a) || g.rgb(a) || g.hsl(a) }
        },
        x = function() {
            function a(a, c, d) { return (((1 - 3 * d + 3 * c) * a + (3 * d - 6 * c)) * a + 3 * c) * a }
            return function(b, c, d, e) {
                if (0 <= b && 1 >= b &&
                    0 <= d && 1 >= d) {
                    var g = new Float32Array(11);
                    if (b !== c || d !== e)
                        for (var h = 0; 11 > h; ++h) g[h] = a(.1 * h, b, d);
                    return function(h) {
                        if (b === c && d === e) return h;
                        if (0 === h) return 0;
                        if (1 === h) return 1;
                        for (var k = 0, l = 1; 10 !== l && g[l] <= h; ++l) k += .1;
                        --l;
                        var l = k + (h - g[l]) / (g[l + 1] - g[l]) * .1,
                            n = 3 * (1 - 3 * d + 3 * b) * l * l + 2 * (3 * d - 6 * b) * l + 3 * b;
                        if (.001 <= n) {
                            for (k = 0; 4 > k; ++k) {
                                n = 3 * (1 - 3 * d + 3 * b) * l * l + 2 * (3 * d - 6 * b) * l + 3 * b;
                                if (0 === n) break;
                                var m = a(l, b, d) - h,
                                    l = l - m / n
                            }
                            h = l
                        } else if (0 === n) h = l;
                        else {
                            var l = k,
                                k = k + .1,
                                f = 0;
                            do m = l + (k - l) / 2, n = a(m, b, d) - h, 0 < n ? k = m : l = m; while (1e-7 < Math.abs(n) &&
                                10 > ++f);
                            h = m
                        }
                        return a(h, c, e)
                    }
                }
            }
        }(),
        M = function() {
            function a(a, b) { return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b) }
            var b = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
                c = {
                    In: [
                        [.55, .085, .68, .53],
                        [.55, .055, .675, .19],
                        [.895, .03, .685, .22],
                        [.755, .05, .855, .06],
                        [.47, 0, .745, .715],
                        [.95, .05, .795, .035],
                        [.6, .04, .98, .335],
                        [.6, -.28, .735, .045], a
                    ],
                    Out: [
                        [.25, .46, .45, .94],
                        [.215, .61, .355, 1],
                        [.165, .84, .44, 1],
                        [.23, 1, .32, 1],
                        [.39, .575, .565, 1],
                        [.19, 1, .22, 1],
                        [.075, .82, .165, 1],
                        [.175, .885, .32, 1.275],
                        function(b, c) { return 1 - a(1 - b, c) }
                    ],
                    InOut: [
                        [.455, .03, .515, .955],
                        [.645, .045, .355, 1],
                        [.77, 0, .175, 1],
                        [.86, 0, .07, 1],
                        [.445, .05, .55, .95],
                        [1, 0, 0, 1],
                        [.785, .135, .15, .86],
                        [.68, -.55, .265, 1.55],
                        function(b, c) { return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2 }
                    ]
                },
                d = { linear: x(.25, .25, .75, .75) },
                e = {},
                k;
            for (k in c) e.type = k, c[e.type].forEach(function(a) { return function(c, e) { d["ease" + a.type + b[e]] = g.fnc(c) ? c : x.apply($jscomp$this, c) } }(e)), e = { type: e.type };
            return d
        }(),
        ha = {
            css: function(a, b, c) {
                return a.style[b] =
                    c
            },
            attribute: function(a, b, c) { return a.setAttribute(b, c) },
            object: function(a, b, c) { return a[b] = c },
            transform: function(a, b, c, d, e) {
                d[e] || (d[e] = []);
                d[e].push(b + "(" + c + ")")
            }
        },
        p = [],
        y = 0,
        ia = function() {
            function a() { y = requestAnimationFrame(b) }

            function b(b) {
                var c = p.length;
                if (c) {
                    for (var e = 0; e < c;) p[e] && p[e].tick(b), e++;
                    a()
                } else cancelAnimationFrame(y), y = 0
            }
            return a
        }();
    m.version = "2.0.1";
    m.speed = 1;
    m.running = p;
    m.remove = function(a) {
        a = L(a);
        for (var b = p.length - 1; 0 <= b; b--)
            for (var c = p[b], d = c.animations, e = d.length - 1; 0 <= e; e--) E(a,
                d[e].animatable.target) && (d.splice(e, 1), d.length || c.pause())
    };
    m.getValue = I;
    m.path = function(a, b) {
        var c = g.str(a) ? u(a)[0] : a,
            d = b || 100;
        return function(a) { return { el: c, property: a, totalLength: c.getTotalLength() * (d / 100) } }
    };
    m.setDashoffset = function(a) {
        var b = a.getTotalLength();
        a.setAttribute("stroke-dasharray", b);
        return b
    };
    m.bezier = x;
    m.easings = M;
    m.timeline = function(a) {
        var b = m(a);
        b.duration = 0;
        b.children = [];
        b.add = function(a) {
            v(a).forEach(function(a) {
                var c = a.offset,
                    d = b.duration;
                a.autoplay = !1;
                a.offset = g.und(c) ?
                    d : J(c, d);
                a = m(a);
                a.duration > d && (b.duration = a.duration);
                b.children.push(a)
            });
            return b
        };
        return b
    };
    m.random = function(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a };
    return m
});