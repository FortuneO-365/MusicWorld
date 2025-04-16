const container = document.getElementById('grid-container')

async function fetchArtists(){
    const cached = localStorage.getItem('artistlist')
    if(cached){
        const data = JSON.parse(cached)
        const artists = data.artists;
        artists.forEach(artist => {
            console.log(artist)
            const artistContainer = document.createElement('div');
            artistContainer.classList.add('artist-container');
            artistContainer.id = `${artist.id}`
            artistContainer.addEventListener('click', ()=>{
                getArtist(artistContainer.id);
            })
            artistContainer.innerHTML =  `
                <div class="artist-image">
                    <img src="${artist.images[0].url}" alt=>
                </div>
                <p class="artist-name">${artist.name}</p>
            `;
            container.append(artistContainer);
        });
    }else{
        const response = await fetch('https://musicworld-fo5v.onrender.com/api/artists');
        const data = await response.json();
        localStorage.setItem('artistlist', JSON.stringify(data))
        const artists = data.artists;
        artists.forEach(artist => {
            console.log(artist)
            const artistContainer = document.createElement('div');
            artistContainer.classList.add('artist-container');
            artistContainer.id = `${artist.id}`
            artistContainer.addEventListener('click', ()=>{
                getArtist(artistContainer.id);
            })
            artistContainer.innerHTML =  `
                <div class="artist-image">
                    <img src="${artist.images[0].url}" alt=>
                </div>
                <p class="artist-name">${artist.name}</p>
            `;
            container.append(artistContainer);
        });
    }
}

function getArtist(id){
    window.location.href = `../artists/index.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchArtists();
})