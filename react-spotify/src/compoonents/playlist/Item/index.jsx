const PlaylistItem = ({ playlist }) => {
    return (
        <div className="border border-gray-500 p-3 rounded-md mb-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="space-y-1">
                <h1 className="font-semibold">{playlist.name}</h1>
                <div className="flex space-x-2 text-gray-300 items-center">
                    <div className="text-xs">{ playlist.collaborative ? 'Collaborative' : 'Non-Collaborative' }</div>
                    <div className="text-xs">{ playlist.public ? 'Public' : 'Private'}</div>
                </div>
            </div>
            <a
                className="py-1 px-6 border border-gray-500 rounded-full block hover:border-green-500 hover:bg-green-500 hover:text-black transition-all mt-2 lg:mt-0"
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
            >
                Play
            </a>
        </div> 
    )
}

export default PlaylistItem;