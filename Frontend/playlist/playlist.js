function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchPlaylists(){
    const playlistId = getQueryParam('id');
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/getPlaylist?id=${playlistId}`);
    const data = await response.json();

    console.log(data);
    const img  = document.getElementById('playlist-img');
    img.src = data.images[0].url;
    const name = document.getElementById('playlist-name');
    name.innerHTML = data.name;

    const playlistTracks = data.tracks.items;
    const container = document.getElementById('container');
    const cached = localStorage.getItem(`playlist${playlistId}`)
    if(cached){
        const tracks = JSON.parse(cached);
        tracks.forEach(track =>{
            container.innerHTML += `
                <tr onclick = "getSong('${track.track.id}')">
                    <td>
                        <div class="track-img">
                            <img src="${track.track.album.images[0].url}" alt="">
                        </div>
                        <p>${track.track.name}</p>
                    </td>
                    <td>${track.track.artists[0].name}</td>
                    <td>${formatTime(track.track.duration_ms)}</td>
                </tr>
            ` ;
        })
    }else{
        localStorage.setItem(`playlist${playlistId}`, JSON.stringify(playlistTracks));
        playlistTracks.forEach(track =>{
            container.innerHTML += `
                <tr onclick = "getSong('${track.track.id}')">
                    <td>${track.track.name}</td>
                    <td>${track.track.artists[0].name}</td>
                    <td>${formatTime(track.track.duration_ms)}</td>
                </tr>
            ` ;
        })
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

function getSong(id){
    window.location.href = `../song/index.html?id=${id}`
}

document.addEventListener("DOMContentLoaded", function() {
    fetchPlaylists();
});
