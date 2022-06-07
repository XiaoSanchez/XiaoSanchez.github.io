"use strict";
var allNode = R('.up-box').child().elements[0];
var rr = 4;
var cc = 4
var score = 0;
var isMove = 0;

function getX(elements) {
    return elements['offsetLeft'];
}

function getY(elements) {
    return elements['offsetTop'];
}

function random(n) {
    var num = Math.random();
    return parseInt(num * n);
}

function newNode() {
    if (isMove) return;
    var n = Math.random();
    var a = random(rr);
    var b = random(cc);
    if (allNode.length >= 16) { return null; }
    for (let i = 0, len = allNode.length; i < len; i++) {
        if (allNode[i].offsetLeft == a * 120 + 20 && allNode[i].offsetTop == b * 120 + 20) {
            newNode()
            return;
        }
    }
    var newDiv = document.createElement("div");
    newDiv.className = 'cell';
    newDiv.style.left = a * 120 + 10 + 'px';
    newDiv.style.top = b * 120 + 10 + 'px';
    newDiv.innerHTML = n < 0.5 ? 2 : 4;
    R('.up-box').first().appendChild(newDiv);
    allNode = R('.up-box').child().elements[0];
    color();
    getScore();
    isMove = 1;
}

function row(nodes, n) {
    var r = [];
    var p = n * 120 + 20;
    for (let i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].offsetTop == p) {
            r.push(nodes[i]);
        }
    }
    return r;
}

function col(nodes, n) {
    var c = [];
    var p = n * 120 + 20;
    for (let i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].offsetLeft == p) {
            c.push(nodes[i]);
        }
    }
    return c;
}

function val(node) {
    return node.innerText;
}

function begin() {
    score = 0;
    R('.cover').css('display', 'none');
    R('.up-box').html('');
    newNode();
    newNode();
    R('.score').html('分数：0');
}
begin();

function GameOver() {
    var isOver = true;
    if (allNode.length == 16) {
        for (let i = 0; i < rr; i++) {
            var theR = row(allNode, i);
            for (let j = 1; j < cc; j++) {
                if (col(theR, j)[0].innerText == col(theR, j - 1)[0].innerText) {
                    isOver = false;
                }
            }
        }
        for (let i = 0; i < cc; i++) {
            var theC = col(allNode, i);
            for (let j = 1; j < rr; j++) {
                if (row(theC, j)[0].innerText == row(theC, j - 1)[0].innerText) {
                    isOver = false;
                }
            }
        }
        if (isOver) {
            R('.cover').css('display', 'block');
        }
    }
}

function getScore() {
    var s = '分数：' + score;
    R('.score').html(s);
}

function color() {
    var n = allNode.length;
    for (let i = 0; i < n; i++) {
        let a = parseInt(allNode[i].innerText)
        allNode[i].className = 'cell bg-' + a
    }
}

function moveL() {
    for (let i = 0; i < rr; i++) {
        var theR = row(allNode, i);
        var bd = 0;
        var last = null;
        for (let j = 0; j < cc; j++) {
            var theC = col(theR, j);
            if (theC.length != 0) {
                if (last) {
                    if (last.innerText == theC[0].innerText) {
                        theC[0].style.left = (bd - 1) * 120 + 10 + 'px';
                        theC[0].innerText *= 2;
                        score += parseInt(last.innerText);
                        theC[0].parentNode.removeChild(last);
                        last = theC[0];
                    } else {
                        theC[0].style.left = bd * 120 + 10 + 'px';
                        last = theC[0];
                        bd++;
                    }
                } else {
                    theC[0].style.left = bd * 120 + 10 + 'px';
                    last = theC[0];
                    bd++;
                }
            }
        }
    }
}

function moveR() {
    for (let i = 0; i < rr; i++) {
        var theR = row(allNode, i);
        var bd = 3;
        var last = null;
        for (let j = cc - 1; j >= 0; j--) {
            var theC = col(theR, j);
            if (theC.length != 0) {
                if (last) {
                    if (last.innerText == theC[0].innerText) {
                        theC[0].style.left = (bd + 1) * 120 + 10 + 'px';
                        theC[0].innerText *= 2;
                        score += parseInt(last.innerText);
                        theC[0].parentNode.removeChild(last);
                        last = theC[0];
                    } else {
                        theC[0].style.left = bd * 120 + 10 + 'px';
                        last = theC[0];
                        bd--;
                    }
                } else {
                    theC[0].style.left = bd * 120 + 10 + 'px';
                    last = theC[0];
                    bd--;
                }
            }
        }
    }
}

function moveT() {
    for (let i = 0; i < cc; i++) {
        var theC = col(allNode, i);
        var bd = 0;
        var last = null;
        for (let j = 0; j < rr; j++) {
            var theR = row(theC, j);
            if (theR.length != 0) {
                if (last) {
                    if (last.innerText == theR[0].innerText) {
                        theR[0].style.top = (bd - 1) * 120 + 10 + 'px';
                        theR[0].innerText *= 2;
                        score += parseInt(last.innerText);
                        theR[0].parentNode.removeChild(last);
                        last = theR[0];
                    } else {
                        theR[0].style.top = bd * 120 + 10 + 'px';
                        last = theR[0];
                        bd++;
                    }
                } else {
                    theR[0].style.top = bd * 120 + 10 + 'px';
                    last = theR[0];
                    bd++;
                }
            }
        }
    }
}

function moveB() {
    for (let i = 0; i < rr; i++) {
        var theC = col(allNode, i);
        var bd = 3;
        var last = null;
        for (let j = cc - 1; j >= 0; j--) {
            var theR = row(theC, j);
            if (theR.length != 0) {
                if (last) {
                    if (last.innerText == theR[0].innerText) {
                        theR[0].style.top = (bd + 1) * 120 + 10 + 'px';
                        theR[0].innerText *= 2;
                        score += parseInt(last.innerText);
                        theR[0].parentNode.removeChild(last);
                        last = theR[0];
                    } else {
                        theR[0].style.top = bd * 120 + 10 + 'px';
                        last = theR[0];
                        bd--;
                    }
                } else {
                    theR[0].style.top = bd * 120 + 10 + 'px';
                    last = theR[0];
                    bd--;
                }
            }
        }
    }
}
R(document).bind('transitionend', newNode);
R(document).bind('keydown', function(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
        moveL();
        isMove = 0;
    }
    if (e.keyCode == 39 || e.keyCode == 68) {
        moveR();
        isMove = 0;
    }
    if (e.keyCode == 38 || e.keyCode == 87) {
        moveT();
        isMove = 0;
    }
    if (e.keyCode == 40 || e.keyCode == 83) {
        moveB();
        isMove = 0;
    }
    GameOver();
})
var X0 = 0;
var Y0 = 0;
document.ontouchstart = function(e) {
    X0 = e.touches[0].screenX;
    Y0 = e.touches[0].screenY;
}
document.ontouchmove = function(e) {
    e.preventDefault()
}
document.ontouchend = function(e) {
    var x = e.changedTouches[0].screenX;
    var y = e.changedTouches[0].screenY;
    var a = x - X0;
    var b = y - Y0;
    if (a < 0 && Math.abs(a) > Math.abs(b)) {
        moveL();
        newNode()
    } else if (a > 0 && Math.abs(a) > Math.abs(b)) {
        moveR();
        newNode()
    } else if (b < 0 && Math.abs(a) < Math.abs(b)) {
        moveT();
        newNode()
    } else if (b > 0 && Math.abs(a) < Math.abs(b)) {
        moveB();
        newNode()
    }
    GameOver();
}
R('#r-start').click(function() {
    begin();
})