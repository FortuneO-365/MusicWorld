async function fetchPlaylists() {
  const urls = [
    'https://musicworld-fo5v.onrender.com/api/trending',
    'https://musicworld-fo5v.onrender.com/api/liked',
    'https://musicworld-fo5v.onrender.com/api/fun',
    'https://musicworld-fo5v.onrender.com/api/covers',
    'https://musicworld-fo5v.onrender.com/api/throwback'
  ];

  const responses = await Promise.all(urls.map(url => fetch(url)));
  const data = await Promise.all(responses.map(res => res.json()));
  const [trending, liked, fun, covers, throwback] = data;

  // Assign names

  const playlists = [trending, liked, fun, covers, throwback];
  const container = document.getElementById('grid-container');

  // Optional: Remove old items
  container.innerHTML = '';

  const cached = localStorage.getItem('playlists');
  if(cached){
    const cachedPlaylists = JSON.parse(cached);
    cachedPlaylists.forEach(playlist => {
      const {id, name, images} = playlist;
      console.log(images);
      container.innerHTML += ` 
          <div class="playlist-card" onclick="getPlaylist('${id}')">
              <div class="playlist-image">
                <div class="playlist-image">
                    <img src=${images[0].url} alt="">
                </div>
              </div>
              <div class="playlist-name">
                  <p id="name">${name}</p>
              </div>
          </div>
      `;

    });
    document.getElementById('loader').classList.add('closed')
  }else{
    localStorage.setItem('playlists', JSON.stringify(playlists));
    playlists.forEach(playlist => {
      const {id, name, images} = playlist;
      container.innerHTML += ` 
          <div class="playlist-card" onclick="getPlaylist('${id}')">
              <div class="playlist-image-grid">
                ${images.map((img, index) => `
                  <div class="playlist-image">
                      <img src=${img.url} alt="">
                  </div>
                `)}
              </div>
              <div class="playlist-name">
                  <p id="name">${name}</p>
              </div>
          </div>
      `;

    });
    document.getElementById('loader').classList.add('closed')
  }
}


function getPlaylist(playlistId) {
  window.location.href = `../playlist/index.html?id=${playlistId}`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('loader').classList.remove('closed')
  fetchPlaylists();
})