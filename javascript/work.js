//Bonus
// * Ensure your app is fully mobile responsive.
// * Allow users request additional gifs, request should ADD 10 gifs, doesnt overwrite the existing
// * List additional metadata (title, tags, etc) for each gif in a clean and readable format.
// * Include a 1-click download button for each gif, this should work across device types.
// * Integrate this search with additional APIs such as OMDB, or Bands in Town. 
// * Allow users to add their favorite gifs to a favorites section

    // var topics = [ "lsd","aliens","horror","sex"];
    
    $("#submitButton").click()
   
    $("button").on("click", function() {

          var item = $(this).attr("data-item");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";

          $.ajax({
            url: queryURL,
            method: "GET"
          })

            .then(function(response) {
              var results = response.data;     // Storing an array of results in the results variable
    
              for (var i = 0; i < results.length; i++) {    
    
                //if (results[i].rating !== "r" && results[i].rating !== "pg-13") {   //add rating on/off switch
    
                  var gifDiv = $("<div>").addClass("gif");      // Creating a div for the gif
                  var rating = results[i].rating;  // Storing result item's rating
                  var p = $("<p>").text("Rating: " + rating);   // Creates Rating paragraph
                  var personImage = $("<img>"); // Create image tag
                  personImage.attr("src", results[i].images.fixed_height.url);  // image tag and src attribute from results
                  gifDiv.append(personImage); // Appending Gif
                  gifDiv.append(p); // Appending Paragraph

                  $("#results").prepend(gifDiv); // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                // }
              }
            });
        });