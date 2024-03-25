$(document).ready(() => {

  loadTweets()

  $('form').on('submit', onSubmit)
});


const onSubmit = function (event) {
  event.preventDefault();
  const form = event.currentTarget; // Correctly gets the form
  console.log("Form: ", $(form));
  const serializedData = $(form).serialize();
  console.log("Form serialized: ", serializedData);

  const tweetContent = $('#tweet-text');
  const maxLength = 140;

  if (tweetContent.val().trim() === '') {
    alert('Tweet content is required.');
    return;
  }

  if (tweetContent.val().length > maxLength) {
    alert('Tweet content is too long.');
    return;
  }

  $.post("/tweets", serializedData)
    .done(function (receivedData) {
      loadTweets(receivedData);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert('Error with POST request', textStatus, jqXHR, errorThrown);
    });


  tweetContent.val("");
}



const createTweetElement = function (tweetData) {
  const timeAgoString = timeago.format(tweetData.created_at)

  const $tweetElement = $(`
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

  return $tweetElement;
}


const loadTweets = function () {

  $.get("/tweets")
    .then(data => {
      renderTweets(data)
    })

}

const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const element = createTweetElement(tweet)
    $('#tweets-container').prepend(element);
  }
}
