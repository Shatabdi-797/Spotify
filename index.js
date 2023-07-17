
//initialise variable

let songIndex=0;
let audioElement=new Audio("newsongs/Asal Mein.mp3");
let masterPlay=document.getElementById("masterPlay");

let myProgressBar=document.getElementById("myProgressBar");
let masterSongName=document.getElementById("masterSongName");
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let songs=[
    
       {songName:"Asal Mein",filePath:"newsongs/Asal Mein.mp3",coverPath:"covers/asalmein.jpg"},

       {songName:"Ek ladki ko dekha",filePath:"newsongs/Ek Ladki Ko Dekha Toh Aisa Laga.mp3",coverPath:"covers/hawabanke.jpg"},

       {songName:"Hawa Banke",filePath:"newsongs/Hawa Banke.mp3",coverPath:"covers/ladkikodekha.jpg"},
       {songName:"Mehrama",filePath:" newsongs/Mehrama.mp3",coverPath:"covers/mehramac.jpg"},
       {songName:"Rabba Mehrakari",filePath:"newsongs/Rabba Mehar Kari.mp3",coverPath:"covers/rabba-meherkari.jpg"},
                 
]

songItems.forEach((element,i)=>{
      
   element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})


//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;
    }
})



//listen to event

audioElement.addEventListener('timeupdate', ()=>{
// update seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value = progress;
})


myProgressBar.addEventListener('change',()=>{
      audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  })
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
   element.addEventListener('click',(e)=>{
     makeAllPlays();
   
     songIndex=parseInt(e.target.id);
     e.target.classList.remove('fa-play-circle');
     e.target.classList.add('fa-pause-circle');
     masterSongName.innerText=songs[songIndex].songName;
     audioElement.src="newsongs/$(songIndex+1).mp3";
     audioElement.currentTime=0;
     audioElement.play();
     gif.style.opacity=1;
     masterPlay.classList.remove("fa-play-circle");
     masterPlay.classList.add("fa-pause-circle");
})
})
document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=4){
    songIndex=0
  }
  else{
    songIndex +=1;

  }

  audioElement.src="newsongs/$(songIndex+1).mp3";
  masterSongName.innerText=songs[songIndex].songName;
     audioElement.currentTime=0;
     audioElement.play();
     masterPlay.classList.remove("fa-play-circle");
     masterPlay.classList.add("fa-pause-circle");
        
})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex=0
  }
  else{
    songIndex -=1;

  }

  audioElement.src="newsongs/$(songIndex+1).mp3";
  masterSongName.innerText=songs[songIndex].songName;
     audioElement.currentTime=0;
     audioElement.play();
     masterPlay.classList.remove("fa-play-circle");
     masterPlay.classList.add("fa-pause-circle");
        
})