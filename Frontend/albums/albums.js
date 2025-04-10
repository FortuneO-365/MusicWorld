function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchAlbum(){
    console.log("Fetching")
    const albumId = getQueryParam('id');
    const response = await fetch(`http://localhost:5000/album?id=${albumId}`);
    const data = await response.json();
    const albumInfo = data;
    console.log(albumInfo);

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

document.addEventListener('DOMContentLoaded',()=>{
    fetchAlbum();
})