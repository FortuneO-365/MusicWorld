const img = document.getElementById('song-image');
const artistName = document.querySelectorAll('.artist-name');
const albumName = document.querySelectorAll('.album-name');
const songTitle = document.querySelectorAll('.song-title');
const lyrics = document.getElementById('lyrics');
const description = document.getElementById('description');
const downloadBtn = document.getElementById('download');


function showLyrics(){
    const lyricsContainer = document.getElementById('lyrics');
    const lyricsButton = document.getElementById('lyrics-header');
    const descriptionContainer = document.getElementById('description');
    const descriptionButton = document.getElementById('description-header');

    lyricsButton.classList.add('active');
    lyricsContainer.classList.add('active');

    descriptionButton.classList.remove('active');
    descriptionContainer.classList.remove('active');
}

function hideLyrics(){
    const lyricsContainer = document.getElementById('lyrics');
    const lyricsButton = document.getElementById('lyrics-header');
    const descriptionContainer = document.getElementById('description');
    const descriptionButton = document.getElementById('description-header');

    lyricsButton.classList.remove('active');
    lyricsContainer.classList.remove('active');

    descriptionButton.classList.add('active');
    descriptionContainer.classList.add('active');
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchSong(){
    console.log("Fetching")
    let songId = getQueryParam('id');
    if (songId !== '' && songId !== null ){
        fetchSongFromSearch(songId);
    }else{
        songId = getQueryParam('recommendedId');
        fetchSongFromRecommendation(songId);
    }
}

async function fetchSongFromSearch(id) {
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/song?id=${id}`);
    const data = await response.json();
    const user = localStorage.getItem('user');
    const minorDetails = document.getElementById('minor-details');
    const majorDetails = document.getElementById('major-details');

    let songInfo = data.SPOTIFY || data.Deezer || data.Genius || data;
    let songUrl = songInfo.songUrl;

    if (!data.SPOTIFY && !data.GENIUS) {
        const songResponse = await fetch(songUrl);
        const songBlob = await songResponse.blob();
        songUrl = URL.createObjectURL(songBlob);
    }

    // Render major details (description, lyrics, audio, download)
    majorDetails.innerHTML = `
        <div>
            <audio id="audio" src="${songUrl || ''}"></audio>
        </div>
        <div id="song-description">
            <div id="headers">
                <h4 id="description-header" class="active" onclick="hideLyrics()">Overview</h4>
                <h4 id="lyrics-header" onclick="showLyrics()">Lyrics</h4>
            </div>
            <div id="description" class="items active">${songInfo.description || 'Song Description is unavailable at the moment.'}</div>
            <div id="lyrics" class="items">${songInfo.lyrics || 'Song Lyrics is unavailable at the moment.'}</div>
        </div>
        ${user ? renderDownloadButton(songUrl, songInfo.name) : ''}
    `;

    // Render minor details (image, name, artist, metadata)
    minorDetails.innerHTML = renderMinorDetails(songInfo);

    // Set artist name globally
    document.getElementById('artist-name').innerText = songInfo.artists[0].name;
    fetchArtistsTrack(songInfo.artists[0].id);
    document.getElementById('loader').classList.add('closed')

    const songImgs = Array.from(document.querySelectorAll('.audio-player-song-image'));
    songImgs.forEach((img, index) => {
        img.src = songInfo.album.images[0].url;
    });

    const songNames = Array.from(document.querySelectorAll('.audio-player-song-title'));
    songNames.forEach((name, index) => {
        name.innerText = songInfo.name;
    });

    const artistNames = Array.from(document.querySelectorAll('.audio-player-artist-name'));
    artistNames.forEach((name, index) => {
        name.innerText = songInfo.artists[0].name;
    });

}

async function fetchSongFromRecommendation(id) {
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/recommendation/track?recommendedId=${id}`);
    const data = await response.json();
    const user = localStorage.getItem('user');
    const minorDetails = document.getElementById('minor-details');
    const majorDetails = document.getElementById('major-details');

    let songInfo = data.Spotify || data.Deezer || data.Genius || data;
    let songUrl = songInfo.songUrl;

    if (!data.Spotify && !data.GENIUS) {
        const songResponse = await fetch(songUrl);
        const songBlob = await songResponse.blob();
        songUrl = URL.createObjectURL(songBlob);
    }
    majorDetails.innerHTML = `
        <div>
            <audio id="audio" src="${songUrl || ''}"></audio>
        </div>
        <div id="song-description">
            <div id="headers">
                <h4 id="description-header" class="active" onclick="hideLyrics()">Overview</h4>
                <h4 id="lyrics-header" onclick="showLyrics()">Lyrics</h4>
            </div>
            <div id="description" class="items active">${songInfo.description || 'Song Description is unavailable at the moment.'}</div>
            <div id="lyrics" class="items">${songInfo.lyrics || 'Song Lyrics is unavailable at the moment.'}</div>
        </div>
        ${user ? renderDownloadButton(songUrl, songInfo.name) : ''}
    `;
    minorDetails.innerHTML = renderMinorDetails(songInfo);
    document.getElementById('artist-name').innerText = songInfo.artists[0].name;
    fetchArtistsTrack(songInfo.artists[0].id);
    document.getElementById('loader').classList.add('closed')
}

