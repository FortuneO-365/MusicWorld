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
    
    const response = await fetch(`https://musicworld-fo5v.onrender.com/api/search?query=${query}`);
    const data = await response.json();

    let songsResult = document.getElementById('songs-result');
    let albumResult = document.getElementById('albums-result');
    let artistElement = document.getElementById('artists-result');

    songsResult.innerHTML = '';
    albumResult.innerHTML = '';
    artistElement.innerHTML = '';

    data.tracks.items.forEach(song => {
        let secs = song.duration_ms/1000;
        let mins = Math.floor(secs/60);
        let seconds = Math.floor(secs%60);

        songsResult.innerHTML += `
        <div class="list-item" onclick='getSong("${song.id}")'>
            <div class="list-item-majorDetails">
                <div class="list-item-image">
                    <img src='${song.album.images[0].url}'>
                </div> 
                <div class="list-item-details">
                    <p class="list-item-name">${song.name}</p>
                    <p class="list-item-artist">${song.artists[0].name}</p>
                </div>
            </div>
            <div class="list-item-displayName">
                <p>${song.artists[0].name}</p>
            </div>
            <div class="list-item-duration">
                <span>${mins}:${seconds}</span>
            </div>
        </div>`;
    });
    
    data.albums.items.forEach(album => {
        console.log(album)
        if(album.album_type === 'album'){
            albumResult.innerHTML += `
            '<div class="album-card" onclick='getAlbum("${album.id}")'>
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
    
    data.artists.items.forEach(artist => {
        console.log(artist)
        artistElement.innerHTML += `
            <div id="${artist.id}" class="artist-card" onclick='getArtist("${artist.id}")'>
                <div class="artist-image">
                    <img src='${artist.images[0].url}'>
                </div> 
                <div class="artist-name">
                    <p>${artist.name}</p>
                </div>
            </div>
        `;
    });

    if(artistElement.innerHTML == ''){
        document.getElementById('artists').style.display = 'none';
    }else if(albumResult.innerHTML == ''){
        document.getElementById('albums').style.display = 'none';
    }else if(songsResult.innerHTML == ''){
        document.getElementById('songs').style.display = 'none';
    }

    
}

//Calls the function on document load
document.addEventListener('DOMContentLoaded', ()=>{
    fetchResults(); 
}) 

function getSong(id){
    window.location.href = `../song/index.html?id=${id}`;  // Change this to the actual song page URL
}

function getArtist(id){
    window.location.href = `../artists/index.html?id=${id}`;  // Change this to the actual song page URL
}

function getAlbum(id){
    window.location.href = `../albums/index.html?id=${id}`;  // Change this to the actual song page URL
}

