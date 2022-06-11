function R(args) {
    return new Get(args);
}



function Get(args) {

    this.elements = [];

    if (typeof args == 'string') {

        if (args.indexOf(' ') != -1) {
            var splits = args.split(' ');
            var childElements = [];
            var node = [];
            for (var i = 0; i < splits.length; i++) {
                if (node.length == 0) node.push(document);
                switch (splits[i].charAt(0)) {
                    case '#':
                        childElements = [];
                        childElements.push(this.getid(splits[i].substring(1)));
                        node = childElements;
                        break;
                    case '.':
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getclass(splits[i].substring(1), node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                    default:
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.gettag(splits[i], node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
        } else {


            switch (args.charAt(0)) {
                case '#':
                    this.elements[0] = this.getid(args.substring(1))
                    break;
                case '.':
                    this.elements = this.getclass(args.substring(1))
                    break;
                default:
                    this.elements = this.gettag(args);
            }
        }
    } else if (typeof args == 'object') {
        this.elements[0] = args;
    } else if (typeof args == 'function') {
        addDomLoaded(args);
    }
}


function t(a) {
    if (a == undefined) {
        alert('ok');
    } else {
        console.log(a);
    }
}








Get.prototype.animate = function(obj) {
























    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        var attr = obj['attr'] == 'x' ? ('left') : obj['attr'] == 'y' ? 'top' :
            obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
            obj['attr'] != undefined ? obj['attr'] : 0;

        var step = obj['step'] != undefined ? obj['step'] : 10;
        var start = (obj['start'] != undefined) ? obj['start'] : getStyle(element, attr);
        var time = obj['time'] != undefined ? obj['time'] : '100';
        var target = obj['target'] != undefined ? obj['target'] :
            obj['alter'] != undefined ? obj['alter'] + start : start;

        var speed = obj['speed'] != undefined ? obj['speed'] : 10;
        var type = obj['type'] == 0 ? 0 : obj['type'] == 1 ? 1 : 1

        var o = obj['opacity'] != undefined ? obj['opacity'] : undefined;
        var oSpeed = obj['oSpeed'] != undefined ? obj['oSpeed'] : 10;
        var oTime = obj['oTime'] != undefined ? obj['oTime'] : 100;

        var trform = obj['trform'];

        var mul = obj['mul']

        if (mul == undefined) {
            mul = {};
            mul[attr] = target;
        }

        if (mul != null) {


            element.style[mul[attr]] = start + 'px';
            if (start > mul[target]) step = -step;
            clearInterval(element.timer);
            element.timer = setInterval(function() {

                var bool = true;
                for (var i in mul) {
                    attr = (i == 'x' ? 'left' : i == 'y' ? 'top' :
                        i == 'w' ? 'width' : i == 'h' ? 'height' : i)
                    target = mul[i];

                    var clearT = function() {
                        element.style[attr] = target + 'px';

                        if (bool) {
                            clearInterval(element.timer);
                            if (obj.fn) obj.fn();
                        }
                    }
                    if (type == 1) {
                        step = (target - getStyle(element, attr)) / speed;
                        step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    } else {
                        step = start > mul[target] ? -10 : 10;
                    }
                    if (step == 0) {
                        clearT();
                    }
                    if (step > 0 && getStyle(element, attr) + step >= target) {
                        clearT();
                    } else if (step < 0 && getStyle(element, attr) + step <= target) {
                        clearT();
                    } else {
                        element.style[attr] = getStyle(element, attr) + step + 'px';
                    }
                    if (parseInt(getStyle(element, attr)) != parseInt(target)) bool = false;


                }
            }, time)
        }


        if (o != undefined) {
            var temp = o.split('-')

            if (temp[0] != ' ') {
                temp[0] = parseFloat(temp[0]);
            }
            temp[1] = parseFloat(temp[1]);
            var oStep = 10;
            if (obj['oType'] == 0) type = 0;
            if (typeof temp[0] == 'number') element.style.opacity = temp[0] / 100;

            var clearT2 = function() {
                element.style['opacity'] = temp[1] / 100;
                clearInterval(element.opy);
                if (obj.fn) obj.fn();

            }
            clearInterval(element.opy);
            element.opy = setInterval(function() {


                if (type == 1) {
                    oStep = (temp[1] - parseFloat(getStyle(element, 'opacity', 'toStr')) * 100) / oSpeed;
                    oStep = oStep > 0 ? Math.ceil(oStep) : Math.floor(oStep);

                } else {
                    oStep = (temp[1] - parseFloat(getStyle(element, 'opacity', 'toStr')) * 100) > 0 ? 5 : -5

                }
                if (oStep == 0) {
                    clearT2();
                }
                if (oStep > 0 && (parseFloat(getStyle(element, 'opacity', 'toStr')) + oStep / 100 >= temp[1] / 100)) {
                    clearT2();
                } else if (oStep < 0 && (parseFloat(getStyle(element, 'opacity', 'toStr')) + oStep / 100 <= temp[1] / 100)) {
                    clearT2();
                } else {
                    element.style['opacity'] = parseFloat(getStyle(element, 'opacity', 'toStr')) + (oStep / 100)
                }




            }, oTime)
        }


        if (trform != undefined) {
            var axis = trform['axis'];
            var origin = trform['origin'].split('-');
            var deg = trform['deg'].split('-');
            var sTime = trform['sTime'] ? trform['sTime'] : 100;
            var sSpeed = trform['sSpeed'] != undefined ? trform['sSpeed'] : 10;
            var sStep = trform['sStep'] ? trform['sStep'] : 10;
            if (trform['sType'] == 0) type = 0;
            if (deg[0] != ' ') {
                deg[0] = parseFloat(deg[0]);
            }
            deg[1] = parseFloat(deg[1]);

            element.style['transform-origin'] = origin[0] + '%' + ' ' + origin[1] + '%';
            if (typeof deg[0] == 'number') element.style.transform = 'rotate' + axis + '(' + deg[0] + 'deg)';


            var clearT3 = function() {
                element.style['transform'] = 'rotate' + axis + '(' + deg[1] + 'deg)';
                clearInterval(element.trf);
                if (obj.fn) obj.fn();

            }
            clearInterval(element.trf);

            element.trf = setInterval(function() {
                var n_deg = +element.style.transform.match(/\d+/)[0];
                if (type == 1) {

                    sStep = (deg[1] - n_deg) / sSpeed;
                    sStep = sStep > 0 ? Math.ceil(sStep) : Math.floor(sStep);

                } else {
                    sStep = (deg[1] - n_deg) > 0 ? sStep : -sStep

                }
                if (sStep == 0) {
                    clearT3();
                }
                if (sStep > 0 && (n_deg + sStep >= deg[1])) {
                    clearT3();
                } else if (oStep < 0 && (n_deg + oStep <= deg[1])) {
                    clearT3();
                } else {
                    element.style['transform'] = 'rotate' + axis + '(' + (n_deg + sStep) + 'deg)'
                }

            }, sTime)



        }

    }

}

Get.prototype.ready = function(fn) {
    addDomLoaded(fn);
}

Get.prototype.timing = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        element.timing = setInterval(fn)

    }
    return this;
}

Get.prototype.resize = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        window.onresize = function() {
            fn();
            if (document.documentElement.clientWidth - element.offsetLeft < element.offsetWidth) {
                element.style.left = document.documentElement.clientWidth - element.offsetWidth + 'px';
            }
            if (document.documentElement.clientHeight - element.offsetTop < element.offsetHeight) {
                element.style.top = document.documentElement.clientHeight - element.offsetHeight + 'px';
            }
        }

    }
    return this;
}

