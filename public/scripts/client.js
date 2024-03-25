$(document).ready(() => {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  const tweetData = [
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  // const markup = $();

  const createTweetElement = function (tweetData) {

    const $tweet = $(`
<header>
  <span class="left-header">
    <img src="${tweetData.user.avatars}" height="50" width="50">
    <h3>${tweetData.user.name} </h3>
  </span>
  <span class="tag">${tweetData.user.handle}</span>
</header>
<section class="tweet-text">${tweetData.content.text}</section>
<footer>
  <span>${tweetData.created_at}</span>
  <div class="tweet-icons">
    <i class="fa-sharp fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
` );

    return $tweet;
  }

  const renderTweets = function (tweets) {

    for (const tweet of tweets) {
      const tweetList = createTweetElement(tweet)

      $('.tweets-container').append(tweetList);
    }
  }

  renderTweets(tweetData)


});
//   const $tweet = createTweetElement(tweetData);
//   console.log('Ready!');
//   $('.tweets-container').append($tweet);