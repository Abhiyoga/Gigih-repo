import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';

function App() {
    const CLIENT_ID = "ccbf3bbbcbb9487fadc191d006ee678a"
    const REDIRECT_URI = "http://localhost:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "playlist-modify-private"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [Tracks, setTracks] = useState([])

    const parseToken = (url) =>{
        const parsed = url.split('&')[0].split('=')
        const token = parsed[parsed.length-1] ?? null
        setToken(token)
    }

    useEffect(()=>{
        if (window.location.hash) parseToken(window.location.hash)
    },[])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchTracks = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })

        setTracks(data.tracks.items)
    }

    const renderTracks = () => {
        return Tracks.map(track => (
            <div className="track" key={track.id}>
                {track.album.images.length ? <img src={track.album.images[1].url} alt=""/> : <div>No Image</div>}
                <p>{track.name}</p>
                <p>{track.artists[0].name}</p>
            </div>
        ))
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

                {token ?
                    <form onSubmit={searchTracks}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2>Please login</h2>
                }

                {renderTracks()}

            </header>
        </div>
    );
}

export default App;