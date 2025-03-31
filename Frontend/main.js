document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value;

  const response = await fetch(`http://localhost:5000/search?query=${query}`);
  const data = await response.json();

  let resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  data.data.forEach(track => {
      console.log(track);
      let songElement = document.createElement('div');
      songElement.innerHTML = `
          <p><strong>${track.title}</strong> by ${track.artist.name}</p>
          <audio controls>
              <source src="${track.preview}" type="audio/mpeg">
              Your browser does not support the audio element.
          </audio>
          <a href="${track.link}" target="_blank">Listen on Deezer</a>
      `;
      resultsDiv.appendChild(songElement);
  });
});
