function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchPlaylists(){
    const playlistId = getQueryParam('id');
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/getPlaylist?id=${playlistId}`);
    const data = await response.json();

    console.log(data);
}

document.addEventListener("DOMContentLoaded", function() {
    fetchPlaylists();
});