$(document).ready(function () {
  console.log("Ready from js file");

  $('#tweet-text').on('input', function () {
    let textCount = $(this).val().length;
    let remaining = 140 - textCount;

    $('.counter').text(remaining);

    if (remaining < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }
  });
});