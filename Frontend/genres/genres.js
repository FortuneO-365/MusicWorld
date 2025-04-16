const genres = [
    {
        name: 'Pop',
        id: 132
    },
    {
        name: 'Rock',
        id: 152
    },
    {
        name: 'Jazz',
        id: 129
    },
    {
        name: 'Classical',
        id: 98
    },
    {
        name: 'Hip-hop',
        id: 116
    },
    {
        name: 'R&B',
        id: 165
    },
    {
        name: 'Reggae',
        id: 144
    },
    {
        name: 'Blues',
        id: 153
    },
    {
        name: 'Afrobeats',
        id: 2
    }
];
const genreSelect = document.getElementById('all-genres');
const container = document.getElementById('main-part')

function populateGenres() {
    const firstGenre = getQueryParam('genre');
    const matchedGenre = genres.find(genre => genre.name === firstGenre);

    if (matchedGenre) {
        const availableGenres = [...genres];

        let options = '';
        if (firstGenre) {
            options += `<option value="${firstGenre}">${firstGenre}</option>`;
            const index = availableGenres.findIndex(genre =>  genre.name === firstGenre);
            if (index !== -1) {
                availableGenres.splice(index, 1); 
            }
        }
        availableGenres.forEach(genre => {
            options += `<option id="${genre.id}" value="${genre.name}">${genre.name}</option>`;
        });

        genreSelect.innerHTML = options; 
        document.getElementById('selected-genre').innerText = firstGenre;
    } else {
        console.log(`Genre "${firstGenre}" not found. Redirecting to 404.`);
        window.location.href = '../404.html';
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

 async function fetchRecommendations(){
    const genreName = getQueryParam('genre');
    const genre = genres.find(genre => genre.name === genreName)
    const cached = localStorage.getItem(`${genre.name}`)
    if(cached){
        const data = JSON.parse(cached)
        console.log(data)
        for(var i = 0; i < 10; i++){
            const track = data.data[i];
            const trackBody = document.createElement('div');
            trackBody.classList.add('recommended-track');
            trackBody.innerHTML = `
                <div class="recommended-track-img-container">
                    <img src='${track.album.cover_big}' alt="">
                </div>
                <div class="recommended-track-details">
                    <h4 class="recommended-track-artist">${track.title}</h4>
                    <p class="recommended-track-artist">${track.artist.name}</p>
                </div>
            `;
            container.addEventListener('click',()=>{
                getSong(track.id);
            })
            container.appendChild(trackBody);
        }
    }else{
        const response = await fetch(`http://localhost:5000/api/recommendation?genreId=${genre.id}`)
        const data = await response.json();

        console.log(data)
        localStorage.setItem(`${genre.name}`, JSON.stringify(data))

        for(var i = 0; i < 10; i++){
            const track = data.data[i];
            const trackBody = document.createElement('div');
            trackBody.classList.add('recommended-track');
            trackBody.innerHTML = `
                <div class="recommended-track-img-container">
                    <img src=${track.album.cover_big} alt="">
                </div>
                <div class="recommended-track-details">
                    <h4 class="recommended-track-artist">${track.title}</h4>
                    <p class="recommended-track-artist">${track.artist.name}</p>
                </div>
            `;
            container.addEventListener('click',()=>{
                getSong(track.id);
            })
            container.appendChild(trackBody);
        }

    }
}

genreSelect.addEventListener('change', (e)=>{
    const selectedGenre = e.target.value;
    switchGenre(selectedGenre);
})

function switchGenre(genre){
    window.location.href = `index.html?genre=${genre}`
}

function getSong(id){
    window.location.href = `../song/index.html?recommendedId=${id}`;  // Change this to the actual song page URL
}

document.addEventListener('DOMContentLoaded', () => {
    populateGenres();
    fetchRecommendations();
});
