const clientId = "68293042baeb423bb233a3ba90f6e00f";  // Replace with your actual Client ID
const clientSecret = "ede0c89af94a403ca7cd9bde5ffcf6e7";  // Replace with your actual Client Secret

const audio = document.getElementById("audio");
const img = document.querySelector("img");
const playPauseButton = document.getElementById("pause-play");
const seekBar = document.getElementById("seekBar");
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");



// Play/Pause Toggle
playPauseButton.addEventListener("click", () => {
    playPauseButton.classList.toggle("paused");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});


audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
  currentTime.innerText = Math.round(audio.currentTime/60) + ":" + Math.round(audio.currentTime)
  totalTime.innerText = audio.totalTime
});

// Change Audio Position
seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});



const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Token 2cf82db3-4064-4235-8253-16994eb51773");

const raw = JSON.stringify({
  "track": "Credit Alert",
  "artist": "Siraheem",
  "type": "track",
  "sources": [
    "spotify"
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.musicapi.com/public/search", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const data = JSON.parse(result);
    const musicInfo = data.tracks[0].data;
    console.log(musicInfo.imageUrl);
    img.src = musicInfo.imageUrl;
    audio.src = musicInfo.previewUrl;
    console.log(musicInfo);
  })
  .catch((error) => console.error(error));


