const img = document.getElementById('album-img');
const albumName = document.getElementById('album-name');
const artistName = document.getElementById('artist-name');

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchAlbum(){
    console.log("Fetching")
    const albumId = getQueryParam('id');
    const response = await fetch(`http://localhost:5000/album?id=${albumId}`);
    const data = await response.json();
    const albumInfo = data;
    const tracks = albumInfo.tracks.items;
    img.src = albumInfo.images[0].url;
    albumName.innerText = albumInfo.name;
    artistName.innerText = albumInfo.artists[0].name;
    document.getElementById('release-date').innerText = albumInfo.release_date;
    const tableBody = document.getElementById('song-table-body');

    tracks.forEach(track => {
        const row = document.createElement('tr');
        row.id = track.id;
        row.addEventListener('click', ()=>{
            getSong(track.id)
        })
        row.innerHTML = `
            <td>${track.name}</td>
            <td>${track.artists[0].name}</td>
            <td>${formatTime(track.duration_ms)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function formatTime(ms) {
    let secs = ms/1000;
    let mins = Math.floor(secs/60);
    let seconds = Math.floor(secs%60);
    if(seconds < 10){
        seconds = `0${seconds}`;
    }
    return `${mins}:${seconds}`;
}

document.addEventListener('DOMContentLoaded',()=>{
    fetchAlbum();
})

function getSong(id){
    window.location.href = `../song/index.html?id=${id}`;  // Change this to the actual song page URL
}

// {
//     "album_type": "album",
//     "total_tracks": 19,
//     "available_markets": [
//         "AO",
//         "BF",
//         "BI",
//         "BJ",
//         "BW",
//         "CD",
//         "CG",
//         "CI",
//         "CM",
//         "CV",
//         "DJ",
//         "DZ",
//         "EG",
//         "ET",
//         "GA",
//         "GH",
//         "GM",
//         "GN",
//         "GQ",
//         "GW",
//         "KE",
//         "KM",
//         "LR",
//         "LS",
//         "LY",
//         "MA",
//         "MG",
//         "ML",
//         "MR",
//         "MU",
//         "MW",
//         "MZ",
//         "NA",
//         "NE",
//         "NG",
//         "RW",
//         "SC",
//         "SL",
//         "SN",
//         "ST",
//         "SZ",
//         "TD",
//         "TG",
//         "TN",
//         "TZ",
//         "UG",
//         "ZA",
//         "ZM",
//         "ZW"
//     ],
//     "external_urls": {
//         "spotify": "https://open.spotify.com/album/1xaHgMftad2egI7Q4DX7Bc"
//     },
//     "href": "https://api.spotify.com/v1/albums/1xaHgMftad2egI7Q4DX7Bc",
//     "id": "1xaHgMftad2egI7Q4DX7Bc",
//     "images": [
//         {
//             "url": "https://i.scdn.co/image/ab67616d0000b27339041f1bb96943fde5bb86c9",
//             "height": 640,
//             "width": 640
//         },
//         {
//             "url": "https://i.scdn.co/image/ab67616d00001e0239041f1bb96943fde5bb86c9",
//             "height": 300,
//             "width": 300
//         },
//         {
//             "url": "https://i.scdn.co/image/ab67616d0000485139041f1bb96943fde5bb86c9",
//             "height": 64,
//             "width": 64
//         }
//     ],
//     "name": "Love, Damini",
//     "release_date": "2022-07-07",
//     "release_date_precision": "day",
//     "type": "album",
//     "uri": "spotify:album:1xaHgMftad2egI7Q4DX7Bc",
//     "artists": [
//         {
//             "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//             },
//             "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//             "id": "3wcj11K77LjEY1PkEazffa",
//             "name": "Burna Boy",
//             "type": "artist",
//             "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//         }
//     ],
//     "tracks": {
//         "href": "https://api.spotify.com/v1/albums/1xaHgMftad2egI7Q4DX7Bc/tracks?offset=0&limit=50",
//         "limit": 50,
//         "next": null,
//         "offset": 0,
//         "previous": null,
//         "total": 19,
//         "items": [
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3FdLhnmXynPvZkbILPpB6d"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3FdLhnmXynPvZkbILPpB6d",
//                         "id": "3FdLhnmXynPvZkbILPpB6d",
//                         "name": "Ladysmith Black Mambazo",
//                         "type": "artist",
//                         "uri": "spotify:artist:3FdLhnmXynPvZkbILPpB6d"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 231205,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/0z8uQ7o34HDoRU02Cz26d1"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/0z8uQ7o34HDoRU02Cz26d1",
//                 "id": "0z8uQ7o34HDoRU02Cz26d1",
//                 "name": "Glory (feat. Ladysmith Black Mambazo)",
//                 "preview_url": null,
//                 "track_number": 1,
//                 "type": "track",
//                 "uri": "spotify:track:0z8uQ7o34HDoRU02Cz26d1",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 201793,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/3OrjpHjm20zIlU7xhcs4qw"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/3OrjpHjm20zIlU7xhcs4qw",
//                 "id": "3OrjpHjm20zIlU7xhcs4qw",
//                 "name": "Science",
//                 "preview_url": null,
//                 "track_number": 2,
//                 "type": "track",
//                 "uri": "spotify:track:3OrjpHjm20zIlU7xhcs4qw",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/2a0uxJgbvvIRI4GX8pYfcr"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/2a0uxJgbvvIRI4GX8pYfcr",
//                         "id": "2a0uxJgbvvIRI4GX8pYfcr",
//                         "name": "J Hus",
//                         "type": "artist",
//                         "uri": "spotify:artist:2a0uxJgbvvIRI4GX8pYfcr"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 211050,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/519SuHU1ai91BsRxDnT9Ki"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/519SuHU1ai91BsRxDnT9Ki",
//                 "id": "519SuHU1ai91BsRxDnT9Ki",
//                 "name": "Cloak & Dagger (feat. J Hus)",
//                 "preview_url": null,
//                 "track_number": 3,
//                 "type": "track",
//                 "uri": "spotify:track:519SuHU1ai91BsRxDnT9Ki",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 152824,
//                 "explicit": true,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/6xwQng3m1S1xwZR8afMzHI"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/6xwQng3m1S1xwZR8afMzHI",
//                 "id": "6xwQng3m1S1xwZR8afMzHI",
//                 "name": "Kilometre",
//                 "preview_url": null,
//                 "track_number": 4,
//                 "type": "track",
//                 "uri": "spotify:track:6xwQng3m1S1xwZR8afMzHI",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 182037,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/57yj8vvTOUUNJ6P5Ug4rJy"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/57yj8vvTOUUNJ6P5Ug4rJy",
//                 "id": "57yj8vvTOUUNJ6P5Ug4rJy",
//                 "name": "Jagele",
//                 "preview_url": null,
//                 "track_number": 5,
//                 "type": "track",
//                 "uri": "spotify:track:57yj8vvTOUUNJ6P5Ug4rJy",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 203576,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/4Cle3wpxQfa9fjvdU3jX5p"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/4Cle3wpxQfa9fjvdU3jX5p",
//                 "id": "4Cle3wpxQfa9fjvdU3jX5p",
//                 "name": "Whiskey",
//                 "preview_url": null,
//                 "track_number": 6,
//                 "type": "track",
//                 "uri": "spotify:track:4Cle3wpxQfa9fjvdU3jX5p",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 172342,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/4LPNkxES0zCGn6S2Y1vmJN"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/4LPNkxES0zCGn6S2Y1vmJN",
//                 "id": "4LPNkxES0zCGn6S2Y1vmJN",
//                 "name": "Last Last",
//                 "preview_url": null,
//                 "track_number": 7,
//                 "type": "track",
//                 "uri": "spotify:track:4LPNkxES0zCGn6S2Y1vmJN",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/1E5hfn5BduN2nnoZCJmUVG"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/1E5hfn5BduN2nnoZCJmUVG",
//                         "id": "1E5hfn5BduN2nnoZCJmUVG",
//                         "name": "Victony",
//                         "type": "artist",
//                         "uri": "spotify:artist:1E5hfn5BduN2nnoZCJmUVG"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 209968,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/5Z1vl9fO2iaqB7M6B6MLat"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/5Z1vl9fO2iaqB7M6B6MLat",
//                 "id": "5Z1vl9fO2iaqB7M6B6MLat",
//                 "name": "Different Size (feat. Victony)",
//                 "preview_url": null,
//                 "track_number": 8,
//                 "type": "track",
//                 "uri": "spotify:track:5Z1vl9fO2iaqB7M6B6MLat",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 216991,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/3PEkfP69a7aMMb8yI7PD88"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/3PEkfP69a7aMMb8yI7PD88",
//                 "id": "3PEkfP69a7aMMb8yI7PD88",
//                 "name": "It's Plenty",
//                 "preview_url": null,
//                 "track_number": 9,
//                 "type": "track",
//                 "uri": "spotify:track:3PEkfP69a7aMMb8yI7PD88",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 151856,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/2KLHQgV54ppswp1RlKbLEo"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/2KLHQgV54ppswp1RlKbLEo",
//                 "id": "2KLHQgV54ppswp1RlKbLEo",
//                 "name": "Dirty Secrets",
//                 "preview_url": null,
//                 "track_number": 10,
//                 "type": "track",
//                 "uri": "spotify:track:2KLHQgV54ppswp1RlKbLEo",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/62DmErcU7dqZbJaDqwsqzR"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/62DmErcU7dqZbJaDqwsqzR",
//                         "id": "62DmErcU7dqZbJaDqwsqzR",
//                         "name": "Popcaan",
//                         "type": "artist",
//                         "uri": "spotify:artist:62DmErcU7dqZbJaDqwsqzR"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 175677,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/7tO7xKsLqBQFnQzsPC2MpR"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/7tO7xKsLqBQFnQzsPC2MpR",
//                 "id": "7tO7xKsLqBQFnQzsPC2MpR",
//                 "name": "Toni-Ann Singh (feat. Popcaan)",
//                 "preview_url": null,
//                 "track_number": 11,
//                 "type": "track",
//                 "uri": "spotify:track:7tO7xKsLqBQFnQzsPC2MpR",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/4qXC0i02bSFstECuXP2ZpL"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/4qXC0i02bSFstECuXP2ZpL",
//                         "id": "4qXC0i02bSFstECuXP2ZpL",
//                         "name": "Blxst",
//                         "type": "artist",
//                         "uri": "spotify:artist:4qXC0i02bSFstECuXP2ZpL"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/0cGUm45nv7Z6M6qdXYQGTX"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/0cGUm45nv7Z6M6qdXYQGTX",
//                         "id": "0cGUm45nv7Z6M6qdXYQGTX",
//                         "name": "Kehlani",
//                         "type": "artist",
//                         "uri": "spotify:artist:0cGUm45nv7Z6M6qdXYQGTX"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 195134,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/1ClI2UtrxiTXLMisjfDHtU"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/1ClI2UtrxiTXLMisjfDHtU",
//                 "id": "1ClI2UtrxiTXLMisjfDHtU",
//                 "name": "Solid (feat. Blxst & Kehlani)",
//                 "preview_url": null,
//                 "track_number": 12,
//                 "type": "track",
//                 "uri": "spotify:track:1ClI2UtrxiTXLMisjfDHtU",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V",
//                         "id": "6eUKZXaKkcviH0Ku9w2n3V",
//                         "name": "Ed Sheeran",
//                         "type": "artist",
//                         "uri": "spotify:artist:6eUKZXaKkcviH0Ku9w2n3V"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 159123,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/4N7AXHRMQYh9GHQd5hE6NP"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/4N7AXHRMQYh9GHQd5hE6NP",
//                 "id": "4N7AXHRMQYh9GHQd5hE6NP",
//                 "name": "For My Hand (feat. Ed Sheeran)",
//                 "preview_url": null,
//                 "track_number": 13,
//                 "type": "track",
//                 "uri": "spotify:track:4N7AXHRMQYh9GHQd5hE6NP",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/1vyhD5VmyZ7KMfW5gqLgo5"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/1vyhD5VmyZ7KMfW5gqLgo5",
//                         "id": "1vyhD5VmyZ7KMfW5gqLgo5",
//                         "name": "J Balvin",
//                         "type": "artist",
//                         "uri": "spotify:artist:1vyhD5VmyZ7KMfW5gqLgo5"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 187269,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/7CafltichMSQ29wMEidyDA"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/7CafltichMSQ29wMEidyDA",
//                 "id": "7CafltichMSQ29wMEidyDA",
//                 "name": "Rollercoaster (feat. J Balvin)",
//                 "preview_url": null,
//                 "track_number": 14,
//                 "type": "track",
//                 "uri": "spotify:track:7CafltichMSQ29wMEidyDA",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 155466,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/552javgfnUiLkrdN6Edioz"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/552javgfnUiLkrdN6Edioz",
//                 "id": "552javgfnUiLkrdN6Edioz",
//                 "name": "Vanilla",
//                 "preview_url": null,
//                 "track_number": 15,
//                 "type": "track",
//                 "uri": "spotify:track:552javgfnUiLkrdN6Edioz",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 210346,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/52oDXfdKV4faAFLnNyf0bl"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/52oDXfdKV4faAFLnNyf0bl",
//                 "id": "52oDXfdKV4faAFLnNyf0bl",
//                 "name": "Common Person",
//                 "preview_url": null,
//                 "track_number": 16,
//                 "type": "track",
//                 "uri": "spotify:track:52oDXfdKV4faAFLnNyf0bl",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/6LuN9FCkKOj5PcnpouEgny"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/6LuN9FCkKOj5PcnpouEgny",
//                         "id": "6LuN9FCkKOj5PcnpouEgny",
//                         "name": "Khalid",
//                         "type": "artist",
//                         "uri": "spotify:artist:6LuN9FCkKOj5PcnpouEgny"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 186189,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/0OLwkGjMlgpAtrb79aK73o"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/0OLwkGjMlgpAtrb79aK73o",
//                 "id": "0OLwkGjMlgpAtrb79aK73o",
//                 "name": "Wild Dreams (feat. Khalid)",
//                 "preview_url": null,
//                 "track_number": 17,
//                 "type": "track",
//                 "uri": "spotify:track:0OLwkGjMlgpAtrb79aK73o",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 297651,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/4C4Yxci0vTnF9z4YdlB0rI"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/4C4Yxci0vTnF9z4YdlB0rI",
//                 "id": "4C4Yxci0vTnF9z4YdlB0rI",
//                 "name": "How Bad Could It Be",
//                 "preview_url": null,
//                 "track_number": 18,
//                 "type": "track",
//                 "uri": "spotify:track:4C4Yxci0vTnF9z4YdlB0rI",
//                 "is_local": false
//             },
//             {
//                 "artists": [
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa",
//                         "id": "3wcj11K77LjEY1PkEazffa",
//                         "name": "Burna Boy",
//                         "type": "artist",
//                         "uri": "spotify:artist:3wcj11K77LjEY1PkEazffa"
//                     },
//                     {
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/artist/3FdLhnmXynPvZkbILPpB6d"
//                         },
//                         "href": "https://api.spotify.com/v1/artists/3FdLhnmXynPvZkbILPpB6d",
//                         "id": "3FdLhnmXynPvZkbILPpB6d",
//                         "name": "Ladysmith Black Mambazo",
//                         "type": "artist",
//                         "uri": "spotify:artist:3FdLhnmXynPvZkbILPpB6d"
//                     }
//                 ],
//                 "available_markets": [
//                     "AO",
//                     "BF",
//                     "BI",
//                     "BJ",
//                     "BW",
//                     "CD",
//                     "CG",
//                     "CI",
//                     "CM",
//                     "CV",
//                     "DJ",
//                     "DZ",
//                     "EG",
//                     "ET",
//                     "GA",
//                     "GH",
//                     "GM",
//                     "GN",
//                     "GQ",
//                     "GW",
//                     "KE",
//                     "KM",
//                     "LR",
//                     "LS",
//                     "LY",
//                     "MA",
//                     "MG",
//                     "ML",
//                     "MR",
//                     "MU",
//                     "MW",
//                     "MZ",
//                     "NA",
//                     "NE",
//                     "NG",
//                     "RW",
//                     "SC",
//                     "SL",
//                     "SN",
//                     "ST",
//                     "SZ",
//                     "TD",
//                     "TG",
//                     "TN",
//                     "TZ",
//                     "UG",
//                     "ZA",
//                     "ZM",
//                     "ZW"
//                 ],
//                 "disc_number": 1,
//                 "duration_ms": 142737,
//                 "explicit": false,
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/track/3J4tlSZJKEDSsxG5tjPXyM"
//                 },
//                 "href": "https://api.spotify.com/v1/tracks/3J4tlSZJKEDSsxG5tjPXyM",
//                 "id": "3J4tlSZJKEDSsxG5tjPXyM",
//                 "name": "Love, Damini (feat. Ladysmith Black Mambazo)",
//                 "preview_url": null,
//                 "track_number": 19,
//                 "type": "track",
//                 "uri": "spotify:track:3J4tlSZJKEDSsxG5tjPXyM",
//                 "is_local": false
//             }
//         ]
//     },
//     "copyrights": [
//         {
//             "text": "2022 Spaceship Entertainment Ltd.",
//             "type": "C"
//         },
//         {
//             "text": "2022 Spaceship Entertainment Ltd.",
//             "type": "P"
//         }
//     ],
//     "external_ids": {
//         "upc": "194690848742"
//     },
//     "genres": [],
//     "label": "Spaceship Entertainment Ltd.",
//     "popularity": 62
// }