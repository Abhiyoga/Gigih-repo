import Navbar from "./compoonents/search";
import data from './content/album'
import './App.css';
import Tracks from "./compoonents/Tracks"
import Header from "./compoonents/Header"
import './App.css';
import { SearchProvider, useSearchResult} from './context/useSearchResult';
import { ApiProvider } from './context/useStoreApi';
import UserPlaylist from "./compoonents/playlist";


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