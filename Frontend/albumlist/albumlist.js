const container = document.getElementById('grid-container')

async function fetchAlbums(){
    const cached = localStorage.getItem('albumlist')
    if(cached){
        const data = JSON.parse(cached)
        const albums = data.albums;
        console.log(data)
        albums.forEach(album => {
            console.log(album)
            const albumContainer = document.createElement('div');
            albumContainer.classList.add('album-grid');
            albumContainer.id = `${album.id}`
            albumContainer.addEventListener('click', ()=>{
                getAlbum(albumContainer.id);
            })
            albumContainer.innerHTML =  `
                <div class="album-img">
                    <img src="${album.images[0].url}" alt=>
                </div>
                <h3 class="album-name">${album.name}</h3>
                <p class="artist-name">${album.artists[0].name}</p>
            `;
            container.append(albumContainer);
        });
        document.getElementById('loader').classList.add('closed')
    }else{
        const response = await fetch('https://musicworld-fo5v.onrender.com/api/albums');
        const data = await response.json();
        localStorage.setItem('albumlist', JSON.stringify(data))
        const albums = data.albums;
        albums.forEach(album => {
            const albumContainer = document.createElement('div');
            albumContainer.classList.add('album-grid');
            albumContainer.id = `${album.id}`
            albumContainer.innerHTML =  `
                <div class="album-img">
                    <img src="${album.images[0]}" alt=>
                </div>
                <h3 class="album-name">${album.name}</h3>
                <p class="artist-name">${album.artists[0].name}</p>
            `;
            container.append(albumContainer);
        });
        document.getElementById('loader').classList.add('closed')
    }
}

function getAlbum(id){
    window.location.href = `../albums/index.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('loader').classList.remove('closed')
    fetchAlbums();
})