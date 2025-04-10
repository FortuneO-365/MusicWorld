const img = document.getElementById('song-image');
const artistName = document.querySelectorAll('.artist-name');
const albumName = document.querySelectorAll('.album-name');
const songTitle = document.querySelectorAll('.song-title');
const lyrics = document.getElementById('lyrics');
const description = document.getElementById('description');
const downloadBtn = document.getElementById<HTMLAnchorElement>('download');
const audio = document.querySelector('audio');


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
    const songId = getQueryParam('id');
    const response = await fetch(`http://localhost:5000/song?id=${songId}`);
    const data = await response.json();
    const songInfo = data;

    img.src = songInfo.album.images[0].url;
    document.getElementById('song-duration').innerText = formatTime(songInfo.duration_ms);
    document.getElementById('release-date').innerText = songInfo.album.release_date;
    artistName.forEach(artist => {
        artist.innerText = songInfo.artists[0].name;
    })
    albumName.forEach(album => {
        album.innerText = songInfo.album.name;
    })
    songTitle.forEach(title => {
        title.innerText = songInfo.name;
    })
    lyrics.innerHTML = songInfo.lyrics || "Lyrics not found";
    description.innerHTML = songInfo.description || "Description not found";
    const e = Array.from(document.getElementsByClassName('LyricsHeader__Container-sc-3eaf69e8-1'));
    e.forEach(element => {
        element.style.display = 'none';
    })
}

async function fetchDownloadLink() {
    try {
        const response = await fetch('http://localhost:5000/song/download');
        console.log("hello world");
        const data = await response.json();
        audio.src = data.download_link;
        console.log(data);
        downloadBtn.href = data.download_link;
        downloadBtn.download = data.data.title;
    } catch (err) {
        console.error("Failed to fetch download link:", err);
    }
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

function togglePlay(){
    const audioPlayer = document.querySelector('.audio-player');
    const section = document.querySelector('section');
    if(audio.paused){
        audioPlayer.classList.add('shown')
        section.classList.add('isPlaying')
        audio.play();
    }else{
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

function seekSong(){
    const seek = audio.duration * (seek.value / 100);
    audio.currentTime = seek;
}

function setVolume(){
    audio.volume = volume.value / 100;
}

function muteSong(){    
    audio.muted = !audio.muted;
}

function nextSong(){
    // Fetch next song
}

function prevSong(){    
    // Fetch previous song
}

function repeatSong(){        
    audio.loop = !audio.loop;
}

function shuffleSong(){
    // Shuffle songs
}

function getSongProgress(){
    const elaspedTime = audio.currentTime;
    const length = audio.duration;
    const value = (elaspedTime / length) * 100 + '%';
    // console.log(value);
    console.log(elaspedTime);
    console.log(length);
    return value;
}

const rangeInput = document.getElementById('range-input-small');
const rangeInput2 = document.getElementById('range-input-large');

function updateRangeInputStyle() {
  const progressValue = getSongProgress();
  rangeInput.style.setProperty('--value', progressValue);
  rangeInput2.style.setProperty('--value', progressValue);
}



audio.addEventListener('timeupdate', ()=>{
    getSongProgress();
    updateRangeInputStyle()
})

// downloadBtn.addEventListener('click', ()=>{
//     fetchDownloadLink();
// })

document.addEventListener('DOMContentLoaded', ()=>{
    fetchSong(); 
    setTimeout(()=>{
        fetchDownloadLink();
    },500)
}) 
 

document.addEventListener('click', (event)=>{
    const dropdown = document.getElementById('dropdown-content')  
    const settings = document.getElementById('settings') 
    const settingSvg = document.getElementById('settings-svg') 
    if(event.target != settings && event.target != dropdown && event.target != settingSvg && event.target != settings.children ){
        closeTab();
    }
})