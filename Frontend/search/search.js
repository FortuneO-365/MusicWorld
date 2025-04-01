//Get the parameters for the search query
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//Fetchs the results for the search query
async function fetchResults() {
    const query = getQueryParam('query');
    if (!query) return;
    document.getElementById('query').innerText = query;

    const response = await fetch(`http://localhost:5000/search?query=${query}`);
    const data = await response.json();

    let resultsDiv = document.getElementById('results');
    let songsResult = document.getElementById('songs-result');
    let albumResult = document.getElementById('albums-result');
    let artistElement = document.getElementById('artists-result');
    songsResult.innerHTML = '';
    albumResult.innerHTML = '';
    artistElement.innerHTML = '';

    console.log(data);

    data.tracks.items.forEach(song => {
        let album = song.album;
        let secs = song.duration_ms/1000;
        let mins = Math.floor(secs/60);
        let seconds = Math.floor(secs%60);
        songsResult.innerHTML += `
        <div class="list-item">
            <div class="list-item-majorDetails">
                <div class="list-item-image">
                    <img src='${album.images[0].url}'>
                </div> 
                <div class="list-item-details">
                    <p class="list-item-name">${song.name}</p>
                    <p class="list-item-artist">${album.artists[0].name}</p>
                </div>
            </div>
            <div class="list-item-displayName">
                <p>${album.artists[0].name}</p>
            </div>
            <div class="list-item-duration">
                <span>${mins}:${seconds}</span>
            </div>
        </div>`;
    });

    data.albums.items.forEach(album => {
        if(album.album_type === 'album'){
            albumResult.innerHTML += `
            <div class="album-card">
                <div class="album-card-image">
                    <img src='${album.images[0].url}'>
                </div> 
                <div class="album-card-details">
                    <p class="album-card-name">${album.name}</p>
                    <p class="album-card-artist">${album.artists[0].name}</p>
                </div>
            </div>`;
        }
    })

    for(let i = 0; i < 3; i++){
        let artist = data.artists.items[i];
        artistElement.innerHTML += `
            <div id="${artist.id}" class="artist-card">
                <div class="artist-image">
                    <img src='${artist.images[2].url}'>
                </div> 
                <div class="artist-name">
                    <p>${artist.name}</p>
                </div>
            </div>
        `;
    };
}

//Calls the function on document load
document.addEventListener('DOMContentLoaded', ()=>{
    fetchResults(); 
}) 