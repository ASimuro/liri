# liri

Setup

Run npm install, and the following packages should be installed:
keys
Node-Spotify-API
Axios : This module will be used to get the IMDB and BandsInTown API data
Dotenv
fs

Create a .env file in the same directory as the rest of the files. In the .env file should be:

'# Spotify API keys'

'SPOTIFY_ID=your-spotify-ID-here'

'SPOTIFY_SECRET=your-spotify-secret-here'

Create a random.txt file which will contain: spotify-this-song,"I Want it That Way"


liri Available functions:
concert-this
spotify-this-song
movie-this
do-what-it-says

Running the following commands in your terminal will do the following:

node liri.js concert-this 'concert or band name'
This will output:

Name of the Venue
Location of the Venue
Date of the Event



node liri spotify-this-song 'song name'
This will output:

Artist(s)
Song Name
Song Preview Link
Album of the Song

If no song is provided then the song "The Sign" will be searched instead




node liri.js movie-this 'movie name'
This will output:

Title of the Movie
Year the Movie was Released
The IMDB Rating
The Rotten Tomatoes Rating
Country the Movie was made in
Language the Movie is in
Plot of the Movie
Actors in the Movie

If no movie is provided then the movie "Mr. Nobody." will be searched instead



node liri.js do-what-it-says
The program will take the text inside of random.txt and use it to call the first command with the second part as the object

random.txt: spotify-this-song,"I Want it That Way"

This would call the spotify-this-song function and pass in "I Want it That Way" as the object.