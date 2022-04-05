import Navbar from "./compoonents/Navbar"
import Tracks from "./compoonents/Tracks"
import "./App.css";
import { SearchProvider } from "./context/useSearchResult"
import { ApiProvider } from "./context/useStoreApi"
import UserPlaylist from "./compoonents/playlist"

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
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
