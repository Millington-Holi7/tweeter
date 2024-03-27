$(document).ready(() => {

  loadTweets()

  $('form').on('submit', onSubmit)

  //nav right header. slides down and up the new-tweet when clicked
  $('.rightHeader').on('click', function () {
    $('.new-tweet').slideToggle();
  });

});

//collects the input from new-tweet form
const onSubmit = function (event) {
  event.preventDefault();
  const form = event.currentTarget; // Correctly gets the form
  console.log("Form: ", $(form));
  let serializedData = $(form).serialize();
  console.log("Form serialized: ", serializedData);
  const tweetContent = $('#tweet-text');
  const maxLength = 140;

  clearError();

  if (tweetContent.val().trim() === '') {
    showError('error-message', 'Tweet content is required.')
    return;
  }

  if (tweetContent.val().length > maxLength) {
    showError('error-message', 'Tweet content is too long.');
    return;
  }

  $.post("/tweets", serializedData, loadTweets)


  tweetContent.val("");
};


// tweet layout
const createTweetElement = function (tweetData) {

  const timeAgoString = timeago.format(tweetData.created_at);

  const escapeText = escape(tweetData.content.text);

  const $tweetElement = $(`
    <article class="display-tweet">
    <header>
    <span class="left-header">
    <img src="${tweetData.user.avatars}" height="50" width="50">
    <h3>${tweetData.user.name} </h3>
    </span>
    <span class="tag">${tweetData.user.handle}</span>
    </header>
    <span class="tweet-text">${escapeText}</span>
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


//user input function to change special characters into text so our system doesn't see it as a line of code
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//error message helper function from input validation
const showError = function (errorElement, errorMessage) {
  document.querySelector("." + errorElement).classList.add("display-error");
  document.querySelector("." + errorElement).innerHTML = errorMessage;
}

const clearError = function () {
  let errors = document.querySelectorAll('.error-message');
  for (let error of errors) {
    error.classList.remove("display-error");
  }
}