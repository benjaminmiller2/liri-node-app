
//requirements
var fs = require("fs");
var request = require("request");
var dotenv = require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

//test that the requirments are working
console.log("this works");

//Establish the Spotify funcitonality
//Use a JS Constructor to create new objects
var spotify = new Spotify(keys.spotify);
//console.log(spotify);

let twitter = new Twitter(keys.twitter);
//console.log(twitter);




let array = process.argv;
let command = process.argv[2];
let input = process.argv[3];

switch(command){
    case "spotify-this-song":
    if(input){
        spotifySearch(input)
    }else{
        console.log("error")
    };

    case "my-tweets":
    tweetLog();
}


function spotifySearch(){
    spotify.search({ type: "track", query: input, limit: 5 }, function(err, data){
        let song = data.tracks.items[0];
        if(!err){
            console.log(song.artists[0].name);
            console.log(song.album.name);
            console.log(song.preview_url);
            console.log(song.name);
        }
        else{
            return console.log("Error occured: " + err);
        }
    })
}

function tweetLog(){
var params = {screen_name: 'reticent_ben'};
twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for(var i = 0; i<tweets.length; i++){
        console.log(tweets[i].text, tweets[i].created_at); 
      }
  }
});
}
