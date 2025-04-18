function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchArtistDetails(){
    const artistId = getQueryParam('id');
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/artist?id=${artistId}`);
    const data = await response.json();
    console.log(data)
    const artist = data;
    
    console.log(artist)
    
    document.getElementById('song-image').src = artist.images[0].url;
    const artistNames = Array.from(document.querySelectorAll('.artist-name'))
    artistNames.forEach(artistName => {
        artistName.innerText = artist.name;
    });
    fetchArtistsTrack(artist.id)
}

async function fetchArtistsTrack(id) {
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/artist/tracks?id=${id}`);
    const data = await response.json();
    console.log(data);
    const tracks = data.tracks;
    tracks.forEach(track => {
        document.getElementById('songs-list').innerHTML += `
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
    document.getElementById('loader').classList.add('closed')
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
    window.location.href = `../song/index.html?id=${id}`;  // Change this to the actual song page URL
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchArtistDetails();
})