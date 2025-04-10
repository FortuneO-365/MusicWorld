function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchArtistDetails(){
    const artistId = getQueryParam('id');
    const response = await fetch(`http://localhost:5000/artist?id=${artistId}`);
    const data = await response.json();
    console.log(data)
    const artist = data;
    
    console.log(artist)
    
    document.getElementById('song-image').src = artist.images[0].url;
    const artistNames = Array.from(document.querySelectorAll('.artist-name'))
    artistNames.forEach(artistName => {
        artistName.innerText = artist.name;
    })
}



document.addEventListener('DOMContentLoaded', ()=>{
    fetchArtistDetails();
})