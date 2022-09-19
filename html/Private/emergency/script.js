$(document).ready(function()
{
    $('.contact').click(function (e) 
    {
        $('.card').toggleClass('active');
        $('.banner').toggleClass('active');
        $('.photo').toggleClass('active');
        $('.social-media-banner').toggleClass('active');
        $('.email-form').toggleClass('active');  
        var buttonText = $('button.contact#main-button').text();
        if (buttonText === 'back')
        {
            buttonText = 'click to get in touch';
            $('button.contact#main-button').text(buttonText);
        }
        else
        {
            buttonText = 'back';
            $('button.contact#main-button').text(buttonText);
        }
    });
});
 $(document).ready(function()
 {
     $(document).mousemove(function( event ) 
     {
         var docWidth = $(document).width();
         var docHeight = $(document).height();
         var xValue = (event.clientX/docWidth)*100;
         var yValue = (event.clientY/docHeight)*100;
        $('.photo').css('background-position', xValue+'%,'+yValue+'%');
     });
 });