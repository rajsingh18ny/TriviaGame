//jquery IIFE wrapper 
(function () {

    //my giphy array
    var topics = ["crazy cat", "box cat", "evil cat", "black cat", "wild cat", "happy cat", "dead cat", "brave cat", "fat cat", "party cat"];
    
    // Created these arrays to switch back and forth from live to still GIPHY
    var imageArray = [];
    var imageArrayStills = [];
    
    function displayGiphyInfo() {
        // make sure our array of images is empty
        imageArray = [];
        imageArrayStills = [];
        //these variables make queryURI easier to read
        var giphy = $(this).attr("data-name");
        // var state = $(this).attr("data-state");
    
        var apiKey = "EIpYTvueaeOpXTfZnE0whYIyMPq0CS9l";
        var searchTerms = "&limit=10&rating=G&lang=en";
        //this is the complete query url using variables above
        var queryURI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${giphy}${searchTerms}`;
    
        // Creating a div to hold the giphy
        var giphyDiv = $("<div class='giphy'>");
    
        //query the GIPHY API here
        $.ajax({
            url: queryURI,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var imgURIstill = response.data[i].images.original_still.url;
                var imgURIgif = response.data[i].images.original.url;
                var imgRating = response.data[i].rating.toUpperCase();
    
                imageArray.push(imgURIgif);
                imageArrayStills.push(imgURIstill);
    
                // Creating an element to have the rating displayed
                var pRating = $("<p>").text("Rating: " + imgRating);
    
                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURIstill);
    
                // Adding class to toggle between static and GIPHY
                image.addClass(`${i}`);
    
                 // Adding class to toggle between static and GIPHY
                //  image.attr('data-state',"still");
                //  image.attr('data-animate');
                //  image.attr('data-still');
    
                //creating container to hold both image and rating
                var giphyContainer = $("<div>").append(pRating).append(image);
    
                //creating class to style giphys inline
                giphyContainer.addClass('gif');
    
                //adding new giphyContainer to original div
                giphyDiv.append(giphyContainer);
    
                // Putting the entire giphy above the previous giphys
                $("#giphy-view").prepend(giphyDiv);
            }
        });
    };
    // Function for displaying giphys 
    function renderButtons() {
        // Deleting previous buttons so there are no repeats
        $("#buttons").empty();
    
        // Looping through the array of giphys
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each button in the array.
            var a = $("<button>");
            // Adding classes to control look of buttons 
            a.addClass("giphy-btn");
            a.addClass("button-style");
            // Adding a data-attribute with a value of the giphy at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the giphy at index i
            a.text(topics[i]);
            // Adding the button to the HTML div
            $("#buttons").append(a);
        };
    };
    
    // This function handles events where a giphy button is clicked
    $("#add-giphy").on("click", function (event) {
        // clear out any existing images in our array
        imageArray = [];
        imageArrayStills = [];
        event.preventDefault();
        // This line grabs the input from the textbox
        var giphy = $("#giphy-input").val().trim();
        // Adding giphy search from the textbox to our array
        topics.push(giphy);
        // Calling renderButtons which handles the processing of my giphy array
        renderButtons();
    });
    
    // this function uses Booleans to toggle between live and still GIPHYs
    var imageClicked = false;
    $('body').on('click', 'img', function () {
        if (imageClicked === true) {
            var getClass = $(this).attr("class");
            $(`.${getClass}`).attr('src', imageArrayStills[getClass]);
            imageClicked = false;
        } else {
            var getClass = $(this).attr("class");
            $(`.${getClass}`).attr('src', imageArray[getClass]);
            imageClicked = true;
        }
    });
    
    // $(".gif").on("click", function() {
    //     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    //     var state = $(this).attr("data-state");
    //     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    //     // Then, set the image's data-state to animate
    //     // Else set src to the data-still value
    //     if (state === "still") {
    //       $(this).attr("src", $(this).attr("data-animate"));
    //       $(this).attr("data-state", "animate");
    //     } else {
    //       $(this).attr("src", $(this).attr("data-still"));
    //       $(this).attr("data-state", "still");
    //     }
    //   });
    
    // Adding a click event listener to all elements with a class of "giphy-btn"
    $(document).on("click", ".giphy-btn", displayGiphyInfo);
    
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    
    })();