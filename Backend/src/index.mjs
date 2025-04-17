// Importing modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv'
import * as cheerio from 'cheerio';
import querystring from 'querystring';
import { url } from 'inspector';


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    GeniusLyrics_AccessToken,
    albumIds,
    artistIds
} = process.env;


// Connect to MongoDB
mongoose.connect(process.env.MongoDB_URI, {
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

let accessToken = '';

let songUrl = '';

async function getAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  
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

app.get('/api/search', async(request, response)=>{
    const { query } = request.query;
    const spotifyOptions = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${query}&type=album%2Ctrack%2Cartist&limit=3`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    };
    try {
        const res = await axios.request(spotifyOptions)
        response.json(res.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error fetching data from Spotify API' });
    }
})

app.get('/api/song', async(request, response)=>{
    const { id } = request.query;

    const spotifyOptions = {
        method: 'GET',
        url: `https://api.spotify.com/v1/tracks/${id}`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    };

    try{
        const spotifyRes = await axios.request(spotifyOptions);
        const track = spotifyRes.data;
        const songName = track.name;
        const artistName = track.artists[0]?.name || '';

        const searchQuery = `${songName} ${artistName}`;
        const geniusOptions = {
            method: 'GET',
            url: `https://api.genius.com/search?q=${searchQuery}`,
            headers: {
                Authorization: `Bearer ${GeniusLyrics_AccessToken}`
            }
        } 
        try{
            const geniusRes = await axios.request(geniusOptions);
            const hit = geniusRes.data.response.hits[0];
            const songPath = hit.result.path;
            const geniusUrl = `https://genius.com${songPath}?text_format=html`;

            const geniusSongOptions = {
                method: 'GET',
                url: `https://api.genius.com/songs/${hit.result.id}?text_format=html`,
                headers: {
                    Authorization: `Bearer ${GeniusLyrics_AccessToken}`,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
                }
            };
            
            const geniusSongNewRes = await axios.request(geniusSongOptions);
            const songDescription = geniusSongNewRes.data.response.song.description.html;
            const descriptionHtml = songDescription || '<p>No description available</p>';     

            const htmlRes = await axios.get(geniusUrl);
            const $ = cheerio.load(htmlRes.data);

            const lyricsHtml = $('[data-lyrics-container]').html() || '<p>Lyrics not found</p>';

            try {
                const deezerSearchOptions = {
                    method : 'GET',
                    url : `https://api.deezer.com/search?q=${searchQuery}`
                }
                const finalRes = await axios.request(deezerSearchOptions);
                const songUrl = finalRes.data.data[0].preview;
                response.json({
                    ...track,
                    lyrics: lyricsHtml,
                    description: descriptionHtml,
                    'songUrl': songUrl
                })


            } catch (error) {
                console.log(error);
                response.json({
                    source: "GENIUS",
                    ...track,
                    lyrics: lyricsHtml,
                    description: descriptionHtml,
                });
            }

        }catch(geniusError){
            console.log(geniusError)
            response.json({
                'SPOTIFY': track,
            })
        }
    }catch(error){
        console.log(error)
        response.status(400).json(error.message)
    }
})

app.get('/api/trending', async(request, response)=>{
    const options = {
        method: 'GET',
        url : 'https://api.spotify.com/v1/playlists/5ABHKGoOzxkaa28ttQV9sE',
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    }
    try {
        const res = await axios.request(options)
        response.json(res.data.tracks);
    } catch (error) {
        response.status(400).json(error);
    }

})

app.get('/api/recommendation', async(request, response)=>{
    const {genreId} = request.query;
    const options = {
        method : 'GET',
        url: `https://api.deezer.com/chart/${genreId}/tracks`
    }

    try {
        const res = await axios.request(options);
        response.json(res.data);
    } catch (error) {
        response.status(400).json(error)
    }
})

app.get('/api/recommendation/track', async(request, response)=>{
    const { recommendedId } = request.query;

    const options = {
        method : 'GET',
        url: `https://api.deezer.com/track/${recommendedId}`
    }

    const result = await axios.request(options);
    const trackName = result.data.title;
    const artistName = result.data.artist.name;
    const songUrl = result.data.preview;

    const query = `${trackName} ${artistName}`;

    const spotifySearchOptions = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`,
        }
    }

    try {
        const res = await axios.request(spotifySearchOptions);
        const spotifyId = res.data.tracks.items[0].id;
        const spotifyOptions = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${spotifyId}`,
            headers: {
                'Authorization' : `Bearer ${accessToken}`,
            }
        };
    
        try{
            const spotifyRes = await axios.request(spotifyOptions);
            const track = spotifyRes.data;

            const geniusOptions = {
                method: 'GET',
                url: `https://api.genius.com/search?q=${query}`,
                headers: {
                    Authorization: `Bearer ${GeniusLyrics_AccessToken}`
                }
            } 
            try{
                const geniusRes = await axios.request(geniusOptions);
                const hit = geniusRes.data.response.hits[0];
                const songPath = hit.result.path;
                const geniusUrl = `https://genius.com${songPath}?text_format=html`;
    
                const geniusSongOptions = {
                    method: 'GET',
                    url: `https://api.genius.com/songs/${hit.result.id}?text_format=html`,
                    headers: {
                        Authorization: `Bearer ${GeniusLyrics_AccessToken}`,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
                    }
                };
                
                const geniusSongNewRes = await axios.request(geniusSongOptions);
                const songDescription = geniusSongNewRes.data.response.song.description.html;
                const descriptionHtml = songDescription || '<p>No description available</p>';     
    
                const htmlRes = await axios.get(geniusUrl);
                const $ = cheerio.load(htmlRes.data);
    
                const lyricsHtml = $('[data-lyrics-container]').html() || '<p>Lyrics not found</p>';

                response.json({
                    ...track,
                    lyrics: lyricsHtml,
                    description : descriptionHtml,
                    'songUrl': songUrl
                })
    
            }catch(geniusError){
                console.log(geniusError)
                response.json({
                    'SPOTIFY': track,
                })
            }
        }catch(error){
            // console.log(error)
            response.status(400).json(error.message)
        }


    } catch (error) {
        
    }

    const spotifyOptions = {}
})

app.get('/api/artist', async(request, response)=>{
    const {id} = request.query;
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }
    try {
        const res = await axios.request(options);
        response.json(res.data)
    } catch (error) {
        response.status(400).json(error)
    }
})

app.get('/api/artist/tracks', async(request, response)=>{
    const {id} = request.query;
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/artists/${id}/top-tracks`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }
    try {
        const res = await axios.request(options);
        response.json(res.data)
    } catch (error) {
        response.status(400).json(error)
    }
})

app.get('/api/artists', async(request, response)=>{
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/artists?ids=${artistIds}`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }
    try{
        const res = await axios.request(options);
        response.json(res.data)

    }catch(error){
        response.status(400).json(error)
    }
})

app.get('/api/album', async(request, response)=>{
    const {id} = request.query;
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/albums/${id}`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }
    try{
        const res = await axios.request(options);
        response.json(res.data)
    }catch(error){
        response.status(400).json(error)
     }
})

app.get('/api/albums', async(request, response)=>{
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/albums?ids=${albumIds}`,
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }
    try{
        const res = await axios.request(options);
        response.json(res.data)

    }catch(error){
        response.status(400).json(error)
    }
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
