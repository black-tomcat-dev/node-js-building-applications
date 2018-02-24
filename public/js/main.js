$(document).ready(function() {
  /* Quote a day */

  var quoteArray = [
    "You cannot escape the responsibility of tomorrow by evading it today",
    "All that I am, or hope to be, I owe to my angel mother",
    "Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing",
    "Always bear in mind that your own resolution to succeed is more important than any other",
    "Whatever you are, be a good one",
    "The best way to destroy an enemy is to make him a friend",
    "Nothing can stop the man with the right mental attitude from achieving his goal; nothing on earth can help the man with the wrong mental attitude",
    "Do you want to know who you are? Don't ask. Act! Action will delineate and define you",
    "In matters of style, swim with the current; in matters of principle, stand like a rock",
    "Believe you can and you're halfway there",
    "Do what you can, with what you have, where you are",
    "Nobody cares how much you know, until they know how much you care",
    "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
    "To be able to give away riches is mandatory if you wish to possess them. This is the only way that you will be truly rich",
    "He who is not courageous enough to take risks will accomplish nothing in life",
    "I can accept failure, everyone fails at something. But I can't accept not trying",
    "My attitude is that if you push me towards something that you think is a weakness, then I will turn that perceived weakness into a strength.",
    "Some people want it to happen, some wish it would happen, others make it happen",
    "Always turn a negative situation into a positive situation",
    "I've always believed that if you put in the work, the results will come"
  ];

  var randomNumber = Math.floor(Math.random() * 20 + 1);
  document.getElementById("quote").innerHTML = quoteArray[randomNumber - 1];

  resizeFunc();
  var windowWidth = "";
  /** $(window).on("resize", function(){
        console.log("changed");
        $(".intro").html("");
        $(".modules").html("");
        resizeFunc();
    });**/
  function resizeFunc() {
    if ($(window).width() >= 1000) {
      $(".img-me")
        .css("width", "380px")
        .css("height", "380px");
      $(".bio-padding").css("height", "530px");
      $(".bio-padding > p").css({
        "font-size": "1.33em"
      });
      $(".img-me")
        .delay(3000)
        .animate(
          {
            width: "180px",
            height: "180px"
          },
          1500
        );
      $(".bio-padding")
        .delay(3000)
        .animate(
          {
            width: "30%"
          },
          1500,
          function() {
            $(".intro")
              .delay(1000)
              .queue(function(next) {
                $(this)
                  .append(
                    "<h3>This is my first Node, Express and Mongo Application</h3>"
                  )
                  .fadeIn("slow");
                next();
              });
            $(".intro")
              .delay(1000)
              .queue(function(next) {
                $(this)
                  .append(
                    "<p>In each module I will build out a step-by-step full Node Application </p>"
                  )
                  .fadeIn("slow");
                next();
              });
            $(".modules")
              .delay(2500)
              .queue(function(next) {
                $(".modules")
                  .append(
                    "<li><strong>Module 1</strong>: Setting up first webpage: a quotation application</li>"
                  )
                  .fadeIn("slow");
                next();
              });
            $(".modules")
              .delay(1500)
              .queue(function(next) {
                $(".modules")
                  .append(
                    "<li><strong>Module 2</strong>: Learning about express and also external APIs</li>"
                  )
                  .fadeIn("slow");
                next();
              });
            /**<li><a href="/Module2">Module 2: Learning about express and also external API</a></li>
            <li><a href="/Module3">Module 3: We learnt about EJS now implement in jade and handlebars</a></li>
            <li><a href="/Module4">Module 4: Create a Signup and Login page</a></li>
            <li><a href="/Module5">Module 5: Handling errors and adding comments</a></li>
            <li><a href="/Module6">Module 6: Create a socket.io chat application</a></li>
            <li><a href="/Module7">Module 7: Write Grunt and Gulp tasks</a></li>
            <li><a href="/Module8">Module 8:  Use Hapi to store quotes in a mySQL, MongoDB</a></li>**/
          }
        );
      $(".bio-padding > p")
        .delay(3000)
        .animate(
          {
            "font-size": "1.2em"
          },
          1500
        );
    } else {
      $(".img-me")
        .css("width", "180px")
        .css("height", "180px");
      $(".bio-padding").css("width", "100%");
      $(".bio-content").hide();
      $(".bio-padding > p").css({
        "font-size": "0.75em"
      });
      $(".boxset").css("height", "auto");
      $(".bio-padding").css("height", "auto");
    }
  }
});
