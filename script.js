const videoEl = document.querySelector("video")

// Play & Pause ----------------------------------- //
const playPause = document.querySelector("#play-btn")
const volume = document.querySelector("#volume-icon")


// Progress Bar ---------------------------------- //
const progressRange = document.querySelector(".progress-range")
const progressBar = document.querySelector(".progress-bar")




// Volume Controls --------------------------- //
const volumeIcon = document.querySelector(".volume-icon")
const volumeRange = document.querySelector(".volume-range")
const volumeBar = document.querySelector(".volume-bar")




// Change Playback Speed -------------------- //
const playerSpeed = document.querySelector(".player-speed")
const timeDuration = document.querySelector(".time-duration")
const timeElapsed = document.querySelector(".time-elapsed")



// Fullscreen ------------------------------- //
const fullScreen = document.querySelector(".fullscreen")
function showPlayIcon () {
    playPause.classList.replace("fa-pause", "fa-play")
        
        playPause.title = "Play"

}

function togglePlay() {
    if(videoEl.paused) {
        videoEl.play()
        playPause.classList.replace("fa-play", "fa-pause")
        
        playPause.title = "Pause"
        

    } else {
        videoEl.pause()
        showPlayIcon()
        
        
        
    }
}

function muteVolume() {
    if(videoEl.volume > 0) {
        videoEl.volume = 0.0
        volume.title = "UnMute"
        volume.classList.replace("fa-volume-up", "fa-volume-mute")
        
    } else {
        videoEl.volume = 0.5
        volume.title = "Mute"
        volume.classList.replace("fa-volume-mute", "fa-volume-up")
       
    }
    
}

function updateProgress() {
    progressBar.style.width = `${(videoEl.currentTime/ videoEl.duration ) * 100}%`
    timeElapsed.textContent =   `${displayTime(videoEl.currentTime)}/`
    timeDuration.textContent = `${displayTime(videoEl.duration)}`
}

function displayTime(time) {
    let minutes = Math.floor(time/ 60)
    let seconds = Math.floor(time % 60)
   

    seconds = seconds > 9 ? seconds :  `0${seconds}`
    return `${minutes}:${seconds}`
    }

function setProgress(e) {
 const newTime = e.offsetX/ progressRange.offsetWidth
 console.log(newTime)

 progressBar.style.width = `${newTime * 100}%`
 videoEl.currentTime = newTime * videoEl.duration
}


function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth
    console.log(volume)

    volumeBar.style.width =  `${volume * 100}%`

    if(volume < 0.1) {
        volume = 0.0
    }

    if(volume > 0.9) {
        volume = 1
    }

    volumeIcon.className = ''
    if(volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up')
    }

    else if(volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas',  'fa-volume-down')
        

    }

    else if(volume === 0) {
        volumeIcon.classList.add('fas','fa-volume-off')
        
    }

    

    
    videoEl.volume = volume
}

function changeSpeed() {
   videoEl.playbackRate = playerSpeed.value
}

function fullscreen() {
    /* View in fullscreen */

    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen()
    } else if (videoEl.webkitRequestFullscreen) { /* Safari */
      videoEl.webkitRequestFullscreen()
    } else if (videoEl.msRequestFullscreen) { /* IE11 */
      videoEl.msRequestFullscreen()
    }
  
  
}






playPause.addEventListener('click', togglePlay)
videoEl.addEventListener('click', togglePlay)
videoEl.addEventListener('ended', showPlayIcon)
volumeIcon.addEventListener('click', muteVolume)
videoEl.addEventListener('timeupdate', updateProgress)
videoEl.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
playerSpeed.addEventListener('change', changeSpeed)
fullScreen.addEventListener('click', fullscreen)


