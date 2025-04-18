const img = document.getElementById('album-img');
const albumName = document.getElementById('album-name');
const artistName = document.getElementById('artist-name');

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchAlbum(){
    console.log("Fetching")
    const albumId = getQueryParam('id');
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/album?id=${albumId}`);
    const data = await response.json();
    console.log(data)
    const albumInfo = data;
    const tracks = albumInfo.tracks.items;
    img.src = albumInfo.images[0].url;
    albumName.innerText = albumInfo.name;
    artistName.innerText = albumInfo.artists[0].name;
    document.getElementById('release-date').innerText = albumInfo.release_date;
    const tableBody = document.getElementById('song-table-body');

    tracks.forEach(track => {
        const row = document.createElement('tr');
        row.id = track.id;
        row.addEventListener('click', ()=>{
            getSong(track.id)
        })
        row.innerHTML = `
            <td>${track.name}</td>
            <td>${track.artists[0].name}</td>
            <td>${formatTime(track.duration_ms)}</td>
        `;
        tableBody.appendChild(row);
    });
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

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('loader').classList.remove('closed')
    fetchAlbum();
})

function getSong(id){
    window.location.href = `../song/index.html?id=${id}`;  // Change this to the actual song page URL
}
