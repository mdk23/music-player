import React from 'react'

function LibrarySong({song,songs,setSongs,id,setCurrentSong,audioRef,isPlaying}) {
  
  const song_Select_Handler=async()=>{
    //const selectedSong=songs.filter( song=> song.id===id);
    await setCurrentSong(song);
    
    /*if(isPlaying){
       const playPromise=audioRef.current.play();

       if(playPromise !== undefined){
        playPromise.then(audio=>{
          audioRef.current.play();
        });
       }
    }*/

    const newSongs=songs.map(song=>{
      if(song.id===id) { return {...song,active:true} }
      else{ return {...song,active:false} }
    });

    await setSongs(newSongs);
    if(isPlaying) audioRef.current.play();
    //playAudio(isPlaying,audioRef);
  }

  return (
    <div onClick={song_Select_Handler} className={`library-song ${song.active ? 'selected': ''}`}>
        <img src={song.cover} alt={song.name}></img>
        <div className='song-description'>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    </div>
  )
}

export default LibrarySong
