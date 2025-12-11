// Создаем кастомный курсор
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

// Ограничение частоты (1 снежинка каждые 70ms)
let lastTime = 0;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  const now = Date.now();

  if (now - lastTime > 150) {
    createSnowflake(e.clientX, e.clientY);
    lastTime = now;
  }
});

// Функция создания снежинки
function createSnowflake(x, y) {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄️";

  const size = Math.random() * 8 + 8; // Размер снежинки
  snowflake.style.fontSize = size + "px";
  snowflake.style.left = x + "px";
  snowflake.style.top = y + "px";

  document.body.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 2500);
}

function playAnimations() {
  document.querySelectorAll(".anim-video").forEach((v) => {
    v.play();
  });
}

function stopAnimations() {
  document.querySelectorAll(".anim-video").forEach((v) => {
    v.pause();
  });
}

const pianoBlock = document.querySelector(".piano-anim");
const pianoVideo = document.querySelector(".piano-video");

const miniPlayer = document.getElementById("miniPlayer");
const openButton = document.querySelector(".button");
const closeButton = document.getElementById("closePlayer");

const playlist = [];
let currentTrackIndex = 0;

// Добавь сюда имена MP3 файлов
const songFiles = ["meditaciya.mp3", "skrillex.mp3"];


openButton.addEventListener("click", () => {
  miniPlayer.classList.add("active");
  playAnimations();

  // --- ДОБАВЬ ЭТО ---
  if (playlist.length > 0) {
    loadTrack(); 
    audio.play(); 
    updatePlayBtn();
  }
});

closeButton.addEventListener("click", () => {
  miniPlayer.classList.remove("active");
  stopAnimations(); 
  pianoBlock.classList.remove("active");
  audio.pause();
});

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volumeControl = document.getElementById("volumeControl");

function loadSongsFromFolder() {
  songFiles.forEach((song) => {
    playlist.push({
      name: song,
      url: `./songs/${song}`,
    });
  });

  if (playlist.length > 0) {
    loadTrack();
  }
}


loadSongsFromFolder();

function loadTrack() {
  if (playlist.length === 0) return;

  const track = playlist[currentTrackIndex];
  audio.src = track.url;
}

playBtn.addEventListener("click", () => {
  if (playlist.length === 0) {
    alert("Добавьте MP3 файлы в папку /songs");
    return;
  }

  if (audio.src === "") {
    loadTrack();
  }

  if (audio.paused) {
    audio.play(); 
    playAnimations();
  } else {
    audio.pause();
    stopAnimations()
  }
  updatePlayBtn();
});
const playIcon = document.getElementById("playIcon");

function updatePlayBtn() {

  playIcon.src = audio.paused
    ? "imgs/playsong.svg" 
    : "imgs/pausesong.svg"; 

  playBtn.classList.toggle("paused", !audio.paused);
}

nextBtn.addEventListener("click", () => {
  if (playlist.length === 0) return;
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack();
  audio.play();
  updatePlayBtn();
});

prevBtn.addEventListener("click", () => {
  if (playlist.length === 0) return;
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack();
  audio.play();
  updatePlayBtn();
});

volumeControl.addEventListener("input", (e) => {
  const volume = e.target.value / 100;
  audio.volume = volume;
});

audio.volume = 0.7;

audio.addEventListener("ended", () => {
  nextBtn.click();
});


updatePlayBtn();

const volumeSlider = document.getElementById("volumeControl");

function updateSliderValue() {
  const value = volumeSlider.value;
  volumeSlider.style.setProperty("--value", value + "%");
}

volumeSlider.addEventListener("input", updateSliderValue);
updateSliderValue(); 



