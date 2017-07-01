var urlPrefix = "https://wind-bow.glitch.me/twitch-api/";
var urlSuffix = "?callback=?"
var list = ["ESL_SC2", "monstercat", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

var Channel = function() {
  this.name;
  this.logo;
  this.url;
  this.status;
  this.stream;
}

list.forEach(function(channel) {
  var url = urlPrefix + "channels/" + channel + urlSuffix;
  var newChannel = new Channel();
  $.getJSON(url, function(data) {
    newChannel.name = data.display_name;
    newChannel.logo = data.logo;
    newChannel.url  = data.url;

    url = urlPrefix + "streams/" + channel + urlSuffix;
    $.getJSON(url, function(data) {
      if(!data.stream) {
        newChannel.status = false;
        newChannel.stream = "Not Streaming";
        appendHtml(newChannel);
      } else {
        newChannel.status = true;
        newChannel.stream = data.stream.channel.status;
        appendHtml(newChannel);
      }
    });
  });
});


function appendHtml(channel) {
  var html,icon;
  if(channel.status) {
    icon = "glyphicon-play greenColor";
  } else {
    icon = "glyphicon-stop redColor";
  }
  html = "<li class=\"collection-item avatar\">" + 
        "<img src=\"" + channel.logo +  "\" class=\"circle\">" + 
        "<span class=\"title\"> <a target=\"_blank\" href=\""+ channel.url +"\">" + channel.name + "</a></span>" +
        "<p>"+ channel.stream +"</p>" + 
        "<span class=\"secondary-content\"><span class=\"glyphicon "+ icon +"\"></span></span>" +
        "</li>";

  $("#all").append(html);
  channel.status? $("#online").append(html) : $("#offline").append(html);
}
