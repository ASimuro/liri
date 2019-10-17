require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);
var axios = require('axios'); 
var fs = require('fs'); 

var command = process.argv[2]; 
var value = process.argv[3]; 
switch (command) {
    case "concert-this":
        bandsInTown(value);
        break;
    case "spotify-this-song":
        spotifyThisSong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
};

function bandsInTown(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var date = response.data[i].datetime;
            var month = date.substring(5,7);
            var year = date.substring(0,4);
            var day = date.substring(8,10);
            var datesTogether = month + "/" + day + "/" + year
            
            var concertResults = "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city +"\nDate of the Event: " + datesTogether; 
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}

function spotifyThisSong(value) {
    if(value===undefined){
        value = "The Sign";
    }
    spotify.search
    ({   type: "track",
         query: value 
        })
    .then(function(response) {
        for (var i = 0; i < 1; i++) {
            var spotifyResults = "\nArtist(s): " + response.tracks.items[i].artists[0].name + "\nSong Name: " + response.tracks.items[i].name +"\nPreview Link: " + response.tracks.items[i].preview_url + "\nAlbum Name: " + response.tracks.items[i].album.name;
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movieThis(value) {
    if(value===undefined){
        value = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = "\nMovie Title: " + response.data.Title + "\nYear of Release: " + response.data.Year +"\nIMDB Rating: " + response.data.imdbRating +"\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +"\nCountry Produced: " + response.data.Country +"\nLanguage: " + response.data.Language +"\nPlot: " + response.data.Plot +"\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifyThisSong(dataArr[0], dataArr[1]);
    })
}