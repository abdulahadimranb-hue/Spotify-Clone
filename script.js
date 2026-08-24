let isPlaying = false;
let playPauseBtn = document.querySelector(".icons .btn:nth-child(2)");
let progressBar = document.querySelector(".progress-bar");
let progress = document.querySelector(".progress");
let handle = document.querySelector(".progress-handle");
let timeLabel = document.querySelector(".time");
let durationLabel = document.querySelector(".duration");

let currentPercent = 0;
let playInterval = null;
const SONG_DURATION_SECONDS = 20; 

playPauseBtn.textContent = "▶"; 

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function setProgress(percent, isDragging = false) {
    percent = Math.max(0, Math.min(100, percent));
    currentPercent = percent;
    
    if (isDragging) {
        progress.style.transition = 'none';
        handle.style.transition = 'none';
    } else {
        progress.style.transition = 'width 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        handle.style.transition = 'left 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    progress.style.width = percent + "%";
    handle.style.left = percent + "%";

    let currentSeconds = (percent / 100) * SONG_DURATION_SECONDS;
    timeLabel.textContent = formatTime(currentSeconds);
    durationLabel.textContent = `${formatTime(currentSeconds)}/${formatTime(SONG_DURATION_SECONDS)}`;
}

function playSong(songName, artistName) {
    const songNameEl = document.querySelector(".song-name");
    const artistNameEl = document.querySelector(".artist-name");
    const songIconEl = document.querySelector(".player-song-icon");

    // Add fade out effect
    songNameEl.style.opacity = "0";
    artistNameEl.style.opacity = "0";
    songIconEl.style.opacity = "0";

    setTimeout(() => {
        songNameEl.textContent = songName;
        artistNameEl.textContent = artistName;
        songIconEl.src = "musicicon.svg";

        // Fade in effect
        songNameEl.style.opacity = "1";
        artistNameEl.style.opacity = "1";
        songIconEl.style.opacity = "1";
    }, 150);

    clearInterval(playInterval);
    setProgress(0);
    isPlaying = false;
    playPauseBtn.textContent = "▶";
}


function startInterval() {
    clearInterval(playInterval);
    let stepPercent = 100 / (SONG_DURATION_SECONDS * 10); 

    playInterval = setInterval(() => {
        if (currentPercent >= 100) {
            clearInterval(playInterval);
            isPlaying = false;
            playPauseBtn.textContent = "▶";
            return;
        }
        setProgress(currentPercent + stepPercent);
    }, 100);
}



playPauseBtn.addEventListener("click", () => {

    if (isPlaying) {
        clearInterval(playInterval);
        isPlaying = false;
        playPauseBtn.textContent = "▶";
    } else {
        isPlaying = true;
        playPauseBtn.textContent = "⏸";
        startInterval();
    }

});

const musicPlaylists = [
    {
        title: "Pakistani Favorites",
        image: "https://i.scdn.co/image/ab67616d00001e02a5f7818cd1951c5742e8277a",
        songs: [
            { name: "Tera Mera Rishta", artist: "Pritam" },
            { name: "Barsat", artist: "Banjare, Roni" }
        ]
    },
    {
        title: "Late Night Vibes",
        image: "https://i.scdn.co/image/ab67616d0000e1a324930273efd115ab0ecf88f7",
        songs: [
            { name: "God Knows", artist: "Jokhai, Umair" },
            { name: "Blinding Lights", artist: "The Weeknd" }
        ]
    },
    {
        title: "Pop Mix",
        image: "https://i.scdn.co/image/ab67616d0000e1a38f2706d41aa1ec24c04135ba",
        songs: [
            { name: "Levitating", artist: "Dua Lipa" },
            { name: "Peaches", artist: "Justin Bieber" }
        ]
    },
    {
        title: "Chill Mix",
        image: "https://i.scdn.co/image/ab67616d0000e1a3a0b110307ee3dc10a74e3562",
        songs: [
            { name: "Save Your Tears", artist: "The Weeknd" },
            { name: "As It Was", artist: "Harry Styles" }
        ]
    }
];

const playlistSection = document.querySelector(".playlistsec");
const songCards = document.querySelector(".songcards");
const sectionTitle = document.querySelector(".head h2");
const sectionDescription = document.querySelector(".head p");

function renderLibrarySongs(playlist) {
    playlistSection.innerHTML = playlist.songs.map((song) => `
        <div class="playlist library-song" role="button" tabindex="0">
            <img class="invert" src="musicicon.svg" alt="${song.name}">
            <div class="infoofPL">
                <h3>${song.name}</h3>
                <p>${song.artist}</p>
            </div>
        </div>
    `).join("");

    playlistSection.querySelectorAll(".library-song").forEach((item, index) => {
        const song = playlist.songs[index];
        const playSelectedSong = () => {
            playSong(song.name, song.artist);
            isPlaying = true;
            playPauseBtn.textContent = "⏸";
            startInterval();
        };
        
        item.addEventListener("click", playSelectedSong);
        item.addEventListener("keydown", (event) => {
            if (["Enter", " "].includes(event.key)) playSelectedSong();
        });
    });
}

function renderPlaylistCards() {
    songCards.innerHTML = musicPlaylists.map((playlist, index) => `
        <article class="songcard playlist-card" role="button" tabindex="0" data-playlist-index="${index}">
            <img src="${playlist.image}" alt="${playlist.title}">
            <h3>${playlist.title}</h3>
            <p>${playlist.songs.length} songs</p>
        </article>
    `).join("");

    songCards.querySelectorAll(".playlist-card").forEach((card, index) => {
        const selectPlaylist = () => showPlaylistSongs(musicPlaylists[index], index, true);
        card.addEventListener("click", selectPlaylist);
        card.addEventListener("keydown", (event) => {
            if (["Enter", " "].includes(event.key)) selectPlaylist();
        });
    });
}

function showPlaylistSongs(playlist, index, autoPlay = true) {
    renderLibrarySongs(playlist);
    document.querySelectorAll(".playlist-card").forEach((card, cardIndex) => {
        card.classList.toggle("active", cardIndex === index);
    });
    
    if (autoPlay && playlist.songs.length > 0) {
        const firstSong = playlist.songs[0];
        playSong(firstSong.name, firstSong.artist);
        isPlaying = true;
        playPauseBtn.textContent = "⏸";
        startInterval();
    }
}

sectionTitle.textContent = "Your Playlists";
sectionDescription.textContent = "Choose a playlist to see its songs in Your Library.";
renderPlaylistCards();
showPlaylistSongs(musicPlaylists[0], 0, false);

progressBar.addEventListener("click", (e) => {
    let rect = progressBar.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(percent, true);
    setTimeout(() => {
        progress.style.transition = 'width 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        handle.style.transition = 'left 0.1s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease, opacity 0.2s ease';
    }, 50);
});

let isDragging = false;

handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    e.stopPropagation();
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    let rect = progressBar.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(percent, true);
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        progress.style.transition = 'width 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        handle.style.transition = 'left 0.1s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease, opacity 0.2s ease';
    }
});
const sidebarToggle = document.querySelector(".sidebar-toggle");
const libraryPanel = document.querySelector(".leftmain");
const mobileLayout = window.matchMedia("(max-width: 1500px)");

function closeLibraryOnDesktop(event) {
    if (!event.matches) {
        libraryPanel.classList.remove("is-open");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.setAttribute("aria-label", "Open library");
    }
}

sidebarToggle.addEventListener("click", () => {
    const isOpen = libraryPanel.classList.toggle("is-open");
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarToggle.setAttribute("aria-label", isOpen ? "Close library" : "Open library");
});

mobileLayout.addEventListener("change", closeLibraryOnDesktop);
