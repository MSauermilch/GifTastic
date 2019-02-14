
var topics = [ "lsd","aliens","horror","boogeyman","cartoons","beetlejuice","cult","eyes","weed","tv"]; 

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

    $("#submitButton").on("click", function() {
      var newGif = $("#userGif").val().trim(); 
      topics.push(newGif);
      console.log(topics);

      buttGen();
    });

    function setClickEvent() {                       
    $("button").on("click", function() {
          var item = $(this).attr("data-item");

          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                var results = response.data;  

                for (var i = 0; i < results.length; i++)
                {    
                  var gifDiv = $("<div>").addClass("gif");
                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating); //Creates Rating
                  var personImage = $("<img>").addClass("image");
                                   personImage.attr("src", response.data[i].images.fixed_height_still.url);
                                   personImage.attr("data-still-url",response.data[i].images.fixed_height_still.url);
                                   personImage.attr("data-animated-url",response.data[i].images.fixed_height.url);
                                   personImage.attr("data-state","still");
                                   gifDiv.append(personImage).append(p); //Appending Gif
                  
                  $("#results").prepend(gifDiv);
                };
              });
          });
        }

























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


      //   if ($(this).attr("src") === $(this).attr("data-still-url")) {
      //       $(this).attr("src", $(this).attr("data-animated-url")) }
      //   else if ($(this).attr("src") === $(this).attr("data-animated-url")) {
      //       $(this).attr("src", $(this).attr("data-still-url")) }
      // });