import Navbar from "../../compoonents/Navbar"
import Tracks from "../../compoonents/Tracks"
import UserPlaylist from "../../compoonents/playlist"

const Home = () => {
  return (
    <div className="App flex flex-col min-h-screen">
        <Navbar />
        <UserPlaylist />
        <Tracks />
    </div>
  );
}

export default Home; 