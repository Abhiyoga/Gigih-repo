import Container from "../Container";
import Track from "../Track";
import { useSearchResult } from "../../context/useSearchResult";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Tracks = () => {
    const { result, selectedSongs } = useSearchResult()
    const token = useSelector(state => state.auth.token)

    return (
        <section className="py-8 bg-black flex-grow">
            <Container>
                 {
                    selectedSongs.length > 0 &&
                    
                        <div className="mb-4 border-b border-white pb-4">
                            <h1 className="text-white text-left mb-2 text-xl font-semibold">Selected Songs</h1>
                            {
                                selectedSongs
                                    .map((song,idx) => {
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
                                        }
                                    )
                            }
                            {
                                token
                                ? (
                                    <Link to="/create-playlist" className="py-2 px-4 bg-green-500 rounded-full w-full mt-3 block">
                                        Create Playlist
                                    </Link>
                                ) : (
                                    <div className='text-white italic'>
                                        Please log in to create new playlist
                                    </div>
                                )
                            }
                        </div>
                }
                {
                    result.length > 0 && (
                        <div className="text-white text-left mb-4">
                            Search Result
                        </div>
                    )
                }
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