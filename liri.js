import { twitter } from "./keys";

require("dotenv").config();

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

console.log("this works")
