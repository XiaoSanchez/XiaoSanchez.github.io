$(function(){

    // skill
    for(var i=0; i<4; i++){
        $('.ability li').eq(0).find('i').eq(i).addClass('full')
    }
    setTimeout(()=>{
        for(var i=0; i<3; i++){
            $('.ability li').eq(1).find('i').eq(i).addClass('full')
        }
    },200)
    setTimeout(()=>{
        for(var i=0; i<4; i++){
            $('.ability li').eq(2).find('i').eq(i).addClass('full')
        }
    },400)
    setTimeout(()=>{
        for(var i=0; i<2; i++){
            $('.ability li').eq(3).find('i').eq(i).addClass('full')
        }
    },600)
    setTimeout(()=>{
        for(var i=0; i<3; i++){
            $('.ability li').eq(4).find('i').eq(i).addClass('full')
        }
    },800)
    setTimeout(()=>{
        for(var i=0; i<3; i++){
            $('.ability li').eq(5).find('i').eq(i).addClass('full')
        }
    },1000)

    // works
    workShow()
    $('.thumbnail li').click(function(){
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
        workShow()
    })

    var timer = setInterval(() => {timerFunc()}, 4000);
    $('.board-img').mouseover(function(){
        clearInterval(timer)
    })
    $('.board-img').mouseleave(function(){
        timer = setInterval(() => {timerFunc()}, 4000);
    })

})

function workShow() {
    var obj = $('.thumbnail li.active img')
    $(".board-img").find('img').removeClass('board-ani')
    $(".board-img").find('a').attr('href',obj.attr('url'))
    $(".board-img").find('div').remove()
    
    setTimeout(function(){
        $(".board-img").find('img').attr('src',obj.attr('data'))
        $(".board-img").find('img').addClass('board-ani')
        $(".board-img").find('img').after('<div class="board-text-ani">'+obj.attr('alt')+'</div>')
    },100)
}

function timerFunc() {
    if($('.thumbnail li.active').index() == $('.thumbnail li').length - 1){
        $('.thumbnail li').eq(0).trigger('click')
    }else{
        $('.thumbnail li.active').next().trigger('click')
    }
    workShow()
}