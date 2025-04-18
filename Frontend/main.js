const dropdowns = Array.from(document.getElementsByClassName('foldable'))
const dropdownContainer = document.getElementById('dropdown');
const navigationContainer = document.getElementById('navigation')
const toggleButton = document.getElementById("toggle");
const userNav = document.getElementById('loggedIn');


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

function search2() {
    const searchInput = document.getElementById('search-input2');
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

function getUser(){
    const user = localStorage.getItem('user')
    const userDetails = JSON.parse(user);
    if(user){
        document.getElementById('userAccount').classList.add('isloggedIn')
        document.getElementById('user-name').innerText = userDetails.username;
    }else{
        document.getElementById('userAccount').classList.remove('isloggedIn')
    }
}

function removeUser(){
    localStorage.removeItem('user');
    getUser();
}

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (event)=>{
        if(event.target == dropdown || event.target == dropdown.firstElementChild){
            dropdown.parentElement.classList.toggle('selected');
        }else{
            dropdown.classList.remove("selected");
        }
    })
})


toggleButton.addEventListener('click', ()=>{
    if(toggleButton.className.includes('active')){
        toggleButton.classList.remove('active');
        dropdownContainer.classList.add('inactive')
        navigationContainer.classList.remove('open')
    }else{
        toggleButton.classList.add('active');
        dropdownContainer.classList.remove('inactive')
        navigationContainer.classList.add('open')
    }
})

userNav.addEventListener('click', ()=>{
    userNav.classList.toggle('clicked');
})


document.addEventListener('DOMContentLoaded', ()=>{
    getUser();
})