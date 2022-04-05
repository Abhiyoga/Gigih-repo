import data from '../../src/content/album'
import Navbar from '../../src/components/Navbar'
import Header from '../../src/components/Header'
import Tracks from '../../src/components/Tracks'
import './App.css';
import { SearchProvider, useSearchResult } from '../../src/context/useSearchResult';
import { ApiProvider } from '../../src/context/useStoreApi';
import UserPlaylist from '../../src/components/Playlist';

function App() {
  const { result } = useSearchResult()
  return (
    <div className="App flex flex-col min-h-screen">
        <Navbar />
        {
          result.length === 0 &&
          <Header
            imageUrl={data.album.images[0].url}
            albumName={data.album.name}
          />
        }
        <UserPlaylist />
        <Tracks />
        <div className='text-xs bg-gray-800 py-3 text-white'>
          Generasi Gigih Frontend Track Homework by Muhammad Ulil Albab Surya Negara
        </div>
    </div>
  );
}

const AppContainer = () => {
  return (
    <ApiProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ApiProvider>
  )
}

export default AppContainer;
