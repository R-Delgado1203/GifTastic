$(document).ready(function () {
    //initial array
    var topics = ["Food", "Animals", "Video Games", "Movies", "Music", "Books"];
    //load initial btn array on page
    createBtns();
    //event listener for adding new btns to the array
    $("#add-item").on("click", addbtns);
    //dynamic click handler for newly generated btns
    $(document).on("click", "button", createGifs);
    //dynamic click handler for gif start-stop
    $(document).on("click", "img", startStop);


    //--------------------------------------------------functions----------------------------------------------------------//
    //create clickable buttons on page
    function createBtns() {
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.addClass("btn btn-outline-light")
            btn.attr("value", topics[i]);
            btn.text(topics[i]);
            $("#gif-btns").append(btn);
        }
    }
    //add new btn to array, recreate btns displayed
    function addbtns() {
        var newItem = $("#search-input").val().trim();
        if (newItem !== "") {
            topics.push(newItem);
            console.log(topics);
            $("#gif-btns").empty();
            createBtns();
        }
    }
    //load gifs on page depending on the btn clicked
    function createGifs() {
        $("#gifs").empty();

        var query = $(this).attr("value");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aBe1pDrA2XYrm6eGoGrqSPfSvTp8NviK&q=" +
            query + "&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("individual-gif text-center");
                var textDiv = $("<div>").text("Rating: " + results[i].rating.toUpperCase());
                textDiv.addClass("card-body");
                var gif = $("<img>");
                gif.addClass("card gif");
                gif.attr("src", results[i].images.fixed_width_still.url);
                gif.attr("data-still", results[i].images.fixed_width_still.url);
                gif.attr("data-animate", results[i].images.fixed_width.url)
                gif.attr("data-state", "still");
                gifDiv.append(gif);
                gifDiv.append(textDiv);
                $("#gifs").prepend(gifDiv);
            }
        });
    }
    //start-stop gif aimations
    function startStop() {
        console.log(this);
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            console.log('State was still');
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            console.log('State was animated');
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});