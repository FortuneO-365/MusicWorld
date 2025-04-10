// Importing modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/musicworld', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
    refinedUsername: String,
    refinedEmail: String,
    refinedPassword: String
});

const User = mongoose.model('User', UserSchema);

const Spotify_RapidApiHost = 'spotify23.p.rapidapi.com';
const Lyrics_RapidApiHost = 'genius-song-lyrics1.p.rapidapi.com';
const Download_RapidApiHost = 'spotify-downloader9.p.rapidapi.com';

const RapidApiKey = 'f66a300be6msh50efd67a3826646p1c9e5bjsnb7212b7751fc';

const Spotify_ClientID = '68293042baeb423bb233a3ba90f6e00f'
const Spotify_ClientSecret = 'ede0c89af94a403ca7cd9bde5ffcf6e7'
let accessToken = '';
const GeniusLyrics_AccessToken = 'L0vV1e9m3s0Xkk5wzmCRQFREKTfGGhlcBBCtNw5qc4g0mYfbr0SD-M29rQpaEClE';
const LASTFM_API_KEY = 'a755e77380d55985fc2cc6cd1a092f79'



let songUrl = '';

async function getAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(`${Spotify_ClientID}:${Spotify_ClientSecret}`).toString('base64');
  
    try {
      const response = await axios.post(
        tokenUrl,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
    }
}

getAccessToken();
setTimeout(() => {
    getAccessToken();
}, 3600000); // Refresh token every hour

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to MusicWorld API');
});

// Register User
app.post('/register', async (req, res) => {
    const { refinedUsername,refinedEmail,refinedPassword  } = req.body;
    const user = new User({ refinedUsername, refinedEmail, refinedPassword });
    try{
        await user.save();
        res.json({ message: 'User registered successfully' });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error registering user' , error: err.code });
    }
});

// Login User
app.post('/login', async (req, res) => {
    const { refinedEmail, refinedPassword } = req.body;
    const user = await User.findOne({ refinedEmail, refinedPassword });
    if (user) {
        res.json({ 
            message: 'Login successful', 
            user: {
                id: user._id,
                username: user.refinedUsername,
                email: user.refinedEmail,
                isRegistered: user.isRegistered
            } 
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/search', async (request, response) => {
    const { query } = request.query;
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${query}&type=album%2Ctrack%2Cartist&limit=3`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    }
    try {
        const res = await axios.request(options);
        response.json(res.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error fetching data from Spotify API' });
    }
})

app.get('/song', async (request, response) => {
    const { id } = request.query;

    const spotifyOptions = {
        method: 'GET',
        url: `https://api.spotify.com/v1/tracks/${id}`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    };

    try {
        const spotifyRes = await axios.request(spotifyOptions);
        const track = spotifyRes.data;
        const songName = track.name;
        const artistName = track.artists[0]?.name || '';
        const spotifyPreview = track.preview_url;

        console.log(`[SPOTIFY] Song: ${songName} - ${artistName}`);

        // Step 1: Search Genius
        const searchQuery = `${songName} ${artistName}`;
        const geniusSearchRes = await axios.get('https://api.genius.com/search', {
            params: { q: searchQuery },
            headers: {
                Authorization: `Bearer ${GeniusLyrics_AccessToken}`
            }
        });

        const hit = geniusSearchRes.data.response.hits[0];
        // console.log(hit);
        if (!hit) throw new Error('No Genius results found');

        const songPath = hit.result.path;
        const geniusUrl = `https://genius.com${songPath}?text_format=html`;

        const htmlRes = await axios.get(geniusUrl);
        const $ = cheerio.load(htmlRes.data);

        const lyricsHtml = $('[data-lyrics-container]').html() || '<p>Lyrics not found</p>';

        const geniusSongOptions = {
            method: 'GET',
            url: `https://api.genius.com/songs/${hit.result.id}?text_format=html`,
            headers: {
                Authorization: `Bearer ${GeniusLyrics_AccessToken}`
            }
        }
        try{
            console.log(hit.result.id)
            const geniusSongNewRes = await axios.request(geniusSongOptions);
            const songDescription = geniusSongNewRes.data.response.song.description.html;
            const descriptionHtml = songDescription || '<p>No description available</p>';
            response.json({
                ...track,
                lyrics: lyricsHtml,
                description: descriptionHtml,
                source: "GENIUS"
            });
        }
        catch (error) {
            console.warn(`[ERROR]`, error.message);
            response.json({
                ...track,
                lyrics: lyricsHtml,
                description: '<p>No description available</p>',
                source: "GENIUS_FALLBACK"
            });
        }


    } catch (error) {
        console.warn(`[ERROR]`, error.message);
        response.json({
            lyrics: `<p>Lyrics not available.</p>`,
            description: `<p>No description available</p>`,
            source: "SPOTIFY_FALLBACK"
        });
    }
});


app.get('/song/download', async (request, response) => {
    const options = {
        method: 'GET',
        url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
        params: {
          songId: songUrl,
        },
        headers: {
          'x-rapidapi-key': RapidApiKey,
          'x-rapidapi-host': Download_RapidApiHost,
        }
    };
    try {
        const res = await axios.request(options);
        response.json(res.data);
    } catch (error) {
        console.log("Remaining requests:", response.header['x-ratelimit-requests-remaining'])
        console.error(error);
    }
});

app.get('/artist', async (request, response) => {
    const { id } = request.query;
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    try {
        const res = await axios.request(options);
        response.json(res.data);
    } catch (error) {
        console.error(error);
    }
});

app.get('/artist/details', async (request, response) => {
    // const { id } = request.query;
    // const options = {
    //     method: 'GET',
    //     url: 'https://spotify23.p.rapidapi.com/artist_overview/',
    //     params: {
    //         id: id,
    //     },
    //     headers: {
    //         'X-RapidAPI-Key': RapidApiKey,
    //         'X-RapidAPI-Host': Spotify_RapidApiHost
    //     }
    // };
    // try {
    //     const res = await axios.request(options);
    //     response.json(res.data);
    // } catch (error) {
    //     console.error(error);
    // }
})

app.get('/album', async (request, response) => {
    const { id } = request.query;
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/albums/${id}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };
    try {
        const res = await axios.request(options);
        response.json(res.data);
    } catch (error) {
        response.status(400).json(error);
    }
});


app.get('/recommendations', async (req, res) => {
    const {genre} = req.query;
  
    if (!genre) {
      return res.status(400).json({ error: 'Genre is required as a query parameter' });
    }
  
    try {
      const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'tag.gettoptracks',
          tag: genre,
          api_key: LASTFM_API_KEY,
          format: 'json'
        }
      });
  
      const tracks = response.data.tracks?.track || [];

      res.json({ genre, tracks });
    } catch (error) {
      console.error('[LASTFM ERROR]', error.message);
      res.status(500).json({ error: 'Failed to fetch recommendations from Last.fm' });
    }
  });



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
