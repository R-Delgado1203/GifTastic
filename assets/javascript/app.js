$(document).ready(function () {
    var gifsArray = ["World of Warcraft", "StarCraft", "Halo", "BioShock", "Super Smash Bros", "heroes of the storm"];

    for (var i = 0; i < gifsArray.length; i++) {
        var btn = $("<button>");
        btn.attr("value", gifsArray[i]);
        btn.text(gifsArray[i]);
        $("#gif-btns").append(btn);
    }

    $("#add-item").click(function () {
        var newItem = $("#search-input").val();
        var btn = $("<button>");
        btn.attr("value", newItem);
        btn.text(newItem);
        $("#gif-btns").append(btn);
        gifsArray.push(newItem);
        console.log(gifsArray);
    });



    // start-stop gifs on click
    $("body").on("click", "img", function () {
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
    });

    // Adding click event listen listener to all buttons
    $("body").on("click", "button", function () {
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
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gif = $("<img>");
                gif.attr("class", "gif");
                gif.attr("src", results[i].images.fixed_height_still.url);
                gif.attr("data-still", results[i].images.fixed_height_still.url);                
                gif.attr("data-animate", results[i].images.fixed_height.url)
                gif.attr("data-state", "still");
                gifDiv.append(p);
                gifDiv.append(gif);
                $("#gifs").prepend(gifDiv);
            }
        });
    });

});