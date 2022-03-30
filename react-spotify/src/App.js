import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';

function App() {
    const CLIENT_ID = "ccbf3bbbcbb9487fadc191d006ee678a"
    const REDIRECT_URI = "https://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = 'playlist-modify-private'

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const {tracks, setTrack} = useSearchResult()

    const handleAuthorizeUser = () => {
        window.location.replace(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`)
    }

    const parseToken = (url) =>{
        const parsed = url.split('&')[0].split('=')
        const token = parsed[parsed.length-1] ?? null
        setToken(token)
    }

    const handleSearch = async () => {

    }

    useEffect(()=>{
        if (window.location.hash) parseToken(window.location.hash)
    },[])

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    // useEffect(() => {
    //     const hash = window.location.hash
    //     let token = window.localStorage.getItem("token")

    //     getToken()


    //     if (!token && hash) {
    //         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

    //         window.location.hash = ""
    //         window.localStorage.setItem("token", token)
    //     }

    //     setToken(token)

    // }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchTrack = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: 'track'
            }
        })
        .then((response) => {
            setTrack(response.data.tracks.items)
        })
    }

    const renderTrack = () => {
        return tracks.map(track => (
            <div key={tracks.id}>
                {tracks.images.length ? <img width={"100%"} src={tracks.images[0].url} alt=""/> : <div>No Image</div>}
                {tracks.name}
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
                    <form onSubmit={searchTrack}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2>Please login</h2>
                }

                {renderTrack()}

            </header>
        </div>
    );
}

export default App;