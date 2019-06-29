$(document).ready(function() {
    //Array for characters names
    var topics = [];
    
        //API function to query gifs with a limit of 10
         function displayCharacter() {
    
        var x = $(this).data("search");
        console.log(x);
            //my api key doesn't work so I used the one from class... my key is daDAN2qiSbErQ1pdGIYk1t1sv7ELNq2q
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var showDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("myGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);
    
            }
        });
    }
    
      //To display new name and pull url
        $("#addname").on("click", function(event) {
            event.preventDefault();
            var newcharacter = $("#userInput").val().trim();
            topics.push(newcharacter);
            console.log(topics);
            $("#userInput").val('');
            displayButtons();
          });
    
      //loop for gifs
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "familyguy");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        } 
      }
    
    
      displayButtons();
    
      //Click event on button with id of "show" executes displayCharacter function
      $(document).on("click", "#familyguy", displayCharacter);
    
      //Click event on gifs with class of "myGiphy" executes pausePlayGifs function
      $(document).on("click", ".myGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });