
var contentColor = randomColor();
var currentQuote = "";
var currentAuthor = "";

$(document).ready(function() {
    newQuote();
});

// Set onClickListener on New Quote button
$("#newButton").click(newQuote);

// Changes the current quote
function newQuote() {
    $.ajax({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
        currentQuote = data.quote;
        currentAuthor = data.author;
        changeQuote();
        changeTweet();
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "0YRxEHP8LXmshIy49ewSJZ7ZY6Vnp1FBHLFjsnzKeMQCSOas4p"); // Enter here your Mashape key
    }
});
}


// Changes the quote with animation
function changeQuote() {
    $(".quote").animate({
        opacity: 0
    }, 500, function() {
        $(this).animate({
            opacity: 1
        }, 700);
        $("#quote").text(currentQuote);
    });

    $(".author").animate({
        opacity: 0
    }, 500, function() {
        $(this).animate({
            opacity: 1
        }, 700);
        $("#author").text(currentAuthor);
    });
    changeColor();
}

// Changes the Tweet content
function changeTweet() {
    $("a").attr('href', "https://twitter.com/intent/tweet?hashtags=quotes&text=" + currentQuote + " -"  + currentAuthor);
}

// Changes the color
function changeColor() {
    contentColor = randomColor();
    $("body").css("background-color", contentColor);
    $(".card").css("color", contentColor);
    $("#tweet").css("background", contentColor);
    $("#newButton").css("background", contentColor);
}

// Returns a random color
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}
