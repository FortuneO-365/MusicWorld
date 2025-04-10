function search() {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.trim();

    if (searchQuery === '') return;

    const searchPath = `Frontend/search/index.html?query=${encodeURIComponent(searchQuery)}`;
    const newLocation = `${window.location.origin}/${searchPath}`;

    if (window.location.href !== newLocation) {
        console.log(searchQuery);
        window.location.href = newLocation;
        console.log(window.location.href);
    }
}

function signin(){
    const loginPath = `Frontend/signin/login.html`;
    const newLocation = `${window.location.origin}/${loginPath}`;

    if (window.location.href !== newLocation) {
        window.location.href = newLocation;
    }
}