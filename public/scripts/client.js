/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

const renderTweets = function (tweets) {
  // loops through tweets
  tweets.forEach((tweet) => {
    // calls createTweetElement for each tweet
    let tweetReturned = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").prepend(tweetReturned);
  });
};

const createTweetElement = function (tweet) {
  // let $tweet = /* Your code for creating the tweet element */
  // ...
  // return $tweet;
  // console.log("the tweet is:\n" + tweet.user.name + tweet.user.avatars + tweet.user.handle + " " + tweet.content.text + " " + tweet.created_at);

  let tweet_text = `<article class='tweets'>
  <header class='tweet-header'>
 
   <div class='tweet-user'>
 <img src="${tweet.user.avatars}">
    <div>${tweet.user.name}</div>
    </div> 
  <div class='user-handle'>${tweet.user.handle}</div>

  </header>

  <p class='tweet-body'> 
    ${tweet.content.text}
  </p>

  <footer class='tweet-footer'>
    <div>
    ${timeago.format(tweet.created_at)}
    </div>
    <div class= 'tweet-reactions'>
    <i class="fa-brands fa-font-awesome"></i>
    <i class="fa-solid fa-repeat"></i>
    <i class="fa-solid fa-heart"></i>
    </div>  
  </footer>
</article>
  `;
  // console.log(tweet_text);
  return tweet_text;
};

$(document).ready(function () {
  // renderTweets(data);
  $(".bar").hide();
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();

    if ($("#tweet-text").val().length > 140) {
      return $(".bar").show().text("Too Many Characters!");
    }
    $(".bar").hide();

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: $(this).serialize(),
      success: function (data, textStatus, jqXHR) {
        //data - response from server
        console.log(textStatus);
        $("#tweet-text").val("");
        loadTweets();
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      success: function (data, textStatus, jqXHR) {
        console.log(data);
        renderTweets(data);
      },
    });
  };
  loadTweets();
});
