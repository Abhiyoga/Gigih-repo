import { useEffect, useState } from 'react'
import { useSearchResult } from '../../context/useSearchResult';
import { useStoreApi } from '../../context/useStoreApi';
import axios from 'axios'


const CLIENT_ID = "ccbf3bbbcbb9487fadc191d006ee678a"
const REDIRECT_URI = "http://localhost:3000/"
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
const SCOPE = "playlist-modify-private"


const SearchRes = () => {
    const [token, setToken] = useStoreApi()
    const [searchKey, setSearchKey] = useState("")
    const [Tracks, setTracks] = useSearchResult()

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
        await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })
        .then((response) => {
            setTracks(response.data.tracks.items)
        })
    }

    const renderTracks = () => {
        return Tracks.map(track => (
            <div className="track" key={track.id}>
                {track.album.images.length ? <img src={track.album.images[1].url} alt=""/> : <div>No Image</div>}
                <p className="title">Track:</p>
                <h5>{track.name}</h5>
                <p className="title">Artist:</p>
                <h5>{track.artists[0].name}</h5>
            </div>
        ))
    }

    return (
        <section className="bg-gray-800 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`}>Login
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

            </div>
        </section>
        
    )
}

export default SearchRes;