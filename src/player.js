let lowQualityStream = "https://icecast9.play.cz/radio-ostravan.mp3";
let highQualityStream = "https://icecast9.play.cz/radio-ostravan-256.mp3";

// this is done to fix caching issues
function getNewRandomizedLink(linkStream){
    return linkStream + "?" + Math.floor((Math.random() * 10000) + 1);
}

// check for which audio quality to load
var checkBox = document.getElementById("quality");
const radioSource = getNewRandomizedLink(highQualityStream);
const resetAudio = "about:blank";
const loader = document.getElementById('loader');
const audio = document.getElementById('audio');

// set initial volume var
window.SetVolume = function(val) {
    var player = document.getElementById('audio');
    player.volume = val / 100;
}

audio.addEventListener('loadstart', () => {
  if (audio.src !== resetAudio) {
    loader.style.visibility = "visible";
  }
});

audio.addEventListener('playing', () => {
  loader.style.visibility = "hidden";
});

// if cliked the play button start the stream
document.getElementById('aroundbutton').addEventListener('click', (evt) => {
  var element = document.getElementById("on");
  if(audio.paused){
    audio.src = resetAudio;
    audio.pause();
    audio.src = radioSource;
    audio.load();
    audio.play();
    element.classList.remove("fa-play");
    element.classList.add("fa-pause");
    checkBox.checked = true;
  } else {
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
    audio.src = resetAudio;
    audio.pause();
    }
 })

 // triggered by clicking quality choice button
function check(){
    if (checkBox.checked) {
        const radioSource = getNewRandomizedLink(highQualityStream);
        const resetAudio = "about:blank";
        var element = document.getElementById("on");
        audio.src = resetAudio;
        audio.pause();
        audio.src = radioSource;
        audio.load();
        audio.play();
        element.classList.remove("fa-play");
        element.classList.add("fa-pause");
   } else {
     const radioSource = getNewRandomizedLink(highQualityStream);
     const resetAudio = "about:blank";
       var element = document.getElementById("on");
       audio.src = resetAudio;
       audio.pause();
       audio.src = radioSource;
       audio.load();
       audio.play();
       element.classList.remove("fa-play");
       element.classList.add("fa-pause");
  }
}

// json parser for current playing song and artist
// replace with a more relevant parser if needed
function whatIsPlaying() {
    var url = lowQualityStream;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            document.getElementById('songs').innerHTML = JSON.parse(xmlHttp.responseText).song;
            document.getElementById('artist').innerHTML = JSON.parse(xmlHttp.responseText).artist;
            window.document.title = JSON.parse(xmlHttp.responseText).artist + " - " + JSON.parse(xmlHttp.responseText).song + " | Simple player";
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

whatIsPlaying(); // auto refresh currently playing song. Consider drawback of frequent updates
setInterval(whatIsPlaying, 1500);

document.getElementById('on').addEventListener('click', (evt) => {
    var element = document.getElementById("on");
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
})
