import Container from "../Container"
import data from "../../content/album"

const Header = (props) => {
    return (
        <section className="py-12 bg-black">
            <Container>
                <section className="flex flex-col lg:flex-row items-start lg:items-end lg:space-x-4 text-white">
                    <div>
                        <img alt="Album cover" src={data.album.images[0].url} className="h-[200px] w-[200px] shadow-xl" />
                    </div>
                    <div className="text-left mt-4">
                        <p className="font-semibold text-xs lg:text-base">ALBUM</p>
                        <h1 className="font-bold text-2xl lg:text-5xl my-2">{data.album.name}</h1>
                        <div className="flex space-x-2 text-xs lg:text-base">
                            <div>
                                {data.album.artists[0].name}
                            </div>
                            <span>&#8226;</span>
                            <div>
                                {data.album.total_tracks} Tracks
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </section>
    )
}

export default Header