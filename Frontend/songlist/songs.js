const container = document.getElementById('grid-container')

async function fetchSongs(){
    const cached = localStorage.getItem('songlist')
    if(cached){
        const data = JSON.parse(cached)
        const songs = data.tracks;
        songs.forEach(song => {
            console.log(song)
            const songContainer = document.createElement('div');
            songContainer.classList.add('song-list');
            songContainer.id = `${song.id}`
            songContainer.addEventListener('click', ()=>{
                getSong(songContainer.id);
            })
            songContainer.innerHTML =  `
                <div class="song-img">
                    <img src="${song.album.images[0].url}" alt=>
                </div>
                <div class='minor'>
                    <h3 class="song-name">${song.name}</h3>
                    <p class="artist-name">${song.artists[0].name}</p>
                </div>
                <div class='major'>
                    <p class="artist-name">${song.artists[0].name}</p>
                </div>
                <div class='time'>
                    <p class="time">${formatTime(song.duration_ms)}</p>
                </div>
            `;
            container.append(songContainer);
        });
        document.getElementById('loader').classList.add('closed')
    }else{
        const response = await fetch('https://musicworld-fo5v.onrender.com/api/songs');
        const data = await response.json();
        const songs = data.tracks;
        localStorage.setItem('songlist', JSON.stringify(data))
        songs.forEach(song => {
            console.log(song)
            const songContainer = document.createElement('div');
            songContainer.classList.add('song-list');
            songContainer.id = `${song.id}`
            songContainer.addEventListener('click', ()=>{
                getSong(songContainer.id);
            })
            songContainer.innerHTML =  `
                <div class="song-img">
                    <img src="${song.album.images[0].url}" alt=>
                </div>
                <div class='minor'>
                    <h3 class="song-name">${song.name}</h3>
                    <p class="artist-name">${song.artists[0].name}</p>
                </div>
                <div class='major'>
                    <p class="artist-name">${song.artists[0].name}</p>
                </div>
                <div class='time'>
                    <p class="time">${formatTime(song.duration_ms)}</p>
                </div>
            `;
            container.append(songContainer);
        });
        document.getElementById('loader').classList.add('closed')
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
    window.location.href = `../song/index.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('loader').classList.remove('closed')
    fetchSongs();
})