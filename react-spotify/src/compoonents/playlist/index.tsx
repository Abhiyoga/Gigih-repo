import Container from "../Container";
import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";

export interface Playlist {
  href: string
  items: Item[]
  limit: number
  next: any
  offset: number
  previous: any
  total: number
}

export interface Item {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  primary_color: any
  public: boolean
  snapshot_id: string
  tracks: Tracks
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Image {
  height: any
  url: string
  width: any
}

export interface Owner {
  display_name: string
  external_urls: ExternalUrls2
  href: string
  id: string
  type: string
  uri: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Tracks {
  href: string
  total: number
}

const UserPlaylist = () => {
    const [playlists,setPlaylists] = useState<Item[]>([])
    const token = useSelector((state: RootStateOrAny) => state.auth.token);

    useEffect(() => {
        const fetchPlaylistData = async () => fetch('/me/playlists')
            .then(res => res.json())
            .then((response: Playlist) => {
              setPlaylists(response.items)
            })
        if (token) fetchPlaylistData()
    },[token])

    return (
        <section className="py-8 bg-black text-white text-left">
            <Container>
                <div className="mb-3">
                    <h1 className="text-xl ml-3 font-bold">Your Playlist</h1>
                    {!token && 
                        <div className="mt-2">
                            Sign in to see your playlist
                        </div>
                    }
                </div>
                <div>
                  {
                    playlists.map( play => {
                      return (
                        <div className="border border-gray-500 p-3 rounded-md mb-3 ml-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
                          <div className="space-y-1">
                            <h1 className="font-semibold">{play.name}</h1>
                          </div>
                          <a
                            className="py-1 px-6 border border-gray-500 rounded-sm block hover:border-green-500 hover:bg-green-500 hover:text-black transition-all mt-2 lg:mt-0"
                            href={play.external_urls.spotify}
                            target="_blank"
                            rel="noreferrer"
                          >Play</a>
                        </div> 
                      )
                    })
                  }
                </div>
            </Container>
        </section>
    )
}

export default UserPlaylist;