var latitude, longitude,temp;

if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Make an API call for current time
    //Get local time from TimeZoneDB.com
      $.getJSON("https://api.timezonedb.com/v2/get-time-zone?key=9KO15I9T9P1B&format=json&callback=?&by=position&lat=" + latitude + "&lng=" + longitude, function (timezone) {

        // Create a new JavaScript Date object based on the timestamp
        //Timestapm minus gmtOffset to get UTC time
        var date = new Date((timezone.timestamp - timezone.gmtOffset) * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        var requestUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=5a5a02f356f4f64fe223c5d5a5efde42";

        console.log(requestUrl);
        $.getJSON(requestUrl, function(data) {
            console.log(data);
            var tempInKelvin = data.main.temp; 
            temp = {
                inCelcius: (tempInKelvin - 273).toFixed() + "&deg;C",
                inFarenheit: (1.8 * (tempInKelvin - 273) + 32).toFixed() + "&deg;F"
            }

            // Get the condition and uppercase the first letter
            var condition = data.weather[0].description;
            condition = condition.charAt(0).toUpperCase() + condition.slice(1);

            // Remove the spinner
            $("#spinner").remove();
            $("#place").text(data.name + ", " + data.sys.country);
            $("#humidity").text("Humidity: " + data.main.humidity + "%");
            $(".temp-c").html(temp.inCelcius);
            $(".temp-f").html(temp.inFarenheit);
            $("#condition").text(condition);


            // Setup Skycons
            var skycons = new Skycons({"color": "#ffffff"});

            var weather = data.weather[0].description;

            if(weather.indexOf("rain") >= 0) {
            skycons.set("icon", Skycons.RAIN);
            } else if (weather.indexOf("sunny") >= 0) {
            skycons.set("icon", Skycons.CLEAR_DAY);
            } else if (weather.indexOf("clear") >= 0 || weather.indexOf("haze") >= 0) {
            if (hours >= 6 && hours < 18) {
              skycons.set("icon", Skycons.CLEAR_DAY);
            } else {
              skycons.set("icon", Skycons.CLEAR_NIGHT);
            }
            } else if (weather.indexOf("cloud") >= 0) {
              if (hours >= 6 && hours< 18) {
                skycons.set("icon", Skycons.PARTLY_CLOUDY_DAY);
              } else {
                  skycons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
                }
            } else if (weather.indexOf("thunderstorm") >= 0) {
              skycons.set("icon", Skycons.SLEET);
            } else if (weather.indexOf("snow") >= 0) {
              skycons.set("icon", Skycons.SNOW);
            } else if (weather.indexOf("mist") >= 0) {
              skycons.set("icon", Skycons.FOG);
            } else if (weather.indexOf("wind") >= 0 || weather.indexOf("breeze") >=0 ){
              skycons.set("icon", Skycons.WIND);
            } else if (weather.indexOf("drizzle") >= 0) {
              skycons.set("icon", Skycons.RAIN);
            }
            skycons.play();

        });
     });
    });
} else {
    /* geolocation IS NOT available */
    alert("Geolocation is not available in your browser.")
}

// Set onClickListener on degree button
$("#degree").click(function() {
    $(".temp-c").toggleClass("hidden");
    $(".temp-f").toggleClass("hidden");
    $("#celcius").toggleClass("selected");
    $("#farenheit").toggleClass("selected");
});

