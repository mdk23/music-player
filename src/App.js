
import React, { useState,useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";

import './style/app.scss'
import data from './data';
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const audioRef=useRef(null);
  const [songInfo,setSongInfo]=useState({ currentTime:0, duration:0, animationPercentage:0 });
   
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  
  const time_Update_Handler=(e)=>{
    const current= e.target.currentTime;
    const duration=e.target.duration;
    
    const roundedCurrent=Math.round(current);
    const roundedDuration=Math.round(duration);
    const animation=Math.round( (roundedCurrent / roundedDuration)*100 );
    
    setSongInfo({...songInfo,currentTime: current,duration,animationPercentage:animation})
    
  }

  const song_End_Handler=async()=>{
    let currentIndex=songs.findIndex(song=> song.id===currentSong.id);
    await setCurrentSong(songs[ (currentIndex+1)% songs.length ]); 
    if(isPlaying) { audioRef.current.play(); }    
    
  }
  
  const[libraryStatus,setLibraryStatus]=useState(false);

  return (
    <div className={`App ${libraryStatus ? 'library-active':'' }`}>
       
       <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/> 
       
       <Song currentSong={currentSong}/>
       
       <Player setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} 
       currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} 
       setSongs={setSongs} songs={songs} setCurrentSong={setCurrentSong}/>
       
       <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} 
        audioRef={audioRef} isPlaying={isPlaying} libraryStatus={libraryStatus} />
       
       <audio 
        onTimeUpdate={(e)=>time_Update_Handler(e)}  onLoadedMetadata={time_Update_Handler} 
        ref={audioRef} src={currentSong.audio}
        onEnded={song_End_Handler}
        />
    
    </div>
  );
}

export default App;
