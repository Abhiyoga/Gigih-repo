import React from 'react'
import Navbar from "../../compoonents/Navbar"
import UserPlaylist from "../../compoonents/playlist"
import Tracks from "../../compoonents/Tracks"


function MainApp() {
    return(
       <div>
            <Navbar />
            <UserPlaylist />
            <Tracks />
       </div>
    )
}

export default MainApp;