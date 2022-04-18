import Container from "../Container";
import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import Playlistitems from './Item'

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
        const fetchPlaylistData = async () => fetch('/me/playlists?limit=5')
            .then(res => res.json())
            .then((response: Playlist) => {
            setPlaylists(response?.items)
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
                        playlists.map((item,idx) => {
                            return <Playlistitems key={idx} playlist={item} />
                        })
                    }
                </div>
            </Container>
        </section>
    )
}

export default UserPlaylist;