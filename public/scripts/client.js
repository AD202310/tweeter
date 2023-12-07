/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (data) => {
  let newTweet = `
                  <article class="tweet">
                    <header class="flex-container-row">
                      <div class="profile-pic-username flex-container-row">
                        <img src="${data.user.avatars}"/>
                        <p>${data.user.name}</p>
                      </div>
                      <p class="handle">${data.user.handle}</p>
                    </header>
                    <section class="tweet-content">
                      <p>${escape(data.content.text)}</p>
                    </section>
                    <footer>
                      <p class="time-created">${timeago.format(data.created_at)}</p>
                      <div>
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </footer>
                  </article>
                  `;
  return newTweet;
};

const renderTweets = (data) => {
  for (let i = data.length - 1; i >= 0; i--) {
    const newTweet = createTweetElement(data[i]);
    $( '#tweets-container' ).append(newTweet);
  }
};

const renderTweet = (data) => {
  const newTweet = createTweetElement(data);
  $( '#tweets-container' ).prepend(newTweet);
};

const loadTweets = () => {
  $.get('/tweets').then((data) => {
    renderTweets(data);
    $( '#tweet-text' ).val('');
  });
};

const loadNewTweet = () => {
  $.get('/tweets').then((data) => {
    renderTweet(data[data.length - 1]);
    $( '#tweet-text' ).val('');
    $( 'output.counter' ).val(140);
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const newTweetError = (message) => {
  $( '#new-tweet-err-msg' ).text(message);
  $( '#new-tweet-error' ).show();
  $( '#tweet-text' ).focus();
};

const closeNewTweetError = () => {
  $( '#new-tweet-error' ).hide();
  $( '#new-tweet-err-msg' ).text('');
};

const toggleCreateTweet = () => {
  $( '#new-tweet-form' ).slideToggle();
  $( '#tweet-text' ).focus();
};

$( document ).ready(function() {

  $( 'nav #compose-tweet-btn' ).click(function() {
    toggleCreateTweet();
  });
  loadTweets();

  $( '.new-tweet form' ).submit(function(event) {
    event.preventDefault();
    const tweetData = $( this ).serialize();
    const charCount = Number($( 'output.counter' ).val());
    
    if (charCount === 140) {
      newTweetError('Please enter a tweet!');
      return;
    } else if (charCount < 0) {
      newTweetError('More than 140 characters!!')
      return;
    }

    $.post('/tweets/', tweetData).then(() => {
      loadNewTweet();
      closeNewTweetError();
    });
  });

});