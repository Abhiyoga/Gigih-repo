import { useSearchResult } from "../../context/useSearchResult";

const Track = ({number,title,artist,album, uri, song}) => {
    const {selectedSongs, setSelectedSongs} = useSearchResult()
    const generateButtonText = () => {
        const selected = selectedSongs.findIndex((song) => song.uri === uri)
        if (selected !== -1) return 'Deselect'
        return 'Select'
    }

    const handleSelect = () => {
        const selected = selectedSongs.findIndex((song) => song.uri === uri)
        if (selected > -1) {
            const newSelectedSongs = selectedSongs.filter((song) => song.uri !== uri)
            setSelectedSongs(newSelectedSongs)
        } else {
            const newSelectedSongs = [...selectedSongs,song]
            setSelectedSongs(newSelectedSongs)
        }
    }

    return (
        <div>
            <div className="grid lg:grid-cols-[50px_1fr_80px] gap-4 text-white mb-3 ml-3">
                <div className="flex items-center justify-center hidden md:block">
                    {number+1}
                </div>
                <div className="text-left">
                    <h3 className="font-semibold">{title}</h3>
                    <div>
                        <span className="text-gray-300">{artist}</span>
                        <span className="mx-4">–</span>
                        <span className="text-gray-300">{album}</span>

                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-center">
                    <button
                        className="transition-all py-2 px-5 text-sm border border-gray-600 hover:border-green-500 hover:bg-green-500 hover:text-black transition-all mt-2 lg:mt-0 rounded-sm"
                        onClick={handleSelect}
                    >
                        {generateButtonText()}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Track;