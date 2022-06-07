R().extend('drag', function() {
    var tags = arguments;
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], 'mousedown', function(e) {

            var tof = false;
            if (tags != undefined) {
                target = e.target || e.srcElement
                for (var i = 0; i < tags.length; i++) {
                    if (target == tags[i]) {
                        tof = true;

                        break;
                    };
                };
            } else tof = true;
            if (tof) {
                var logindiv = this;
                var mX = e.clientX - logindiv.offsetLeft;
                var mY = e.clientY - logindiv.offsetTop;


                document.onmousemove = function(e) {
                    var left = e.clientX - mX;
                    var top = e.clientY - mY;





                    logindiv.style.left = left + 'px';
                    logindiv.style.top = top + 'px';
                };

                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;


                };
            }


        })
    }
    return this;
})

function drag() {
    var tags = arguments;

    addEvent(this, 'mousedown', function(e) {

        var tof = false;
        if (tags != undefined) {
            target = e.target || e.srcElement
            for (var i = 0; i < tags.length; i++) {
                if (target == tags[i]) {
                    tof = true;

                    break;
                };
            };
        } else tof = true;
        if (tof) {
            var logindiv = this;
            var mX = e.clientX - logindiv.offsetLeft;
            var mY = e.clientY - logindiv.offsetTop;


            document.onmousemove = function(e) {
                var left = e.clientX - mX;
                var top = e.clientY - mY;





                logindiv.style.left = left + 'px';
                logindiv.style.top = top + 'px';
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;


            };
        }


    })

}