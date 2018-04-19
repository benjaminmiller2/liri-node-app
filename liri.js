
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
console.log(spotify)



let nArray = process.argv;
let command;
let song = process.argv[2];

function spotifySearch(){
    spotify.search({ type: "track", query: song, limit: 5 }, function(err, data){
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


spotifySearch();