Get.prototype.center = function(width, height) {
    if ((typeof width == 'number') && (typeof height == 'number')) {
        var top = (document.documentElement.clientHeight - height) / 2;
        var left = (document.documentElement.clientWidth - width) / 2;
        if (top < 70) top = 70;
        if (left < 0) left = 0;
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].style.top = top + 'px';
            this.elements[i].style.left = left + 'px';
        }
    } else t('输入有误');
    return this;
}

Get.prototype.show = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
    return this;
}

Get.prototype.hide = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';

    }
    return this;
}

Get.prototype.hover = function(over, out) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    };
    return this;
}

Get.prototype.toggle = function() {
    for (var i = 0; i < this.elements.length; i++) {








        var fun = function(element, args) {
            var count = 0;
            addEvent(element, 'click', function(e) {
                args[count++ % args.length].call(this, e);
            })
        }
        fun(this.elements[i], arguments)
    };
    return this;
}

Get.prototype.removerule = function(num, index) {
    var sheet = document.styleSheets[num];
    if (typeof sheet.deleteRule != 'undefined') {
        sheet.deleteRule(index)
    } else if (typeof sheet.removeRule != 'undefined') {
        sheet.removeRule(index)
    }
    return this;
}

Get.prototype.addrule = function(num, selectText, cssText, position) {
    var sheet = document.styleSheets[num];
    if (typeof sheet.insertRule != 'undefined') {
        sheet.insertRule(selectText + '{' + cssText + '}', position)
    } else if (typeof sheet.addRule != 'undefined') {
        sheet.addRule(selectText, cssText, position)
    }
    return this;
}

Get.prototype.removeclass = function(classname) {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'))) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + classname + '(\\s|$)'), '')
        }
    };
    return this;
}

