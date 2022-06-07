var com = com || {};
com.init = function(stype) {
    com.nowStype = stype || com.getCookie("stype") || "stype";
    var stype = com.stype[com.nowStype];
    com.width = stype.width;
    com.height = stype.height;
    com.spaceX = stype.spaceX;
    com.spaceY = stype.spaceY;
    com.pointStartX = stype.pointStartX;
    com.pointStartY = stype.pointStartY;
    com.page = stype.page;
    com.get("box").style.width = com.width + 130 + "px";
    com.canvas = document.getElementById("chess");
    com.ct = com.canvas.getContext("2d");
    com.canvas.width = com.width;
    com.canvas.height = com.height;
    com.childList = com.childList || [];
    com.loadImages(com.page);
}
com.stype = {
    stype: {
        width: 530,
        height: 567,
        spaceX: 57,
        spaceY: 57,
        pointStartX: 0,
        pointStartY: 0,
        page: "stype"
    }
}
com.get = function(id) {
    return document.getElementById(id)
}
window.onload = function() {
    com.bg = new com.class.Bg();
    com.dot = new com.class.Dot();
    com.pane = new com.class.Pane();
    com.pane.isShow = false;
    com.childList = [com.bg, com.dot, com.pane];
    com.mans = {};
    com.createMans(com.initMap)
    com.bg.show();
    com.get("bnBox").style.display = "block";
    com.get("superPlay").addEventListener("click", function(e) {
        if (confirm("Confirm to start Pro game?")) {
            play.isPlay = true;
            com.get("chessRight").style.display = "none";
            com.get("moveInfo").style.display = "block";
            com.get("moveInfo").innerHTML = "";
            play.depth = 4;
            play.init();
        }
    })
    com.get("tyroPlay").addEventListener("click", function(e) {
        if (confirm("Confirm to start Noob game?")) {
            play.isPlay = true;
            com.get("chessRight").style.display = "none";
            com.get("moveInfo").style.display = "block";
            com.get("moveInfo").innerHTML = "";
            play.depth = 3;
            play.init();
        }
    })
    com.getData("js/gambit.all.js",
        function(data) {
            com.gambit = data.split(" ");
            AI.historyBill = com.gambit;
        })
    com.getData("js/store.js",
        function(data) {
            com.store = data.split(" ");
        })
}
com.loadImages = function(stype) {
    com.bgImg = new Image();
    com.bgImg.src = "img/" + stype + "/bg.png";
    com.dotImg = new Image();
    com.dotImg.src = "img/" + stype + "/dot.png";
    for (var i in com.args) {
        com[i] = {};
        com[i].img = new Image();
        com[i].img.src = "img/" + stype + "/" + com.args[i].img + ".png";
    }
    com.paneImg = new Image();
    com.paneImg.src = "img/" + stype + "/r_box.png";
    document.getElementsByTagName("body")[0].style.background = "url(img/" + stype + "/bg.jpg)";
}
com.show = function() {
    com.ct.clearRect(0, 0, com.width, com.height);
    for (var i = 0; i < com.childList.length; i++) {
        com.childList[i].show();
    }
}
com.showPane = function(x, y, newX, newY) {
    com.pane.isShow = true;
    com.pane.x = x;
    com.pane.y = y;
    com.pane.newX = newX;
    com.pane.newY = newY;
}
com.createMans = function(map) {
    for (var i = 0; i < map.length; i++) {
        for (var n = 0; n < map[i].length; n++) {
            var key = map[i][n];
            if (key) {
                com.mans[key] = new com.class.Man(key);
                com.mans[key].x = n;
                com.mans[key].y = i;
                com.childList.push(com.mans[key])
            }
        }
    }
}
com.alert = function(obj, f, n) {
    if (typeof obj !== "object") {
        try { console.log(obj) } catch (e) {}
    }
    var arr = [];
    for (var i in obj) arr.push(i + " = " + obj[i]);
    try { console.log(arr.join(n || "\n")) } catch (e) {}
}
var z = com.alert;
com.getDomXY = function(dom) {
    var left = dom.offsetLeft;
    var top = dom.offsetTop;
    var current = dom.offsetParent;
    while (current !== null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return { x: left, y: top };
}
com.getCookie = function(name) {
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + "=")
        if (start != -1) {
            start = start + name.length + 1
            end = document.cookie.indexOf(";", start)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(start, end))
        }
    }
    return false;
}
com.arr2Clone = function(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].slice();
    }
    return newArr;
}
com.getData = function(url, fun) {
    var XMLHttpRequestObject = false;
    if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (XMLHttpRequestObject) {
        XMLHttpRequestObject.open("GET", url);
        XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XMLHttpRequestObject.onreadystatechange = function() {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
                fun(XMLHttpRequestObject.responseText)
            }
        }
        XMLHttpRequestObject.send(null);
    }
}
com.initMap = [
    ['C0', 'M0', 'X0', 'S0', 'J0', 'S1', 'X1', 'M1', 'C1'],
    [, , , , , , , , ],
    [, 'P0', , , , , , 'P1', ],
    ['Z0', , 'Z1', , 'Z2', , 'Z3', , 'Z4'],
    [, , , , , , , , ],
    [, , , , , , , , ],
    ['z0', , 'z1', , 'z2', , 'z3', , 'z4'],
    [, 'p0', , , , , , 'p1', ],
    [, , , , , , , , ],
    ['c0', 'm0', 'x0', 's0', 'j0', 's1', 'x1', 'm1', 'c1']
];
com.initMap1 = [
    [, , , , "J0", , , , ],
    [, , , , , , , , ],
    [, , , , , "c0", , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , "s0", , , "C0", ],
    [, , , "s1", , "j0", , , ]
];
com.initMap1 = [
    [, , , , "J0", , , , ],
    [, , , , , , , , ],
    [, , , , , "z0", , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , , , , , , ],
    [, , , "j0", , , , ]
];
com.keys = {
    "c0": "c",
    "c1": "c",
    "m0": "m",
    "m1": "m",
    "x0": "x",
    "x1": "x",
    "s0": "s",
    "s1": "s",
    "j0": "j",
    "p0": "p",
    "p1": "p",
    "z0": "z",
    "z1": "z",
    "z2": "z",
    "z3": "z",
    "z4": "z",
    "z5": "z",
    "C0": "c",
    "C1": "C",
    "M0": "M",
    "M1": "M",
    "X0": "X",
    "X1": "X",
    "S0": "S",
    "S1": "S",
    "J0": "J",
    "P0": "P",
    "P1": "P",
    "Z0": "Z",
    "Z1": "Z",
    "Z2": "Z",
    "Z3": "Z",
    "Z4": "Z",
    "Z5": "Z",
}
com.bylaw = {}
com.bylaw.c = function(x, y, map, my) {
    var d = [];
    for (var i = x - 1; i >= 0; i--) {
        if (map[y][i]) {
            if (com.mans[map[y][i]].my != my) d.push([i, y]);
            break
        } else {
            d.push([i, y])
        }
    }
    for (var i = x + 1; i <= 8; i++) {
        if (map[y][i]) {
            if (com.mans[map[y][i]].my != my) d.push([i, y]);
            break
        } else {
            d.push([i, y])
        }
    }
    for (var i = y - 1; i >= 0; i--) {
        if (map[i][x]) {
            if (com.mans[map[i][x]].my != my) d.push([x, i]);
            break
        } else {
            d.push([x, i])
        }
    }
    for (var i = y + 1; i <= 9; i++) {
        if (map[i][x]) {
            if (com.mans[map[i][x]].my != my) d.push([x, i]);
            break
        } else {
            d.push([x, i])
        }
    }
    return d;
}
com.bylaw.m = function(x, y, map, my) {
    var d = [];
    if (y - 2 >= 0 && x + 1 <= 8 && !play.map[y - 1][x] && (!com.mans[map[y - 2][x + 1]] || com.mans[map[y - 2][x + 1]].my != my)) d.push([x + 1, y - 2]);
    if (y - 1 >= 0 && x + 2 <= 8 && !play.map[y][x + 1] && (!com.mans[map[y - 1][x + 2]] || com.mans[map[y - 1][x + 2]].my != my)) d.push([x + 2, y - 1]);
    if (y + 1 <= 9 && x + 2 <= 8 && !play.map[y][x + 1] && (!com.mans[map[y + 1][x + 2]] || com.mans[map[y + 1][x + 2]].my != my)) d.push([x + 2, y + 1]);
    if (y + 2 <= 9 && x + 1 <= 8 && !play.map[y + 1][x] && (!com.mans[map[y + 2][x + 1]] || com.mans[map[y + 2][x + 1]].my != my)) d.push([x + 1, y + 2]);
    if (y + 2 <= 9 && x - 1 >= 0 && !play.map[y + 1][x] && (!com.mans[map[y + 2][x - 1]] || com.mans[map[y + 2][x - 1]].my != my)) d.push([x - 1, y + 2]);
    if (y + 1 <= 9 && x - 2 >= 0 && !play.map[y][x - 1] && (!com.mans[map[y + 1][x - 2]] || com.mans[map[y + 1][x - 2]].my != my)) d.push([x - 2, y + 1]);
    if (y - 1 >= 0 && x - 2 >= 0 && !play.map[y][x - 1] && (!com.mans[map[y - 1][x - 2]] || com.mans[map[y - 1][x - 2]].my != my)) d.push([x - 2, y - 1]);
    if (y - 2 >= 0 && x - 1 >= 0 && !play.map[y - 1][x] && (!com.mans[map[y - 2][x - 1]] || com.mans[map[y - 2][x - 1]].my != my)) d.push([x - 1, y - 2]);
    return d;
}
com.bylaw.x = function(x, y, map, my) {
    var d = [];
    if (my === 1) {
        if (y + 2 <= 9 && x + 2 <= 8 && !play.map[y + 1][x + 1] && (!com.mans[map[y + 2][x + 2]] || com.mans[map[y + 2][x + 2]].my != my)) d.push([x + 2, y + 2]);
        if (y + 2 <= 9 && x - 2 >= 0 && !play.map[y + 1][x - 1] && (!com.mans[map[y + 2][x - 2]] || com.mans[map[y + 2][x - 2]].my != my)) d.push([x - 2, y + 2]);
        if (y - 2 >= 5 && x + 2 <= 8 && !play.map[y - 1][x + 1] && (!com.mans[map[y - 2][x + 2]] || com.mans[map[y - 2][x + 2]].my != my)) d.push([x + 2, y - 2]);
        if (y - 2 >= 5 && x - 2 >= 0 && !play.map[y - 1][x - 1] && (!com.mans[map[y - 2][x - 2]] || com.mans[map[y - 2][x - 2]].my != my)) d.push([x - 2, y - 2]);
    } else {
        if (y + 2 <= 4 && x + 2 <= 8 && !play.map[y + 1][x + 1] && (!com.mans[map[y + 2][x + 2]] || com.mans[map[y + 2][x + 2]].my != my)) d.push([x + 2, y + 2]);
        if (y + 2 <= 4 && x - 2 >= 0 && !play.map[y + 1][x - 1] && (!com.mans[map[y + 2][x - 2]] || com.mans[map[y + 2][x - 2]].my != my)) d.push([x - 2, y + 2]);
        if (y - 2 >= 0 && x + 2 <= 8 && !play.map[y - 1][x + 1] && (!com.mans[map[y - 2][x + 2]] || com.mans[map[y - 2][x + 2]].my != my)) d.push([x + 2, y - 2]);
        if (y - 2 >= 0 && x - 2 >= 0 && !play.map[y - 1][x - 1] && (!com.mans[map[y - 2][x - 2]] || com.mans[map[y - 2][x - 2]].my != my)) d.push([x - 2, y - 2]);
    }
    return d;
}
com.bylaw.s = function(x, y, map, my) {
    var d = [];
    if (my === 1) {
        if (y + 1 <= 9 && x + 1 <= 5 && (!com.mans[map[y + 1][x + 1]] || com.mans[map[y + 1][x + 1]].my != my)) d.push([x + 1, y + 1]);
        if (y + 1 <= 9 && x - 1 >= 3 && (!com.mans[map[y + 1][x - 1]] || com.mans[map[y + 1][x - 1]].my != my)) d.push([x - 1, y + 1]);
        if (y - 1 >= 7 && x + 1 <= 5 && (!com.mans[map[y - 1][x + 1]] || com.mans[map[y - 1][x + 1]].my != my)) d.push([x + 1, y - 1]);
        if (y - 1 >= 7 && x - 1 >= 3 && (!com.mans[map[y - 1][x - 1]] || com.mans[map[y - 1][x - 1]].my != my)) d.push([x - 1, y - 1]);
    } else {
        if (y + 1 <= 2 && x + 1 <= 5 && (!com.mans[map[y + 1][x + 1]] || com.mans[map[y + 1][x + 1]].my != my)) d.push([x + 1, y + 1]);
        if (y + 1 <= 2 && x - 1 >= 3 && (!com.mans[map[y + 1][x - 1]] || com.mans[map[y + 1][x - 1]].my != my)) d.push([x - 1, y + 1]);
        if (y - 1 >= 0 && x + 1 <= 5 && (!com.mans[map[y - 1][x + 1]] || com.mans[map[y - 1][x + 1]].my != my)) d.push([x + 1, y - 1]);
        if (y - 1 >= 0 && x - 1 >= 3 && (!com.mans[map[y - 1][x - 1]] || com.mans[map[y - 1][x - 1]].my != my)) d.push([x - 1, y - 1]);
    }
    return d;
}
com.bylaw.j = function(x, y, map, my) {
    var d = [];
    var isNull = (function(y1, y2) {
        var y1 = com.mans["j0"].y;
        var x1 = com.mans["J0"].x;
        var y2 = com.mans["J0"].y;
        for (var i = y1 - 1; i > y2; i--) {
            if (map[i][x1]) return false;
        }
        return true;
    })();
    if (my === 1) {
        if (y + 1 <= 9 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);
        if (y - 1 >= 7 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);
        if (com.mans["j0"].x == com.mans["J0"].x && isNull) d.push([com.mans["J0"].x, com.mans["J0"].y]);
    } else {
        if (y + 1 <= 2 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);
        if (y - 1 >= 0 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);
        if (com.mans["j0"].x == com.mans["J0"].x && isNull) d.push([com.mans["j0"].x, com.mans["j0"].y]);
    }
    if (x + 1 <= 5 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);
    if (x - 1 >= 3 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
    return d;
}
com.bylaw.p = function(x, y, map, my) {
    var d = [];
    var n = 0;
    for (var i = x - 1; i >= 0; i--) {
        if (map[y][i]) {
            if (n == 0) {
                n++;
                continue;
            } else {
                if (com.mans[map[y][i]].my != my) d.push([i, y]);
                break
            }
        } else {
            if (n == 0) d.push([i, y])
        }
    }
    var n = 0;
    for (var i = x + 1; i <= 8; i++) {
        if (map[y][i]) {
            if (n == 0) {
                n++;
                continue;
            } else {
                if (com.mans[map[y][i]].my != my) d.push([i, y]);
                break
            }
        } else {
            if (n == 0) d.push([i, y])
        }
    }
    var n = 0;
    for (var i = y - 1; i >= 0; i--) {
        if (map[i][x]) {
            if (n == 0) {
                n++;
                continue;
            } else {
                if (com.mans[map[i][x]].my != my) d.push([x, i]);
                break
            }
        } else {
            if (n == 0) d.push([x, i])
        }
    }
    var n = 0;
    for (var i = y + 1; i <= 9; i++) {
        if (map[i][x]) {
            if (n == 0) {
                n++;
                continue;
            } else {
                if (com.mans[map[i][x]].my != my) d.push([x, i]);
                break
            }
        } else {
            if (n == 0) d.push([x, i])
        }
    }
    return d;
}
com.bylaw.z = function(x, y, map, my) {
    var d = [];
    if (my === 1) {
        if (y - 1 >= 0 && (!com.mans[map[y - 1][x]] || com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);
        if (x + 1 <= 8 && y <= 4 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);
        if (x - 1 >= 0 && y <= 4 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
    } else {
        if (y + 1 <= 9 && (!com.mans[map[y + 1][x]] || com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);
        if (x + 1 <= 8 && y >= 6 && (!com.mans[map[y][x + 1]] || com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);
        if (x - 1 >= 0 && y >= 6 && (!com.mans[map[y][x - 1]] || com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
    }
    return d;
}
com.value = {
    c: [
        [206, 208, 207, 213, 214, 213, 207, 208, 206],
        [206, 212, 209, 216, 233, 216, 209, 212, 206],
        [206, 208, 207, 214, 216, 214, 207, 208, 206],
        [206, 213, 213, 216, 216, 216, 213, 213, 206],
        [208, 211, 211, 214, 215, 214, 211, 211, 208],
        [208, 212, 212, 214, 215, 214, 212, 212, 208],
        [204, 209, 204, 212, 214, 212, 204, 209, 204],
        [198, 208, 204, 212, 212, 212, 204, 208, 198],
        [200, 208, 206, 212, 200, 212, 206, 208, 200],
        [194, 206, 204, 212, 200, 212, 204, 206, 194]
    ],
    m: [
        [90, 90, 90, 96, 90, 96, 90, 90, 90],
        [90, 96, 103, 97, 94, 97, 103, 96, 90],
        [92, 98, 99, 103, 99, 103, 99, 98, 92],
        [93, 108, 100, 107, 100, 107, 100, 108, 93],
        [90, 100, 99, 103, 104, 103, 99, 100, 90],
        [90, 98, 101, 102, 103, 102, 101, 98, 90],
        [92, 94, 98, 95, 98, 95, 98, 94, 92],
        [93, 92, 94, 95, 92, 95, 94, 92, 93],
        [85, 90, 92, 93, 78, 93, 92, 90, 85],
        [88, 85, 90, 88, 90, 88, 90, 85, 88]
    ],
    x: [
        [0, 0, 20, 0, 0, 0, 20, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 20, 0, 0, 0, 20, 0, 0],
        [0, 0, 20, 0, 0, 0, 20, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [18, 0, 0, 0, 23, 0, 0, 0, 18],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 20, 0, 0, 0, 20, 0, 0]
    ],
    s: [
        [0, 0, 0, 20, 0, 20, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0],
        [0, 0, 0, 20, 0, 20, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 20, 0, 20, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0],
        [0, 0, 0, 20, 0, 20, 0, 0, 0]
    ],
    j: [
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
    ],
    p: [
        [100, 100, 96, 91, 90, 91, 96, 100, 100],
        [98, 98, 96, 92, 89, 92, 96, 98, 98],
        [97, 97, 96, 91, 92, 91, 96, 97, 97],
        [96, 99, 99, 98, 100, 98, 99, 99, 96],
        [96, 96, 96, 96, 100, 96, 96, 96, 96],
        [95, 96, 99, 96, 100, 96, 99, 96, 95],
        [96, 96, 96, 96, 96, 96, 96, 96, 96],
        [97, 96, 100, 99, 101, 99, 100, 96, 97],
        [96, 97, 98, 98, 98, 98, 98, 97, 96],
        [96, 96, 97, 99, 99, 99, 97, 96, 96]
    ],
    z: [
        [9, 9, 9, 11, 13, 11, 9, 9, 9],
        [19, 24, 34, 42, 44, 42, 34, 24, 19],
        [19, 24, 32, 37, 37, 37, 32, 24, 19],
        [19, 23, 27, 29, 30, 29, 27, 23, 19],
        [14, 18, 20, 27, 29, 27, 20, 18, 14],
        [7, 0, 13, 0, 16, 0, 13, 0, 7],
        [7, 0, 7, 0, 15, 0, 7, 0, 7],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}
com.value.C = com.arr2Clone(com.value.c).reverse();
com.value.M = com.arr2Clone(com.value.m).reverse();
com.value.X = com.value.x;
com.value.S = com.value.s;
com.value.J = com.value.j;
com.value.P = com.arr2Clone(com.value.p).reverse();
com.value.Z = com.arr2Clone(com.value.z).reverse();
com.args = {
    'c': { text: "��", img: 'r_c', my: 1, bl: "c", value: com.value.c },
    'm': { text: "��", img: 'r_m', my: 1, bl: "m", value: com.value.m },
    'x': { text: "��", img: 'r_x', my: 1, bl: "x", value: com.value.x },
    's': { text: "��", img: 'r_s', my: 1, bl: "s", value: com.value.s },
    'j': { text: "��", img: 'r_j', my: 1, bl: "j", value: com.value.j },
    'p': { text: "��", img: 'r_p', my: 1, bl: "p", value: com.value.p },
    'z': { text: "��", img: 'r_z', my: 1, bl: "z", value: com.value.z },
    'C': { text: "܇", img: 'b_c', my: -1, bl: "c", value: com.value.C },
    'M': { text: "�R", img: 'b_m', my: -1, bl: "m", value: com.value.M },
    'X': { text: "��", img: 'b_x', my: -1, bl: "x", value: com.value.X },
    'S': { text: "ʿ", img: 'b_s', my: -1, bl: "s", value: com.value.S },
    'J': { text: "˧", img: 'b_j', my: -1, bl: "j", value: com.value.J },
    'P': { text: "��", img: 'b_p', my: -1, bl: "p", value: com.value.P },
    'Z': { text: "��", img: 'b_z', my: -1, bl: "z", value: com.value.Z }
};
com.class = com.class || {}
com.class.Man = function(key, x, y) {
    this.pater = key.slice(0, 1);
    var o = com.args[this.pater]
    this.x = x || 0;
    this.y = y || 0;
    this.key = key;
    this.my = o.my;
    this.text = o.text;
    this.value = o.value;
    this.isShow = true;
    this.alpha = 1;
    this.ps = [];
    this.show = function() {
        if (this.isShow) {
            com.ct.save();
            com.ct.globalAlpha = this.alpha;
            com.ct.drawImage(com[this.pater].img, com.spaceX * this.x + com.pointStartX, com.spaceY * this.y + com.pointStartY);
            com.ct.restore();
        }
    }
    this.bl = function(map) {
        var map = map || play.map
        return com.bylaw[o.bl](this.x, this.y, map, this.my)
    }
}
com.class.Bg = function(img, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.isShow = true;
    this.show = function() {
        if (this.isShow) com.ct.drawImage(com.bgImg, com.spaceX * this.x, com.spaceY * this.y);
    }
}
com.class.Pane = function(img, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.newX = x || 0;
    this.newY = y || 0;
    this.isShow = true;
    this.show = function() {
        if (this.isShow) {
            com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX, com.spaceY * this.y + com.pointStartY)
            com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX, com.spaceY * this.newY + com.pointStartY)
        }
    }
}
com.class.Dot = function(img, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.isShow = true;
    this.dots = []
    this.show = function() {
        for (var i = 0; i < this.dots.length; i++) {
            if (this.isShow) com.ct.drawImage(com.dotImg, com.spaceX * this.dots[i][0] + 10 + com.pointStartX, com.spaceY * this.dots[i][1] + 10 + com.pointStartY)
        }
    }
}
com.init();