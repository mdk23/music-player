import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPlay,faPause } from '@fortawesome/free-solid-svg-icons'

function Player({setSongInfo,songInfo,audioRef,currentSong,isPlaying,setIsPlaying,setSongs,songs,setCurrentSong}) {
     
    const play_Song_Handler=()=>{
        if(isPlaying){ audioRef.current.pause(); }
        else{ audioRef.current.play(); }
        
        setIsPlaying(!isPlaying);
    }
    
    const getTime=(time)=>{
        return( Math.floor(time/60) + ':' + ('0'+Math.floor(time%60)).slice(-2) );
    }

    const drag_Handler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

    const skip_Track_Handler= async(direction)=>{
     let currentIndex=songs.findIndex(song=> song.id===currentSong.id);

     if(direction==='skip-forward') { await setCurrentSong(songs[ (currentIndex+1)% songs.length ]); }    
     else if(direction==='skip-back') {
        if( 
            (currentIndex-1)% songs.length ===-1){
             await setCurrentSong(songs[songs.length-1]);
            return;
            };
        
            await setCurrentSong(songs[ (currentIndex-1)% songs.length ]);
        }
        if(isPlaying) audioRef.current.play();
        
    }


    useEffect(()=>{
        const newSongs=songs.map(song=>{
            if(song.id===currentSong.id) { return {...song,active:true} }
            else{ return {...song,active:false} }
          });
      
          setSongs(newSongs);
         
    },[currentSong])

   const trackAnim={
    transform:`translateX(${songInfo.animationPercentage}%)`
   } 
   
  return (
    <div className='player'>
        <div className='time-control'>
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]} ) `}} className='track'>
            <input onChange={(e)=>drag_Handler(e)} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type='range'/>
            <div style={trackAnim} className='animate-track'></div>     
            </div>
            
            <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
        </div>
        
       <div className='play-control'>
            <FontAwesomeIcon onClick={()=>skip_Track_Handler('skip-back')} className='skip-back' size='2x' icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={play_Song_Handler} className='play' size='2x' icon={ isPlaying ? faPause: faPlay}/>
            <FontAwesomeIcon onClick={()=>skip_Track_Handler('skip-forward')} className='skip-forward' size='2x' icon={faAngleRight}/>
       </div>
       
    </div>
  )
}

export default Player