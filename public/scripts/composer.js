const triggerPoint = 250;
//Functionality for scrolling and return to top

$(document).ready(function() {
  $(window).scroll(function (event) {
    const scroll = $(window).scrollTop();
    if (scroll > triggerPoint) {
      $( 'nav' ).removeClass('blue');
      $( 'nav' ).addClass('noBGColor');
      $( '#compose-tweet-btn' ).removeClass('flex-container-col');
      $( '#compose-tweet-btn' ).addClass('hide');
      $( '#scroll-to-new-tweet' ).fadeIn('fast');
    } else if (scroll < triggerPoint) {
      $( 'nav' ).addClass('blue');
      $( 'nav' ).removeClass('noBGColor');
      $( '#compose-tweet-btn' ).addClass('flex-container-col');
      $( '#compose-tweet-btn' ).removeClass('hide');
      $( '#scroll-to-new-tweet' ).fadeOut('fast');
    }
  });
  
  $( '#scroll-to-new-tweet' ).click(function() {
    $( '#new-tweet-form' ).slideDown();
    $( '#tweet-text' ).focus();
    $( window ).scrollTop(0);
  });

});