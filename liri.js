require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);
var axios = require('axios'); 
var fs = require('fs'); 

//
var command = process.argv[2]; 
var object = process.argv[3]; 
//based on command, do certain action
switch (command) {
    case "concert-this":
        bandsInTown(object);
        break;
    case "spotify-this-song":
        spotifyThisSong(object);
        break;
    case "movie-this":
        movieThis(object);
        break;
    case "do-what-it-says":
        doWhatItSays(object);
        break;
};
//upcoming concerts
function bandsInTown(object) {
    axios.get("https://rest.bandsintown.com/artists/" + object + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {
            //get date
            var date = response.data[i].datetime;
            var month = date.substring(5,7);
            var year = date.substring(0,4);
            var day = date.substring(8,10);
            var datesTogether = month + "/" + day + "/" + year
            //get concert info
            var concert = "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city +"\nDate of the Event: " + datesTogether; 
           //print concert info
            console.log(concert);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}
//search song
function spotifyThisSong(object) {
    if(!object){
        object = "The Sign";
    }
    spotify.search({
        type: "track",
        query: object 
        })
    .then(function(response) {
        //show 3 songs 
        for (var i = 0; i < 3; i++) {
            //get song info
            var song = "\nArtist(s): " + response.tracks.items[i].artists[0].name + "\nSong Name: " + response.tracks.items[i].name +"\nPreview Link: " + response.tracks.items[i].preview_url + "\nAlbum Name: " + response.tracks.items[i].album.name;
            //print song info
            console.log(song);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}
//search movie
function movieThis(object) {
    if(!object){
        object = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + object + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        //movie info
        var movie = "\nMovie Title: " + response.data.Title + "\nYear of Release: " + response.data.Year +"\nIMDB Rating: " + response.data.imdbRating +"\nRotten Tomatoes Rating: " + response.data.Ratings[1].object +"\nCountry Produced: " + response.data.Country +"\nLanguage: " + response.data.Language +"\nPlot: " + response.data.Plot +"\nActors/Actresses: " + response.data.Actors;
        //print movie info
        console.log(movie);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doWhatItSays() {
    //get info from random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        else{
        //split data at ,
        var randomText = data.split(",");
        //song = object
        randomText[1] = object;
        //plug song(object) into function to get info about song from random.txt file
        spotifyThisSong(object);
        }
    })
}

