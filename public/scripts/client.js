/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $( '#tweets-container' ).append(newTweet);
  }
};

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


$( document ).ready(function() {
renderTweets(data);
$( '.new-tweet form' ).submit(function(event) {
  event.preventDefault();
  const tweetData = $( this ).serialize();
  $.post('/tweets/', tweetData);
});
});