Get.prototype.addclass = function(classname) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[i].className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'))) {
            this.elements[i].className += ' ' + classname
        }
    };
    return this;
}

Get.prototype.css = function(se, vl) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            if (typeof this.elements[i].currentStyle != 'undefined') {
                return this.elements[i].currentStyle[se];
            } else if (typeof window.getComputedStyle != 'undefined') {
                return window.getComputedStyle(this.elements[i], null)[se];
            }
        }
        this.elements[i].style[se] = vl;
    }
    return this;
}

Get.prototype.html = function(str) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 0) {
            return this.elements[i].innerHTML
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}

Get.prototype.bind = function(ev, fn) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], ev, fn)
    }
    return this;
}

Get.prototype.focus = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onfocus = fn;
    }
    return this;
}

Get.prototype.blur = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onblur = fn;
    }
    return this;
}

Get.prototype.keydown = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        document.onkeydown = fn;
    }
    return this;
}

Get.prototype.keyup = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        document.onkeyup = fn;
    }
    return this;
}

Get.prototype.click = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], 'click', fn)
    }
    return this;
}

Get.prototype.zoom = function(classN, marginX, marginY) {
    for (var i = 0, len = this.elements.length; i < len; i++) {
        addEvent(this.elements[i], 'mousedown', function(e) {
            target = e.target || e.srcElement;
            if (classN == target.className) {
                var pgm = this;
                var pb = R(pgm).find('.pgm-body').first();
                var ox = pgm.offsetLeft + marginX;
                var oy = pb.offsetTop + pgm.offsetTop + marginY;

                document.onmousemove = function(e) {
                    var nx = e.clientX;
                    var ny = e.clientY;
                    var x = nx - ox;
                    var y = ny - oy;
                    if (x < 240) { x = 240; }
                    pgm.style.width = x + 'px';
                    pb.style.height = y + 'px';
                }
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            } else {

            }
        })
    }
}








Get.prototype.attr = function(attr) {
    return this.elements[0][attr]
}

Get.prototype.childNum = function() {
    for (var i = 0; i < this.elements.length; i++) {
        var parent = this.elements[i].parentNode
        for (var j = 0; j < parent.children.length; j++) {
            if (parent.children[j] == this.elements[i]) {
                return j;
            }
        }
    }
}

Get.prototype.find = function(str) {
    var childElements = [];
    for (var i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case '#':
                childElements.push(document.getElementById(str.substring(1)))
                break;
            case '.':






                var allc = this.getclass(str.substring(1), this.elements[i])
                for (var j = 0; j < allc.length; j++) {
                    childElements.push(allc[j]);
                }
                break;
            default:




                var allt = this.gettag(str, this.elements[i])
                for (var j = 0; j < allt.length; j++) {
                    childElements.push(allt[j]);
                }
        };
    };
    this.elements = childElements;
    return this;
}

Get.prototype.getid = function(id, parentNode) {
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    };
    return node.getElementById(id);
}

Get.prototype.gettag = function(tag, parentNode) {
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    };
    var allt = node.getElementsByTagName(tag);
    for (var i = 0; i < allt.length; i++) {
        temps.push(allt[i]);
    }
    return temps;
}


Get.prototype.getclass = function(classname, parentNode) {
    var node = null;
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    };
    var all = node.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (new RegExp('(\\s|^)' + classname + '(\\s|$)').test(all[i].className)) {
            temps.push(all[i]);
        };
    };
    return temps;
}

Get.prototype.next = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i] = this.elements[i].nextSibling;

        if (this.elements[i] == null) throw new Error('none node');
        if (this.elements[i].nodeType == 3) this.next();
    }

    return this
}

Get.prototype.parent = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i] = this.elements[i].parentNode;
    }
    return this
}

Get.prototype.getnum = function(num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}

Get.prototype.getnumOne = function(num) {
    return this.elements[num];
}

Get.prototype.first = function() {
    return this.elements[0];
}

Get.prototype.last = function() {
    return this.elements[this.elements.length - 1];
}

Get.prototype.do = function(fn) {
    fn();
}

Get.prototype.extend = function(name, fn) {
    Get.prototype[name] = fn;
}

function wei() {
    R('.weixin').css('display', 'flex')
}
R('.weixin').bind('mousedown', function() {
    R('.weixin').css('display', 'none')
})

jQuery('.arlo_tm_counter').each(function() {

    "use strict";

    var el = jQuery(this);
    el.waypoint({
        handler: function() {

            if (!el.hasClass('stop')) {
                el.addClass('stop').countTo({
                    refreshInterval: 50,
                    formatter: function(value, options) {
                        return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                    },
                });
            }
        },
        offset: '95%'
    });
});