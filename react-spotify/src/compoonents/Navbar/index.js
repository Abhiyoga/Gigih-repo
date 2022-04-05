import { useEffect, useState } from 'react'
import Container from "../Container";
import axios from 'axios'
import { useSearchResult } from '../../context/useSearchResult';
import { useStoreApi } from '../../context/useStoreApi';

const BASE_URL = process.env.REACT_APP_SPOTIFY_BASE_URL
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const AUTHORIZE_URL = process.env.REACT_APP_SPOTIFY_AUTHORIZE_LINK
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
const SCOPE = 'playlist-modify-private'

const Navbar = () => {
    const [query,setQuery] = useState('')
    const { result, setResult } = useSearchResult()
    const { token, setToken } = useStoreApi()

    const handleAuthorizeUser = () => {
        window.location.replace(`${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`)
    }

    const parseToken = (url) => {
        const parsed = url.split('&')[0].split('=')
        const token = parsed[parsed.length-1] ?? null
        setToken(token)
    }

    const handleSearch = async () => {
        await axios.get(`${BASE_URL}search`,{
            params: {
                q: query,
                type: 'track'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setResult(response.data.tracks.items)
        })
    }

    useEffect(() => {
        if (window.location.hash) parseToken(window.location.hash)
    },[])

    return (
        <section className="bg-gray-800 py-4">
            <Container>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2">
                    <a href="/" className="text-white font-bold text-lg lg:text-xl">
                        Spotify Clone
                    </a>
                    {
                        !token &&
                        <button
                            onClick={handleAuthorizeUser}
                            className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700">
                            Login
                        </button>
                    }
                    {
                        token && 
                        <div className='flex flex-col md:flex-row items-start md:items-center my-2 space-y-2'>
                            {
                                result.length > 0 &&
                                <button className='mr-4 text-white' onClick={() => {
                                    setResult([])
                                    setQuery('')
                                }}>
                                    Clear Result
                                </button>
                            }
                            <div className='flex'>
                                <input name="query" className='rounded-l-full py-2 px-4' value={query} onChange={(e) => setQuery(e.target.value)} />
                                <button className='bg-green-500 py-2 px-4 rounded-r-full' onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    }
                </div>
            </Container>
        </section>
    )
}

export default Navbar;