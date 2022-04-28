$(document).ready(function () {
  // get the root file, when ready, callback,

  $("#tweet-text").on("input", function () {
    // console.log($(this).val()); //The this keyword is a reference to the button
    const maxChars = 140;
    const length = $(this).val().length;
    const $counter = $(this).siblings("div").children("output");
    console.log("counter", maxChars - length);
    $counter.text(maxChars - length);
if (length > maxChars) $counter.addClass("text-red");
if (length <= maxChars) $counter.removeClass("text-red")
    
  });
});
