$(document).ready(() => {
  console.log("Ready from client.js file");
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]


  // const markup = $();

  const createTweetElement = function (tweetData) {
    const timeAgoString = timeago.format(tweetData.created_at)

    const $tweet = $(`
    <article class="tweets-container">
<header>
  <span class="left-header">
    <img src="${tweetData.user.avatars}" height="50" width="50">
    <h3>${tweetData.user.name} </h3>
  </span>
  <span class="tag">${tweetData.user.handle}</span>
</header>
<section class="tweet-text">${tweetData.content.text}</section>
<footer>
  <span>${timeAgoString}</span>
  <div class="tweet-icons">
    <i class="fa-sharp fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>
` );

    return $tweet;
  }

  const renderTweets = function (tweets) {

    for (const tweet of tweets) {
      const tweetList = createTweetElement(tweet)
      $('.tweets-container').append(tweetList);
    }
  }

  const loadTweets = function () {
    return $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function (receivedTweets) {
        renderTweets(receivedTweets);
      },
      error: function () {
        alert("Error with GET request");
      }
    })
  }
  loadTweets()
  // renderTweets(tweetData)
});


$('form').on('submit', function (event) {
  event.preventDefault();
  const form = event.currentTarget; // Correctly gets the form
  console.log("Form: ", $(form));
  const serializedData = $(form).serialize();
  console.log("Form serialized: ", serializedData);

  const tweetContent = $('#tweet-text');
  const maxLength = ('.counter');

  if (tweetContent.val().trim() === '') {
    alert('Tweet content is required.');
  }

  if (tweetContent.val().length > maxLength) {
    alert('Tweet content is too long.');
  }

  $.ajax({
    type: "POST",
    url: "/tweets",
    data: serializedData, // Include the serialized data in the AJAX call
    success: function (receivedData) {
      loadTweets(receivedData); // Call renderTweets with received data if needed
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('Error with POST request', textStatus, jqXHR, errorThrown);
    }
  });
})