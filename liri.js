
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
    break;

    case "my-tweets":
    tweetLog();
    break;

    case "movie-this":
    imdbData(input);
    break;

    case "do-what-it-says":
    machineOverlord();
    break;

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

function imdbData(){
request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    let flick = JSON.parse(body);
    console.log(flick.Title, flick.Year, flick.imdbRating, flick.Ratings[1].Value, flick.Country,
        flick.Language, flick.Plot, flick.Actors);
  }
});
}

function machineOverlord(){
fs.readFile("random.txt", "utf8", function(error, data) {

    console.log(data);
    var dataArr = data.split(",");
      console.log(dataArr);

if(dataArr[0] === "spotify-this-song"){
input = dataArr[1];
spotifySearch();
}

  });
}