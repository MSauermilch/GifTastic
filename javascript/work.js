
    //The Topics to be searched
    var topics = [ "lsd","aliens","horror","boogeyman","cartoons","beetlejuice","cult","eyes","weed","tv"]; 

    //creates buttons based on Topics
    function buttGen(){
      //keeps buttons from the 'ol i++
      $("#buttonsDiv").empty(); //keeps buttons from i++

      //generates buttons from topics list, signs text, class, data.
      for (i=0; i< topics.length; i++) {  
        var theme = topics[i];
        var button = $("<button>");
        button.html(theme).addClass("btn btn-secondary btn-sm");
        button.attr("data-item",theme);
        $("#buttonsDiv").append(button);
        };
        
      setClickEvent();
    };

    buttGen(); 

    //sumbit button for html input form
    $("#submitButton").on("click", function() {
      var newGif = $("#userGif").val().trim(); //.trim()?
      topics.push(newGif);
      console.log(topics);


      
      buttGen();
    });

    //make compairison so that multible same enteries cant not be made, if so send alert.

    function setClickEvent() {                       //Function by Richard
    $("button").on("click", function() {            //everything functions untill new buttons is added
          var item = $(this).attr("data-item");
          console.log(item);

          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
              url: queryURL,
              method: "GET"
            })

              .then(function(response) {
                var results = response.data;  

                for (var i = 0; i < results.length; i++) {    
                  var gifDiv = $("<div>").addClass("gif"); //Creating a div for gif
                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating); //Creates Rating
                  var personImage = $("<img>");
                  personImage.attr("src", results[i].images.fixed_height.url);
                  gifDiv.append(personImage); //Appending Gif
                  gifDiv.append(p); //Appending Paragraph

                  $("#results").append(gifDiv); // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                };
              });
          });
        }