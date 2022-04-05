import { useState } from 'react'
import Container from "../Container";
import Track from "../Track";
import songs from '../../content/tracks';
import { useSearchResult } from "../../context/useSearchResult";
import { useStoreApi } from '../../context/useStoreApi';

const Tracks = () => {
    const { result, selectedSongs, setSelectedSongs, setResult } = useSearchResult()
    const {axios} = useStoreApi()
    const [playlistForm,setPlaylistForm] = useState({
        title: '',
        description: '',
    })
    const [errors,setErrors] = useState({
        title: false
    })

    const handleFormChange = (e) => {
        setPlaylistForm({
            ...playlistForm,
            [e.target.name]: e.target.value
        })
    }

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/me')
            if (response) {
                return response?.data?.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createPlaylist = async (id) => {
        try {
            const response = await axios.post(`/users/${id}/playlists`, {
                name: playlistForm.title,
                public: false,
                collaborative: false,
                description: playlistForm.description,
            })
            if (response) {
                return response?.data?.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addSongsToPlaylist = async (playlistId) => {
        try {
            const response = await axios.post(`/playlists/${playlistId}/tracks`, {
                uris: selectedSongs.map((song) => song.uri)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        if (playlistForm.title.length < 10) return setErrors({...errors,title: true})
        try {
            const id = await fetchUserData()
            const playlistId = await createPlaylist(id)
            if (playlistId) {
                const response = await addSongsToPlaylist(playlistId)
                if (response) {
                    setPlaylistForm({
                        title: '',
                        description: '',
                    })
                    setSelectedSongs([])
                    setResult([])
                    alert('Playlist is created!')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="py-8 bg-gradient-to-b from-gray-700 to-gray-800 flex-grow">
            <Container>
                {
                    selectedSongs.length > 0 &&
                    <form onSubmit={handleCreatePlaylist}>
                        <div className="mb-4 border-b border-white pb-4">
                            <h1 className="text-white text-left mb-2 text-xl font-semibold">Create New Playlist</h1>
                            <div className="my-4 text-white">
                                    <div className="flex flex-col items-start mb-3">
                                        <label htmlFor="playlistTitle" className="block mb-2">Playlist Title</label>
                                        <input name="title" id="playlistTitle" className="block p-2 rounded w-full text-black" onChange={handleFormChange} />
                                        {
                                            errors.title &&
                                            <span className='text-xs mt-2 text-red-400'>Title's length must be at least 10 character</span>
                                        }
                                    </div>
                                    <div className="flex flex-col items-start mb-3">
                                        <label htmlFor="playlistDescription" className="block mb-2">Playlist Description</label>
                                        <textarea name="description" id="playlistDescription" className="block p-2 rounded w-full text-black" onChange={handleFormChange} />
                                    </div>
                            </div>
                            <h1 className="text-white text-left mb-2 text-xl font-semibold">Songs</h1>
                            {selectedSongs.map((song,idx) => {
                                return (
                                    <Track
                                    key={song.uri}
                                    number={idx}
                                    title={song.name}
                                    artist={song.artists[0].name}
                                    album={song.album.name}
                                    uri={song.uri}
                                    />
                                    )
                                })}
                            <button className="py-2 px-4 bg-green-500 rounded-full w-full mt-3" type='submit'>
                                Create Playlist
                            </button>
                        </div>
                    </form>
                }
                {
                    result.length > 0 && (
                        <div className="text-white text-left mb-4">
                            Search Result
                        </div>
                    )
                }
                {result.length === 0 && songs.map(
                    (song,idx) => (
                        <Track
                            key={idx}
                            number={idx}
                            title={song.name}
                            artist={song.artists[0].name}
                            album={song.album.name}
                            uri={song.uri}
                            song={song}
                        />
                    )
                )}
                {
                    result.length > 0 && result.map(
                        (song,idx) => (
                            <Track
                                key={idx}
                                number={idx}
                                title={song.name}
                                artist={song.artists[0].name}
                                album={song.album.name}
                                uri={song.uri}
                                song={song}
                            />
                        )
                    )
                }
            </Container>
        </section>
    )
}

export default Tracks;