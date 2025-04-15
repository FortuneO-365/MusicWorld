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

document.addEventListener('DOMContentLoaded', () => {
    populateGenres();
    fetchRecommendations();
});

[
    {
        "name": "Back to Black",
        "duration": "0",
        "mbid": "b0adc7a8-0a90-4e09-8839-a66f315234a2",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Back+to+Black",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "1"
        }
    },
    {
        "name": "Rehab",
        "duration": "0",
        "mbid": "873eba85-b721-4728-be2e-96ce94cccb8b",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Rehab",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "2"
        }
    },
    {
        "name": "You Know I'm No Good",
        "duration": "216",
        "mbid": "e459d6e2-0390-417b-827f-aa14dbb02a0c",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/You+Know+I%27m+No+Good",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "3"
        }
    },
    {
        "name": "Tears Dry on Their Own",
        "duration": "186",
        "mbid": "2d3e8469-919e-456c-aabc-3a2a4643ff68",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Tears+Dry+on+Their+Own",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "4"
        }
    },
    {
        "name": "Show Me How",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Men+I+Trust/_/Show+Me+How",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Men I Trust",
            "mbid": "",
            "url": "https://www.last.fm/music/Men+I+Trust"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "5"
        }
    },
    {
        "name": "What A Wonderful World",
        "duration": "138",
        "mbid": "b13a3914-fe25-4c9e-bdf2-d2ec0b7b7b97",
        "url": "https://www.last.fm/music/Louis+Armstrong/_/What+A+Wonderful+World",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Louis Armstrong",
            "mbid": "eea8a864-fcda-4602-9569-38ab446decd6",
            "url": "https://www.last.fm/music/Louis+Armstrong"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "6"
        }
    },
    {
        "name": "Super Rich Kids",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Frank+Ocean/_/Super+Rich+Kids",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Frank Ocean",
            "mbid": "e520459c-dff4-491d-a6e4-c97be35e0044",
            "url": "https://www.last.fm/music/Frank+Ocean"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "7"
        }
    },
    {
        "name": "Put Your Records On",
        "duration": "213",
        "mbid": "eec0b54a-66f1-4e63-84c5-930d28122c31",
        "url": "https://www.last.fm/music/Corinne+Bailey+Rae/_/Put+Your+Records+On",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Corinne Bailey Rae",
            "mbid": "bc85c6f6-6b06-44c1-8754-ef32c1e6b824",
            "url": "https://www.last.fm/music/Corinne+Bailey+Rae"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "8"
        }
    },
    {
        "name": "Love Is a Losing Game",
        "duration": "156",
        "mbid": "fd52a6d0-7aa9-49b4-a2bd-133283c5dfae",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Love+Is+a+Losing+Game",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "9"
        }
    },
    {
        "name": "Respect",
        "duration": "146",
        "mbid": "a22a519b-19a4-49ae-908f-02c61d8fa67a",
        "url": "https://www.last.fm/music/Aretha+Franklin/_/Respect",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Aretha Franklin",
            "mbid": "2f9ecbed-27be-40e6-abca-6de49d50299e",
            "url": "https://www.last.fm/music/Aretha+Franklin"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "10"
        }
    },
    {
        "name": "Hit the Road Jack",
        "duration": "116",
        "mbid": "bab2430e-4fb2-4475-88c7-8e0a0d4b393e",
        "url": "https://www.last.fm/music/Ray+Charles/_/Hit+the+Road+Jack",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Ray Charles",
            "mbid": "2ce02909-598b-44ef-a456-151ba0a3bd70",
            "url": "https://www.last.fm/music/Ray+Charles"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "11"
        }
    },
    {
        "name": "The National Anthem",
        "duration": "309",
        "mbid": "c7492f6e-adf3-4ff5-85dc-33d527dc81d8",
        "url": "https://www.last.fm/music/Radiohead/_/The+National+Anthem",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Radiohead",
            "mbid": "a74b1b7f-71a5-4011-9441-d0b5e4122711",
            "url": "https://www.last.fm/music/Radiohead"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "12"
        }
    },
    {
        "name": "Don't Know Why",
        "duration": "186",
        "mbid": "78eea002-3fd6-43ef-9f31-b6b2f25b3feb",
        "url": "https://www.last.fm/music/Norah+Jones/_/Don%27t+Know+Why",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Norah Jones",
            "mbid": "985c709c-7771-4de3-9024-7bda29ebe3f9",
            "url": "https://www.last.fm/music/Norah+Jones"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "13"
        }
    },
    {
        "name": "Feeling Good",
        "duration": "173",
        "mbid": "96b8213c-48ab-435a-bd70-7f9d491fd107",
        "url": "https://www.last.fm/music/Nina+Simone/_/Feeling+Good",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Nina Simone",
            "mbid": "2944824d-4c26-476f-a981-be849081942f",
            "url": "https://www.last.fm/music/Nina+Simone"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "14"
        }
    },
    {
        "name": "My Way",
        "duration": "280",
        "mbid": "7832eb58-20b3-4dee-b25f-19a2b5d76efa",
        "url": "https://www.last.fm/music/Frank+Sinatra/_/My+Way",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Frank Sinatra",
            "mbid": "197450cd-0124-4164-b723-3c22dd16494d",
            "url": "https://www.last.fm/music/Frank+Sinatra"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "15"
        }
    },
    {
        "name": "Pink Matter",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Frank+Ocean/_/Pink+Matter",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Frank Ocean",
            "mbid": "e520459c-dff4-491d-a6e4-c97be35e0044",
            "url": "https://www.last.fm/music/Frank+Ocean"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "16"
        }
    },
    {
        "name": "United In Grief",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Kendrick+Lamar/_/United+In+Grief",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Kendrick Lamar",
            "mbid": "381086ea-f511-4aba-bdf9-71c753dc5077",
            "url": "https://www.last.fm/music/Kendrick+Lamar"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "17"
        }
    },
    {
        "name": "Mercy",
        "duration": "220",
        "mbid": "e528371a-0544-4328-a51e-8a2427671fcc",
        "url": "https://www.last.fm/music/Duffy/_/Mercy",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Duffy",
            "mbid": "da4f7583-bb31-49d2-9364-4bdf8bfb351c",
            "url": "https://www.last.fm/music/Duffy"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "18"
        }
    },
    {
        "name": "you should see me in a crown",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Billie+Eilish/_/you+should+see+me+in+a+crown",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Billie Eilish",
            "mbid": "",
            "url": "https://www.last.fm/music/Billie+Eilish"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "19"
        }
    },
    {
        "name": "From The Start",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Laufey/_/From+The+Start",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Laufey",
            "mbid": "",
            "url": "https://www.last.fm/music/Laufey"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "20"
        }
    },
    {
        "name": "Pretty When You Cry",
        "duration": "232",
        "mbid": "5afe7aad-1431-4e1b-a4c7-2ff414e58cb8",
        "url": "https://www.last.fm/music/Lana+Del+Rey/_/Pretty+When+You+Cry",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Lana Del Rey",
            "mbid": "b7539c32-53e7-4908-bda3-81449c367da6",
            "url": "https://www.last.fm/music/Lana+Del+Rey"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "21"
        }
    },
    {
        "name": "He Can Only Hold Her",
        "duration": "166",
        "mbid": "a224ccb6-2eb5-4bd9-b32a-65d474ddd2cf",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/He+Can+Only+Hold+Her",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "22"
        }
    },
    {
        "name": "At Last",
        "duration": "171",
        "mbid": "c81a809c-10d0-4fa7-9171-2ce8635ce87c",
        "url": "https://www.last.fm/music/Etta+James/_/At+Last",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Etta James",
            "mbid": "e22d2f66-881e-41ca-9356-544697ee5f90",
            "url": "https://www.last.fm/music/Etta+James"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "23"
        }
    },
    {
        "name": "Them Changes",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Thundercat/_/Them+Changes",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Thundercat",
            "mbid": "044fd265-79dd-43eb-afc4-8b20becf7e17",
            "url": "https://www.last.fm/music/Thundercat"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "24"
        }
    },
    {
        "name": "Nobody Gets Me",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/SZA/_/Nobody+Gets+Me",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "SZA",
            "mbid": "272989c8-5535-492d-a25c-9f58803e027f",
            "url": "https://www.last.fm/music/SZA"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "25"
        }
    },
    {
        "name": "Funny Thing",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Thundercat/_/Funny+Thing",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Thundercat",
            "mbid": "044fd265-79dd-43eb-afc4-8b20becf7e17",
            "url": "https://www.last.fm/music/Thundercat"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "26"
        }
    },
    {
        "name": "Forrest Gump",
        "duration": "194",
        "mbid": "98b769b8-8b9f-438d-af89-50846240ca44",
        "url": "https://www.last.fm/music/Frank+Ocean/_/Forrest+Gump",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Frank Ocean",
            "mbid": "e520459c-dff4-491d-a6e4-c97be35e0044",
            "url": "https://www.last.fm/music/Frank+Ocean"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "27"
        }
    },
    {
        "name": "The Other Woman",
        "duration": "184",
        "mbid": "d593d04e-053a-419f-b69e-e7a6d71b5d77",
        "url": "https://www.last.fm/music/Lana+Del+Rey/_/The+Other+Woman",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Lana Del Rey",
            "mbid": "b7539c32-53e7-4908-bda3-81449c367da6",
            "url": "https://www.last.fm/music/Lana+Del+Rey"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "28"
        }
    },
    {
        "name": "Wake Up Alone",
        "duration": "222",
        "mbid": "2ba00f89-07a5-494d-9efc-f1f8b270bb77",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Wake+Up+Alone",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "29"
        }
    },
    {
        "name": "Come Away with Me",
        "duration": "200",
        "mbid": "d53aa5b9-7b14-4095-a316-dd093f83500a",
        "url": "https://www.last.fm/music/Norah+Jones/_/Come+Away+with+Me",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Norah Jones",
            "mbid": "985c709c-7771-4de3-9024-7bda29ebe3f9",
            "url": "https://www.last.fm/music/Norah+Jones"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "30"
        }
    },
    {
        "name": "Smooth Operator - Single Version",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Sade/_/Smooth+Operator+-+Single+Version",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Sade",
            "mbid": "67930b3e-e00b-469f-8c74-fd69f20522ec",
            "url": "https://www.last.fm/music/Sade"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "31"
        }
    },
    {
        "name": "Somethin' Stupid",
        "duration": "160",
        "mbid": "e67f1fdf-67ac-495e-9ad1-fc2bf301c63b",
        "url": "https://www.last.fm/music/Frank+Sinatra/_/Somethin%27+Stupid",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Frank Sinatra",
            "mbid": "197450cd-0124-4164-b723-3c22dd16494d",
            "url": "https://www.last.fm/music/Frank+Sinatra"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "32"
        }
    },
    {
        "name": "To Build a Home",
        "duration": "193",
        "mbid": "a947e7fb-e750-4a6c-b911-1674dd5863f6",
        "url": "https://www.last.fm/music/The+Cinematic+Orchestra/_/To+Build+a+Home",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "The Cinematic Orchestra",
            "mbid": "7c158ea8-c0aa-410e-bdc1-20bba9759577",
            "url": "https://www.last.fm/music/The+Cinematic+Orchestra"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "33"
        }
    },
    {
        "name": "Juna",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Clairo/_/Juna",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Clairo",
            "mbid": "",
            "url": "https://www.last.fm/music/Clairo"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "34"
        }
    },
    {
        "name": "Just Friends",
        "duration": "193",
        "mbid": "8f3461f5-6833-44a6-b705-1b65ef610102",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Just+Friends",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "35"
        }
    },
    {
        "name": "The Christmas Song (Merry Christmas To You)",
        "duration": "191",
        "mbid": "224b4c89-5ff6-4650-bd35-d50f755280ae",
        "url": "https://www.last.fm/music/Nat+King+Cole/_/The+Christmas+Song+(Merry+Christmas+To+You)",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Nat King Cole",
            "mbid": "fbe054ec-a143-4101-9e9e-64abc5ff5ac9",
            "url": "https://www.last.fm/music/Nat+King+Cole"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "36"
        }
    },
    {
        "name": "Some Unholy War",
        "duration": "142",
        "mbid": "17c5cd7a-c6d3-4483-8aab-51ee156a2e77",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Some+Unholy+War",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "37"
        }
    },
    {
        "name": "Me & Mr Jones",
        "duration": "153",
        "mbid": "217c4f4a-d6d1-44db-9581-4cc83b738446",
        "url": "https://www.last.fm/music/Amy+Winehouse/_/Me+&+Mr+Jones",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Amy Winehouse",
            "mbid": "dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3",
            "url": "https://www.last.fm/music/Amy+Winehouse"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "38"
        }
    },
    {
        "name": "It's Oh So Quiet",
        "duration": "223",
        "mbid": "e2c179ac-6ca0-47a6-b406-4180c1e70d82",
        "url": "https://www.last.fm/music/Bj%C3%B6rk/_/It%27s+Oh+So+Quiet",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Björk",
            "mbid": "87c5dedd-371d-4a53-9f7f-80522fb7f3cb",
            "url": "https://www.last.fm/music/Bj%C3%B6rk"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "39"
        }
    },
    {
        "name": "L’Amour De Ma Vie",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Billie+Eilish/_/L%E2%80%99Amour+De+Ma+Vie",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Billie Eilish",
            "mbid": "",
            "url": "https://www.last.fm/music/Billie+Eilish"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "40"
        }
    },
    {
        "name": "Strangers in the Night",
        "duration": "156",
        "mbid": "647f8be9-b76e-4143-842a-03eb0e36c4f1",
        "url": "https://www.last.fm/music/Frank+Sinatra/_/Strangers+in+the+Night",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Frank Sinatra",
            "mbid": "197450cd-0124-4164-b723-3c22dd16494d",
            "url": "https://www.last.fm/music/Frank+Sinatra"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "41"
        }
    },
    {
        "name": "my future",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Billie+Eilish/_/my+future",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Billie Eilish",
            "mbid": "",
            "url": "https://www.last.fm/music/Billie+Eilish"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "42"
        }
    },
    {
        "name": "Feeling Good",
        "duration": "237",
        "mbid": "7cf8ecf8-fe19-4837-9172-0407e8a82e9e",
        "url": "https://www.last.fm/music/Michael+Bubl%C3%A9/_/Feeling+Good",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Michael Bublé",
            "mbid": "611700cf-27f0-4dc9-ae80-c513a767853e",
            "url": "https://www.last.fm/music/Michael+Bubl%C3%A9"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "43"
        }
    },
    {
        "name": "Kiss Of Life",
        "duration": "251",
        "mbid": "e0d9428f-45cd-4592-bd29-cb1b71408939",
        "url": "https://www.last.fm/music/Sade/_/Kiss+Of+Life",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Sade",
            "mbid": "67930b3e-e00b-469f-8c74-fd69f20522ec",
            "url": "https://www.last.fm/music/Sade"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "44"
        }
    },
    {
        "name": "Sunrise",
        "duration": "200",
        "mbid": "3c68dc9a-7534-499d-a309-8412e155c539",
        "url": "https://www.last.fm/music/Norah+Jones/_/Sunrise",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Norah Jones",
            "mbid": "985c709c-7771-4de3-9024-7bda29ebe3f9",
            "url": "https://www.last.fm/music/Norah+Jones"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "45"
        }
    },
    {
        "name": "HOT WIND BLOWS (feat. Lil Wayne)",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Tyler,+the+Creator/_/HOT+WIND+BLOWS+(feat.+Lil+Wayne)",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Tyler, the Creator",
            "mbid": "f6beac20-5dfe-4d1f-ae02-0b0a740aafd6",
            "url": "https://www.last.fm/music/Tyler,+the+Creator"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "46"
        }
    },
    {
        "name": "Like A Tattoo",
        "duration": "218",
        "mbid": "c16dcdcd-e24b-445d-b02b-89d9e0269a27",
        "url": "https://www.last.fm/music/Sade/_/Like+A+Tattoo",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Sade",
            "mbid": "67930b3e-e00b-469f-8c74-fd69f20522ec",
            "url": "https://www.last.fm/music/Sade"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "47"
        }
    },
    {
        "name": "Englishman in New York",
        "duration": "263",
        "mbid": "20bb3765-3738-46c1-a56c-711699f5f3d2",
        "url": "https://www.last.fm/music/Sting/_/Englishman+in+New+York",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Sting",
            "mbid": "7944ed53-2a58-4035-9b93-140a71e41c34",
            "url": "https://www.last.fm/music/Sting"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "48"
        }
    },
    {
        "name": "Sing About Me, I'm Dying of Thirst",
        "duration": "0",
        "mbid": "",
        "url": "https://www.last.fm/music/Kendrick+Lamar/_/Sing+About+Me,+I%27m+Dying+of+Thirst",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Kendrick Lamar",
            "mbid": "381086ea-f511-4aba-bdf9-71c753dc5077",
            "url": "https://www.last.fm/music/Kendrick+Lamar"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "49"
        }
    },
    {
        "name": "Giorgio by Moroder",
        "duration": "544",
        "mbid": "cac27da9-20c5-4722-9a25-f2c26e2c04cf",
        "url": "https://www.last.fm/music/Daft+Punk/_/Giorgio+by+Moroder",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "artist": {
            "name": "Daft Punk",
            "mbid": "056e4f3e-d505-4dad-8ec1-d04f521cbb56",
            "url": "https://www.last.fm/music/Daft+Punk"
        },
        "image": [
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "small"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "medium"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "large"
            },
            {
                "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                "size": "extralarge"
            }
        ],
        "@attr": {
            "rank": "50"
        }
    }
]