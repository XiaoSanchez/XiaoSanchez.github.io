//background animation
let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 850
});

tl.add({
    targets: 'section .item',
    width: '100%',
    backgroundColor: '#21373d',
    delay: anime.stagger(100)
});

tl.add({
    targets: 'section .item',
    delay: anime.stagger(70),
    width: '97%',
    backgroundColor: '#c7d2d4'
});

tl.add({
    targets: 'section .item',
    backgroundColor: '#132c33',
    delay: anime.stagger(50, { from: 'center' })
});

tl.add({
    targets: 'p',
    top: '49%',
    duration: 4500,
    opacity: 1
}, '-=1000')

//text animation

//wrap every letter in a span
var textWrapper = document.querySelector('.effect1');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^.\s]|\w)/g, "<span class='letter'>$&</span>");
//go to next index2.html when animation is complete
anime.timeline()
    .add({
        //go to index2.html when animation is complete
        targets: '.effect1 .letter',
        scale: [5, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1350,
        delay: function(el, i) {
            return 70 * i;
        }
    }, 1500);