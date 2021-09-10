var bar;
var id;
var userid
var playlistname = "My Personal Taylor Swift Tracks";
var access_token;
var createdplaylistid;
var url;
var songid;
var longulr ="";
var namearr = new Array();
var listsong = new Array();
var timearr = new Array();
var Playlistdata = {
"name": playlistname,
"public": true,
};
function openNav() {
    bar.style.width = "500px";
}

function closeNav() {
    bar.style.width = "0px";
}
function initialize() {
console.log("Ready");
bar = document.getElementsByClassName("sidebar")[0];
}
$(document).ready(function(){
  initialize();

  $(".title").click(function(){
    location.href = "index.html";
      });
$(".fa-facebook").prop("href", "https://www.facebook.com/TaylorSwift");
$(".fa-instagram").prop("href", "https://instagram.com/taylorswift");
$(".fa-twitter").prop("href", "https://twitter.com/taylorswift13");
$(".fa-tumblr").prop("href", "http://taylorswift.tumblr.com/");
$(".fa-youtube").prop("href", "https://youtube.com/user/taylorswift");
$(".fa-snapchat-ghost").prop("href", "https://www.snapchat.com/add/taylorswift");
$(".fb").click(function(){
  location.href = "https://www.facebook.com/TaylorSwift";
});
$(".tw").click(function(){
  location.href = "https://twitter.com/taylorswift13";
});
$(".inst").click(function(){
  location.href = "https://instagram.com/taylorswift";
});
$(".spot").click(function(){
  location.href = "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02";
});
$(".apple").click(function(){
  location.href = "https://itunes.apple.com/gb/artist/taylor-swift/159260351";
});
$(".yt").click(function(){
  location.href = "https://youtube.com/user/taylorswift";
});
$(".Tour").click(function(){
 location.href="Tour.html";
});
$(".About").click(function(){
 location.href="About.html";
});
$(".Store").click(function(){
 location.href="https://store.taylorswift.com/";
});
$(".Music").click(function(){
 location.href="Music.html";
});
$(".Video").click(function(){
 location.href="Video.html";
});
$(".netflix").click(function(){
 location.href="https://www.netflix.com/title/81026251";
});
$(".second").click(function(){
 location.href="https://www.ft.com/content/a08bf23c-0ea6-11e9-a3aa-118c761d2745";
});
$(".third").click(function(){
 location.href="http://time.com/5493277/taylor-swift-mermaid-album/";
});
$("#rep").show();
$("#n1989").hide();
$("#red").hide();
$("#speaknow").hide();
$("#fearless").hide();
$("#tswift").hide();
$(".repalbum").click(function(){
  $("#rep").show();
  $("#n1989").hide();
  $("#red").hide();
  $("#speaknow").hide();
  $("#fearless").hide();
  $("#tswift").hide();
})
$(".ninealbum").click(function(){
  $("#n1989").show();
  $("#rep").hide();
  $("#red").hide();
  $("#speaknow").hide();
  $("#fearless").hide();
  $("#tswift").hide();
});
$(".redalbum").click(function(){
  $("#n1989").hide();
  $("#rep").hide();
  $("#red").show();
  $("#speaknow").hide();
  $("#fearless").hide();
  $("#tswift").hide();
});
$(".snalbum").click(function(){
  $("#n1989").hide();
  $("#rep").hide();
  $("#red").hide();
  $("#speaknow").show();
  $("#fearless").hide();
  $("#tswift").hide();
});
$(".flalbum").click(function(){
  $("#n1989").hide();
  $("#rep").hide();
  $("#red").hide();
  $("#speaknow").hide();
  $("#fearless").show();
  $("#tswift").hide();
});
$(".tsalbum").click(function(){
  $("#n1989").hide();
  $("#rep").hide();
  $("#red").hide();
  $("#speaknow").hide();
  $("#fearless").hide();
  $("#tswift").show();
});

$(".add").click(function(){
  var name = $(this).siblings(".song").text();
  var time = $(this).siblings(".time").text();
  namearr.push(name);
  timearr.push(time);
$(".playlisttable tr:last").after( "<tr><td>" + name + "</td><td>" + time + "</td></tr>" );
});

if (localStorage.getItem("tabledata") !== null){
  var stored = localStorage.getItem("tabledata");
  var timestored = localStorage.getItem("timedata")
    if (stored) {
        namearr = JSON.parse(stored);
        timearr = JSON.parse(timestored);
                }
          }
$(namearr).each(function(index, value){
$(".playlisttable tr:last").after( "<tr><td>" + value + "</td><td>" + timearr[index] + "</td></tr>" );
});

$(".saveplaylistbutton").click(function(){
localStorage.setItem("tabledata", JSON.stringify(namearr));
localStorage.setItem("timedata", JSON.stringify(timearr));
});

function SavePlaylist(){
  localStorage.setItem("tabledata", JSON.stringify(namearr));
  localStorage.setItem("timedata", JSON.stringify(timearr));
};

$(".Authbutton").click(function(){
  Authorise();
});

function Authorise(){
  SavePlaylist();
  $.ajax({
    type: "GET",
    url: 'https://accounts.spotify.com/en/authorize?client_id=bbbccc226fd1456b900a5668be77b533&redirect_uri=https://ninelye.github.io/TSWebDevelopment/Music.html&response_type=token&scope=playlist-modify-public',
    contentType: "application/json",
    success: function(response) {
      console.log(response)
    },
    error: function() {
      console.log("Error! :(");
     }
  })
};

$(".playlistbutton").click(function(){
  console.log("Before");
  //Authorise();
  console.log("After");
  url = window.location.href,
       access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
       $.ajax({
         type: "GET",
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
         contentType: "application/json",
           success: function(response) {
              id = response;
               userid = id.id;
                 CreatePlaylist();
           },
           error: function() {
             console.log("Error! :(");
            }


});

});
function CreatePlaylist(){
  $.ajax({
   type: "POST",
    url: "https://api.spotify.com/v1/users/" + userid + "/playlists",
    data: JSON.stringify(Playlistdata),
    dataType: "json",
    headers: {
        'Authorization': 'Bearer ' + access_token
    },
     contentType: "application/json",
       success: function(result) {
        createdplaylistid = result.id;
        SearchTracks();
       },
       error: function() {
         console.log("Error! :(");
   }
  });
};

function SearchTracks(){
//each name put into string
$(namearr).each(function(index, value){
  console.log(namearr);
$.ajax({
 type: "GET",
url: "https://api.spotify.com/v1/search?q=track:" + value + "%20artist:Taylor%20Swift&type=track&limit=1&market=US",
 headers: {
     'Authorization': 'Bearer ' + access_token
 },
contentType: "application/json",

  success: function(result){
    console.log(result);
    songid = result.tracks.items[0].id
console.log(songid)
      var test = ",";
      var temp = "spotify:track:";
      longulr = (temp + songid + test);
      console.log(longulr)
      console.log(createdplaylistid)
        Addtracks();
},

});

});

};
function Addtracks(){
$.ajax({
type: "POST",
url: "https://api.spotify.com/v1/playlists/"+createdplaylistid+"/tracks?position=0&uris=" + longulr + "",
headers: {
    'Authorization': 'Bearer ' + access_token
},
success: function(){

}

});

};
});
