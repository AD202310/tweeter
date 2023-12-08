//Functionality for counting characters

const maxChar = 140;

$(document).ready(function() {
  $( '#tweet-text' ).keyup(function() {
    const charCounter = $( this ).parent().children( 'div' ).children( '.counter' );
    const charAmount = $( this ).val().length;
    const remainingChar = maxChar - charAmount;
    charCounter.val(remainingChar);
    if (charCounter.val() < 0) {
      charCounter.addClass('text-red');
    }
    if (charCounter.val() > -1) {
      charCounter.removeClass('text-red');
    }
  });
});