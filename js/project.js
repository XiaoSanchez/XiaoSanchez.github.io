Testing();

if (sys.chrome) {
    R('.exe-box p').css('text-shadow', 'none')
}






var desk = document.documentElement;

function fullscreen() {
    if (desk.requestFullscreen) {
        desk.requestFullscreen();
    } else if (desk.mozRequestFullScreen) {
        desk.mozRequestFullScreen();
    } else if (desk.webkitRequestFullScreen) {
        desk.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}


R('#exe1').drag(R('#exe1 .exe-cover').last());
R('#exe2').drag(R('#exe2 .exe-cover').last());
R('#exe3').drag(R('#exe3 .exe-cover').last());
R('#exe4').drag(R('#exe4 .exe-cover').last());
R('#exe5').drag(R('#exe5 .exe-cover').last());
R('#exe6').drag(R('#exe6 .exe-cover').last());
R('#exe7').drag(R('#exe7 .exe-cover').last());


var whlt = [];
var z = 10;

R('.exe-box').bind('dblclick', function(e) {
    var exeId = R(this).first().id;
    var _this = this;


    if (_this.attributes["target"] && _this.attributes["target"].value == '_blank') {
        window.open(_this.attributes["pageurl"].value);

    } else {

        openPgm(exeId, _this);
    }

})


function openPgm(exeId, _this) {
    var pgm = R('.pgm-box').html()
    var pageurl = _this.attributes["pageurl"].value;
    var pgmName = R(_this).find('p').html();


    if (!R('#pgm' + exeId).elements[0]) {
        pgm += `<div id="pgm${exeId}" class="program">
				<div class="pgm-head">
					<div class="head-left">
						<img src="../icon/computer.png" alt="">
						<p>${pgmName}</p>
					</div>
					<div class="head-right">
						<p class="execlose"></p>
						<p class="exemax"></p>
						<p class="exemin"></p>
					</div>
				</div>
				<div class="pgm-menu">
					<ul>
						<li>文件</li>
						<li>编辑</li>
						<li>查找</li>
						<li>帮助</li>
					</ul>
				</div>
				<div class="pgm-body">
					<iframe src="${pageurl}" frameborder="0"></iframe>
				</div>
				<div class="pgm-zoom"></div>
			</div><br/>`
        R('.pgm-box').html(pgm);

        var num = exeId.match(/\d?$/)
        num = parseInt(num[0])
        var sw = 100;
        var sh = 10;
        if (document.body.clientWidth < 480) {
            sw = 10;
            sh = 10;
        }
        R('#pgm' + exeId).css('left', sw + num * 20 + 'px').css('top', sh + num * 20 + 'px')

        var n = R('.program').elements;
        for (var i = 0, len = n.length; i < len; i++) {
            var id = n[i].id.match(/\d+/)

            R('#pgmexe' + id[0]).drag(R('#pgmexe' + id + ' .pgm-head').last(), R('#pgmexe' + id + ' .program').last());

            R('.program').click(function() { R(this).css('z-index', z++) })

            R('#pgmexe' + id[0]).zoom('pgm-zoom', 10, 0);


        }




        var taskExe = R('.task-box').html();
        var taskimg = R(_this).find('img').first().src;
        taskExe += `<div id="task${exeId}" class="task-exe">
						<img src="${taskimg}" alt="">
					</div>`
        R('.task-box').html(taskExe);

        R('.taskbar .task-exe').click(function(e) {
            var parent = R(this).elements[0].id.match(/\d+/);
            var num = parseInt(parent);
            parent = R('#pgmexe' + parent).elements[0];
            taskMinMax(parent, num)
        })



        R('.execlose').click(function() {

            var parent = R(this).elements[0].parentElement.parentElement.parentElement;
            parent.style['display'] = 'none';

            var tid = parent.id.match(/\d+/);
            R('#taskexe' + tid).css('display', 'none')
        })


        R('.exemin').click(function() {
            var parent = R(this).elements[0].parentElement.parentElement.parentElement;
            min(parent);
        })


        R('.exemax').click(function() {
            window.open(pageurl);
        })


    } else {
        R('#pgm' + exeId).css('z-index', z++);
        R('#pgm' + exeId).css('display', 'block');
        R('#task' + exeId).css('display', 'block');
    }
}





document.oncontextmenu = function(e) {
    e.preventDefault();
};



R('.pgm-box').bind('mouseup', function(e) {
    if (e.button == 2) {
        var x = e.clientX;
        var y = e.clientY;
        R('#Pmenu').elements[0].style.left = x + 'px';
        R('#Pmenu').elements[0].style.top = y + 'px';
        R('#Pmenu').css('display', 'block');
        R('#Emenu').css('display', 'none');



    } else if (e.button == 0) {
        R('#Pmenu').css('display', 'none');
    } else if (e.button == 1) {}
})

R('.exe-box').bind('mousedown', function(e) {
    if (e.button == 2) {
        var x = e.clientX;
        var y = e.clientY;
        var _this = this;
        R('#Pmenu').css('display', 'none')
        R('#Emenu').elements[0].style.left = x + 'px';
        R('#Emenu').elements[0].style.top = y + 'px';
        R('#Emenu').css('display', 'block');
        R('.pgm-box').click(function() {
            R('#Emenu').css('display', 'none');
        })

        R('#E-open').click(function() {
            var exeId = R(_this).first().id;
            console.log('a')
            openPgm(exeId, _this);
        })

        R('.f5').click(function() {
            location.reload(true);
        })
    } else {
        R('#Emenu').css('display', 'none');
    }
})





R('#fullP').click(function() {
    if (desk.requestFullscreen) {
        desk.requestFullscreen();
    } else if (desk.mozRequestFullScreen) {
        desk.mozRequestFullScreen();
    } else if (desk.webkitRequestFullScreen) {
        desk.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
})

R('begin-box img').click(function() {
    if (R('.begin-menu').css('display') == 'none') {
        R('.begin-menu').css('display', 'flex');
    } else {
        R('.begin-menu').css('display', 'none');
    }

})
R(document).click(function(e) {
    if (e.target == R('.pgm-box').first()) {
        R('.begin-menu').css('display', 'none');
    }
})



var date = new Date();
var ymd = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
var timeStr = date.toTimeString().substring(0, 5);
R('.task-date p').html(timeStr);
R('.task-date').first().title = ymd;
setInterval(function() {
    date = new Date();
    timeStr = date.toTimeString().substring(0, 5);
    R('.task-date p').html(timeStr);
}, 10000)


R('#exe9').click(function() {
    R(this).find('img').removeclass('shake-constant');
})
R('#exe9').bind('dblclick', function() {
    R(this).css('top', '20px');
})



















function min(parent) {
    var ol = parent.getBoundingClientRect().left;
    var ot = parent.getBoundingClientRect().top;
    var ow = parent.offsetWidth;
    var oh = parent.offsetHeight;
    var tid = parent.id.match(/\d+/);
    var l = R('#taskexe' + tid).elements[0].getBoundingClientRect().left;
    var t = R('#taskexe' + tid).elements[0].getBoundingClientRect().top;
    whlt[tid] = {
        w: ow,
        h: oh,
        l: ol,
        t: ot
    }
    R(parent).animate({
        alter: 150,
        time: 1,
        mul: {
            w: 25,
            h: 10,
            x: l,
            y: t
        },
        fn: function() {
            R(parent).css('display', 'none');
        }
    })

}

function max(parent, num) {
    R(parent).css('display', 'block')
    R(parent).animate({
        alter: 300,
        time: 1,
        mul: {
            w: whlt[num].w,
            h: whlt[num].h - 20,
            x: whlt[num].l,
            y: whlt[num].t
        }
    })
}

function taskMinMax(parent, num) {

    if (getStyle(R(parent).elements[0], 'display', 'toStr') == 'block') {
        min(parent)
    } else {
        max(parent, num)
    }


}




var device = navigator.userAgent.toLowerCase();

var page = "project";