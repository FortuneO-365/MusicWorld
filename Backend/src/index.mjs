// Importing modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/musicworld', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isRegistered: Boolean
});
const User = mongoose.model('User', UserSchema);

// Spotify API Credentials
const CLIENT_ID = '68293042baeb423bb233a3ba90f6e00f';
const CLIENT_SECRET = 'ede0c89af94a403ca7cd9bde5ffcf6e7';
let accessToken = '';

// Function to get Spotify Access Token
async function getSpotifyToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            'grant_type=client_credentials', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
                }
            });
        accessToken = response.data.access_token;
        console.log(accessToken);
    } catch (error) {
        console.error('Error fetching Spotify token:', error);
    }
}

// Fetch token on startup
getSpotifyToken();
setInterval(getSpotifyToken, 3600000); // Refresh token every hour

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to MusicWorld API');
});

// Register User
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password, isRegistered: true });
    await user.save();
    res.json({ message: 'User registered successfully' });
});

// Login User
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Search music via Spotify API
app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track,artist,album&limit=3`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from Spotify', error });
    }
});

// Stream music (mock endpoint, as Spotify requires premium for full playback)
app.get('/stream/:id', async (req, res) => {
    const { id } = req.params;
    res.json({ message: 'Streaming preview', url: `https://open.spotify.com/track/${id}` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
