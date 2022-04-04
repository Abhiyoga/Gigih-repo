import SearchRes from './components/search';
import './App.css';
import Tracks from './components/Tracks'
import './App.css';
import { SearchProvider} from './context/useSearchResult';
import { ApiProvider } from './context/useStoreApi';
import UserPlaylist from './components/Playlist';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <SearchRes />
            <UserPlaylist />
            <Tracks />
            </header>
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