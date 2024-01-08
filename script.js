const image = document.getElementById('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.getElementById('music')
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'X',
        artist: 'Jacinto Design',
    },
    

]



// Check if Playing

let isPlaying = false;

// Play

function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    playBtn.setAttribute('title', 'Pause');

}

// Pause

function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    playBtn.setAttribute('title', 'Play');
}


// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying){
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        //Update Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //Calculate display for duration

        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);

        // Delay switching duration Element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        }
             //Calculate display for current

             const currentMinutes = Math.floor(currentTime / 60);
             console.log('minutes', currentMinutes);
             let currentSeconds = Math.floor(currentTime % 60);
                if(currentSeconds < 10) {
                    currentSeconds = `0${currentSeconds}`;
                }
                console.log('seconds', currentSeconds);
                currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;


    }
}



// Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song

let songIndex = 0;


function nextSong() {
    songIndex++;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


function prevSong() {
    songIndex--;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select First Song

loadSong(songs[songIndex]);


// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);    


// Set Progress Bar
function setProgressBar (e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    const { duration } = music;
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;

}



// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
music.addEventListener('ended', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
