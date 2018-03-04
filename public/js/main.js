$(document).ready(function() {

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

            $(".modules")
            .delay(1500)
            .queue(function(next){
              $(".modules").append( 
                "<li><strong>Module 3</strong>: We learnt about EJS now implemented in jade and handlebars and posted to Github</a></li>"
              ).fadeIn("slow");
              next();
            });
            $(".modules")
            .delay(1500)
            .queue(function(next){
              $(".modules").append( 
                "<li><strong>Module 4 & 5</strong>: Create a Signup and Login page and post stories and comments implemented with MongoDB</a></li>"
              ).fadeIn("slow");
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
