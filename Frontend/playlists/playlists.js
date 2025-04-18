async function fetchPlaylists() {
  try {
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
    trending.name = 'Trending';
    liked.name = 'Liked';
    fun.name = 'Fun';
    covers.name = 'Covers';
    throwback.name = 'Throwback';

    const playlists = [trending, liked, fun, covers, throwback];
    console.log(playlists);

    const container = document.getElementById('grid-container');

    // Optional: Remove old items
    container.innerHTML = '';

    playlists.forEach(playlist => {
      const { name, items } = playlist;

      for (let i = 0; i < 25; i++) {
        const track = items[i].track;
        const images = track.album.images;

        container.innerHTML += `
          <div class="playlist-card" id="${track.id}">
            <div class="playlist-image-grid">
              ${images.slice(0, 4).map(img => `
                <div class="playlist-image">
                  <img src="${img.url}" alt="${track.name}" />
                </div>
              `).join('')}
            </div>
            <div class="playlist-name">
              <p>${name}</p>
            </div>
          </div>
        `;
      }
    });

    // Cache the playlists
    localStorage.setItem('playlists', JSON.stringify(playlists));
  } catch (err) {
    console.error('Error:', err);
  }
}


document.addEventListener('DOMContentLoaded', ()=>{
  fetchPlaylists();
})