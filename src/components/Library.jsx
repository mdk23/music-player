import React from 'react'
import LibrarySong from './LibrarySong'

function Library({songs,setCurrentSong,setSongs,audioRef,isPlaying,libraryStatus}) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ' '}`}>
        <h2> Library </h2>
        
        <div className='library-songs'>
            {   songs.map( song=>(
                <LibrarySong song={song} setCurrentSong={setCurrentSong} setSongs={setSongs} 
                songs={songs} id={song.id} audioRef={audioRef} isPlaying={isPlaying} 
                key={song.id}/>
            ))
            } 
        </div> 
    </div>
  )
}

export default Library