var AI = AI || {};
AI.historyTable = {};
AI.init = function(pace) {
    var bill = AI.historyBill || com.gambit;
    if (bill.length) {
        var len = pace.length;
        var arr = [];
        for (var i = 0; i < bill.length; i++) {
            if (bill[i].slice(0, len) == pace) {
                arr.push(bill[i]);
            }
        }
        if (arr.length) {
            var inx = Math.floor(Math.random() * arr.length);
            AI.historyBill = arr;
            return arr[inx].slice(len, len + 4).split("");
        } else {
            AI.historyBill = [];
        }
    }
    var initTime = new Date().getTime();
    AI.treeDepth = play.depth;
    AI.number = 0;
    AI.setHistoryTable.lenght = 0
    var val = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, com.arr2Clone(play.map), play.my);
    if (!val || val.value == -8888) {
        AI.treeDepth = 2;
        val = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, com.arr2Clone(play.map), play.my);
    }
    if (val && val.value != -8888) {
        var man = play.mans[val.key];
        var nowTime = new Date().getTime();
        return [man.x, man.y, val.x, val.y]
    } else {
        return false;
    }
}
AI.iterativeSearch = function(map, my) {
    var timeOut = 100;
    var initDepth = 1;
    var maxDepth = 8;
    AI.treeDepth = 0;
    var initTime = new Date().getTime();
    var val = {};
    for (var i = initDepth; i <= maxDepth; i++) {
        var nowTime = new Date().getTime();
        AI.treeDepth = i;
        AI.aotuDepth = i;
        var val = AI.getAlphaBeta(-99999, 99999, AI.treeDepth, map, my)
        if (nowTime - initTime > timeOut) {
            return val;
        }
    }
    return false;
}
AI.getMapAllMan = function(map, my) {
    var mans = [];
    for (var i = 0; i < map.length; i++) {
        for (var n = 0; n < map[i].length; n++) {
            var key = map[i][n];
            if (key && play.mans[key].my == my) {
                play.mans[key].x = n;
                play.mans[key].y = i;
                mans.push(play.mans[key])
            }
        }
    }
    return mans;
}
AI.getMoves = function(map, my) {
    var manArr = AI.getMapAllMan(map, my);
    var moves = [];
    var foul = play.isFoul;
    for (var i = 0; i < manArr.length; i++) {
        var man = manArr[i];
        var val = man.bl(map);
        for (var n = 0; n < val.length; n++) {
            var x = man.x;
            var y = man.y;
            var newX = val[n][0];
            var newY = val[n][1];
            if (foul[0] != x || foul[1] != y || foul[2] != newX || foul[3] != newY) {
                moves.push([x, y, newX, newY, man.key])
            }
        }
    }
    return moves;
}
AI.getAlphaBeta = function(A, B, depth, map, my) {
    if (depth == 0) {
        return { "value": AI.evaluate(map, my) };
    }
    var moves = AI.getMoves(map, my);
    for (var i = 0; i < moves.length; i++) {
        var move = moves[i];
        var key = move[4];
        var oldX = move[0];
        var oldY = move[1];
        var newX = move[2];
        var newY = move[3];
        var clearKey = map[newY][newX] || "";
        map[newY][newX] = key;
        delete map[oldY][oldX];
        play.mans[key].x = newX;
        play.mans[key].y = newY;
        if (clearKey == "j0" || clearKey == "J0") {
            play.mans[key].x = oldX;
            play.mans[key].y = oldY;
            map[oldY][oldX] = key;
            delete map[newY][newX];
            if (clearKey) {
                map[newY][newX] = clearKey;
            }
            return { "key": key, "x": newX, "y": newY, "value": 8888 };
        } else {
            var val = -AI.getAlphaBeta(-B, -A, depth - 1, map, -my).value;
            play.mans[key].x = oldX;
            play.mans[key].y = oldY;
            map[oldY][oldX] = key;
            delete map[newY][newX];
            if (clearKey) {
                map[newY][newX] = clearKey;
            }
            if (val >= B) {
                return { "key": key, "x": newX, "y": newY, "value": B };
            }
            if (val > A) {
                A = val;
                if (AI.treeDepth == depth) var rootKey = { "key": key, "x": newX, "y": newY, "value": A };
            }
        }
    }
    if (AI.treeDepth == depth) {
        if (!rootKey) {
            return false;
        } else {
            return rootKey;
        }
    }
    return { "key": key, "x": newX, "y": newY, "value": A };
}
AI.setHistoryTable = function(txtMap, depth, value, my) {
    AI.setHistoryTable.lenght++;
    AI.historyTable[txtMap] = { depth: depth, value: value }
}
AI.evaluate = function(map, my) {
    var val = 0;
    for (var i = 0; i < map.length; i++) {
        for (var n = 0; n < map[i].length; n++) {
            var key = map[i][n];
            if (key) {
                val += play.mans[key].value[i][n] * play.mans[key].my;
            }
        }
    }
    AI.number++;
    return val * my;
}
AI.evaluate1 = function(map, my) {
    var val = 0;
    for (var i in play.mans) {
        var man = play.mans[i];
        if (man.isShow) {
            val += man.value[man.y][man.x] * man.my;
        }
    }
    AI.number++;
    return val * my;
}