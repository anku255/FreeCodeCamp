var baseUrl = "https://en.wikipedia.org/w/api.php";
var urlSuffix = "?action=query&list=search&format=json&srsearch=&callback=?";
var wikiObject = function(title, desc, link) {
  this.title = title;
  this.description = desc;
  this.link = link;
}

var searchResults = [];

//call auto complete. 
  suggest();

$("#searchInput").on("keypress", function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      callSearchWiki();
    }
});


$("#search-btn").click(function() {
  callSearchWiki();
})

function searchWiki(userInput) {

  $.ajax({
    url: baseUrl + urlSuffix,
    data: {srsearch: userInput},
    dataType: 'json',
    success: function(data) {
      if (data.query.searchinfo.totalhits === 0) {
        displayErrorMsg(userInput);
      } else {
        $.each(data.query.search, function(i, object) {
        searchResults[i] = new wikiObject(object.title, object.snippet, getUrl(object.title));
        });
        displayResults();
      }
      
    },
    error: function() {
      console.log("error occurred");
    }
  });
}

function displayResults() {
  // remove class "form" from "form element" to push it upward
  $("div.form").removeClass("form");
  searchResults.forEach(function(result) {
    var htmlArticle = "<article class=\"card\"><a href="+ result.link +"><h5>"+ result.title +"</h5></a><p>"+ result.description +"</p></article>";
    $("#search-result").append(htmlArticle);
  });
}

function getUrl(title) {
  return "https://en.wikipedia.org/wiki/" + encodeURIComponent(title);
}

function callSearchWiki() {
  // grab the input text
  var userInput = $("#searchInput").val();
  // Clear previous search results
  $("#search-result").html("");
  searchWiki(userInput); 
}


function displayErrorMsg(userInput) {
  $("div.form").removeClass("form");
  $("#search-result").html("");
  var errorHtml = "<article class=\"card\">Your query <strong>" + userInput + "</strong> did not meet any result.</article>";
  $("#search-result").append(errorHtml);
}

  //autocomplete function
  function suggest() {
    $("#searchInput").autocomplete({
      source: function (request, response) {
         // request.term is the term searched for.
         // response is the callback function you must call to update the autocomplete's 
         // suggestion list.
         $.ajax({
             url: "https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&namespace=0&format=json&search=",
             //the data is automatically appended to the above (thanks Jquery UI!);
             data: { search: request.term },
             dataType: "jsonp",
             success: function(data) {
               response(data[1]);
               
             },
             error: function () {
               //always must pass something back. in case of error, an empty array
               response([])
             }
         });
        
      },
      minLength: 3, // min no of characters typed before autocomplete is called
      delay: 100  // milliseconds to wait after a keypress before making another search
    })
  }