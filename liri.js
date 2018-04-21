
//requirements
let fs = require("fs");
let request = require("request");
let dotenv = require("dotenv").config();
let Twitter = require("twitter");
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
//console.log("this works");

//Use a JS Constructor to create new objects
let spotify = new Spotify(keys.spotify);
//console.log(spotify);
let twitter = new Twitter(keys.twitter);
//console.log(twitter);

//global variables
let array = process.argv;
let command = array[2];
let input = "";

    for (var j = 3; j < array.length; j++) {
	    input += array[j] + ' ';
    };

//Switch statements to determine function upon command line input
switch(command){

    case "spotify-this-song":
        if(input){
        spotifySearch(input)
        }
        else{
            input = "the sign ace of base";
            spotifySearch(input)
        };
    break;

    case "my-tweets":
        tweetLog();
    break;

    case "movie-this":
        if(input){
        imdbData(input); 
        }
        else{
            input = "mr nobody";
            imdbData(input);
        }
    break;

    case "do-what-it-says":
        machineOverlord();
    break;
};

function spotifySearch(){
    spotify.search({ type: "track", query: input, limit: 5 }, function(err, data){
        let song = data.tracks.items[0];
        if(!err){
            console.log("---------------------------------");
            console.log("Song title: " + song.name);
            console.log("---------------------------------");
            console.log("Artist's name: " + song.artists[0].name);
            console.log("---------------------------------");
            console.log("Album title: " + song.album.name);
            console.log("---------------------------------");
            console.log("Preview: " + song.preview_url);
            console.log("---------------------------------"); 
        }
        else{
            return console.log("Error occured: " + err);
        }
    })
}

function tweetLog(){
    let params = {screen_name: 'reticent_ben'};
        twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for(var i = 0; i<tweets.length; i++){
                    console.log("---------------------------------");
                    console.log("'" + tweets[i].text + "'");
                    console.log("Tweeted on " + tweets[i].created_at); 
                    }
                }
    });
}

function imdbData(){
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            let flick = JSON.parse(body);
                console.log("---------------------------------");
                console.log("Title: " + flick.Title);
                console.log("---------------------------------");
                console.log("Release Date: " + flick.Year);
                console.log("---------------------------------");
                console.log("IMDB Rating: " + flick.imdbRating);
                console.log("---------------------------------");
                console.log("Rotton Tomatoes Rating: " + flick.Ratings[1].Value);
                console.log("---------------------------------");
                console.log("Produced in: " + flick.Country);
                console.log("---------------------------------");
                console.log("Language: " + flick.Language);
                console.log("---------------------------------");
                console.log("Synopsis: " + flick.Plot);
                console.log("---------------------------------");
                console.log("Cast: " + flick.Actors);
                console.log("---------------------------------");
            }
        });
}

function machineOverlord(){
    fs.readFile("random.txt", "utf8", function(error, data) {
    //console.log(data);
        let dataArr = data.split(",");
        //console.log(dataArr);

            if(dataArr[0] === "spotify-this-song"){
                input = dataArr[1];
                    spotifySearch();
            }
    });
}