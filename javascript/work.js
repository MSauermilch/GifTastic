
//Topics to get the ball rolling.
var topics = [ "lsd","aliens","horror","boogeyman","cartoons","beetlejuice","cult","eyes","weed","tv"]; 

    //creating the first 10 buttons from the topics.
    function buttGen(){
      $("#buttonsDiv").empty();

      for (i=0; i< topics.length; i++) {  
        var theme = topics[i];
        var button = $("<button>");
        button.html(theme).addClass("btn btn-secondary btn-sm").attr("data-item",theme);
        $("#buttonsDiv").append(button);
        };

      $("button").css("margin", "10px");

      setClickEvent();
    };

    buttGen();

    //creates new buttons based on user input 
    $("#submitButton").on("click", function() {
      var newGif = $("#userGif").val().trim(); 
      topics.push(newGif);
      console.log(topics);

      //calls the code to remake the buttons including the new one.
      buttGen();
    });
    // selects the data that will submitted to ajax, and call ajax.
    function setClickEvent() {                       
    $("button").on("click", function() {
          var item = $(this).attr("data-item");

          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";

            //ajax request to return data based on the Topics Var
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                var results = response.data;

                //Creates gif based on Api results. in the query url the limit is set to 10
                for (var i = 0; i < results.length; i++)
                {    
                  var gifDiv = $("<div>").addClass("gif");
                  var rating = results[i].rating;

                  //Creates Rating
                  var p = $("<p>").text("Rating: " + rating); 

                  //creates a div for new gifs giving them attrubutes to pause and play
                  var personImage = $("<img>").addClass("image");
                                   personImage.attr("src", response.data[i].images.fixed_height_still.url);
                                   personImage.attr("data-still-url",response.data[i].images.fixed_height_still.url);
                                   personImage.attr("data-animated-url",response.data[i].images.fixed_height.url);
                                   personImage.attr("data-state","still");
                                   gifDiv.append(personImage).append(p); //Appending Gif
                  //puts the new gifs in front of the old  
                  $("#results").prepend(gifDiv);
                };
              });
          });
        }

      //this function grabs switchs between still and animated states.
      $(document).on("click", ".image", function(){
        var imageSelect = $(this).attr("data-state");
          console.log(this)
        if (imageSelect === "still") {
          $(this).attr("data-state", "animate"); 
          $(this).attr("src", $(this).attr("data-animated-url"));
        } else {
          $(this).attr("data-state", "still"); 
          $(this).attr("src", $(this).attr("data-still-url"));
        }
      });