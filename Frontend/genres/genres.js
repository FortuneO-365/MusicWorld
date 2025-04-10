const genres = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'Reggae', 'Rap', 'Blues', 'Afrobeats'];
const genreSelect = document.getElementById('all-genres');

function populateGenres() {
    const firstGenre = getQueryParam('genre');
    if (genres.includes(firstGenre)) {
        const availableGenres = [...genres]; // Create a copy of the genres array

        let options = '';
        if (firstGenre) {
            options += `<option value="${firstGenre}">${firstGenre}</option>`;
            const index = availableGenres.indexOf(firstGenre);
            if (index !== -1) {
                availableGenres.splice(index, 1); // Remove the firstGenre from the copy
            }
        }
        availableGenres.forEach(genre => {
            options += `<option value="${genre}">${genre}</option>`;
        });

        genreSelect.innerHTML = options; // Update innerHTML once
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

document.addEventListener('DOMContentLoaded', () => {
    populateGenres();
});