function renderDownloadButton(songUrl, songName) {
    return `
        <div id="download-button">
            <a id="download" href="${songUrl}" download="${songName} preview">
                <div>Download Song</div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                    </svg>
                </span>
            </a>
        </div>
    `;
}

function renderMinorDetails(songInfo) {
    return `
        <div id="song-img">
            <img src="${songInfo.album.images[0].url}" alt="" id="song-image">
        </div>
        <div id="minor-details-deets">
            <h2 class="song-title">${songInfo.name}</h2>
            <h5 class="artist-name" id="artist-names">${songInfo.artists[0].name}</h5>
            <div id="song-info">
                <span id="release-date">${songInfo.album.release_date}</span> • 
                <span id="song-duration">${formatTime(songInfo.duration_ms)}</span> • 
                <span class="album-name">${songInfo.album.name}</span>
            </div>
            <div id="action-buttons">
                <div onclick="togglePlay()" id='player'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                        </svg>                          
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                    </span>
                </div>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </span>
                    Share
                </div>
            </div>
        </div>
    `;
}


async function fetchArtistsTrack(id) {
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/artist/tracks?id=${id}`);
    const data = await response.json();
    console.log(data);
    const tracks = data.tracks;
    tracks.forEach(track => {
        document.getElementById('song-array').innerHTML += `
            <div class="song" onclick='getSong("${track.id}")'>
                <div class="song-image">
                    <img src=${track.album.images[0].url} alt="">
                </div>
                <div class="song-details">
                    <p class="song-name">${track.name}</p>
                </div>
                <div class="song-duration">${formatTime(track.duration_ms)}</div>
            </div>
        `
    })
}

function formatTime(ms) {
    let secs = ms/1000;
    let mins = Math.floor(secs/60);
    let seconds = Math.floor(secs%60);
    if(seconds < 10){
        seconds = `0${seconds}`;
    }
    return `${mins}:${seconds}`;
}

function getSong(id){
    window.location.href = `index.html?id=${id}`

}

function togglePlay(){
    const audioPlayer = document.querySelector('.audio-player');
    const playBtn = document.querySelector('#player');
    const playBtn2 = document.querySelector('#pausePlay-button-small');
    const playBtn3 = document.querySelector('#pausePlay-button-large');
    const section = document.querySelector('section');
    const audio = document.querySelector('audio');
    if(audio.paused){
        audioPlayer.classList.add('shown')
        section.classList.add('isPlaying')
        playBtn.classList.add('playing')
        playBtn2.classList.remove('pause')
        playBtn3.classList.remove('pause')
        audio.play();
        updateAudio();
    }else{
        playBtn.classList.remove('playing')
        playBtn2.classList.add('pause')
        playBtn3.classList.add('pause')
        audio.pause();
    }

}

function toggleTab(){
    document.getElementById('dropdown-content').classList.toggle('hidden')
}

function closeTab(){
    document.getElementById('dropdown-content').classList.add('hidden')
}

function closePlayer(){
    const audioPlayer = document.querySelector('.audio-player');
    const section = document.querySelector('section');
    audioPlayer.classList.remove('shown')
    section.classList.remove('isPlaying')
}

function getSongProgress(){
    const playBtn = document.querySelector('#player');
    const playBtn2 = document.querySelector('#pausePlay-button-small');
    const playBtn3 = document.querySelector('#pausePlay-button-large');
    const elaspedTime = audio.currentTime;
    const length = audio.duration;
    const value = (elaspedTime / length) * 100 + '%';
    // console.log(value);
    const fulltime = document.querySelectorAll('.audio-player-duration');
    fulltime.forEach((time, index) => {
        time.innerText = formatTime(audio.duration * 1000);
    })
    const currentTime = document.querySelectorAll('.audio-player-current-time');
    currentTime.forEach((time, index) => {
        time.innerText = formatTime(elaspedTime * 1000);
    })
    
    if(audio.ended){
        audio.currentTime = 0;
        playBtn.classList.remove('playing')
        playBtn2.classList.add('pause')
        playBtn3.classList.add('pause')
    }
    return value;
}

const rangeInput = document.getElementById('range-input-small');
const rangeInput2 = document.getElementById('range-input-large');

function updateRangeInputStyle() {
  const progressValue = getSongProgress();
  rangeInput.style.setProperty('--value', progressValue);
  rangeInput2.style.setProperty('--value', progressValue);
}



function updateAudio(){
    audio.addEventListener('timeupdate', ()=>{
        getSongProgress();
        updateRangeInputStyle()
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('loader').classList.remove('closed')
    fetchSong(); 
}) 
 

document.addEventListener('click', (event)=>{
    const dropdown = document.getElementById('dropdown-content')  
    const settings = document.getElementById('settings') 
    const settingSvg = document.getElementById('settings-svg') 
    if(event.target != settings && event.target != dropdown && event.target != settingSvg && event.target != settings.children ){
        closeTab();
    }
})
