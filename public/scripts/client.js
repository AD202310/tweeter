/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  let $tweet = `
    <article class="tweet">
      <header class="flex-container-row">
        <div class="profile-pic-username flex-container-row">
          <img src="${data.user.avatars}"/>
          <p>${data.user.name}</p>
        </div>
        <p class="handle">${data.user.handle}</p>
      </header>
      <section class="tweet-content">
        <p>${data.content.text}</p>
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
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $( '#tweets-container' ).append(newTweet);
  }
};

const loadTweets = () => {
  $.get('/tweets').then((data) => {
    renderTweets(data);
  });
};

$( document ).ready(function() {
$( '.new-tweet form' ).submit(function(event) {
  event.preventDefault();
  const tweetData = $( this ).serialize();
  $.post('/tweets/', tweetData).then( function() {
    loadTweets();
  })
});
});