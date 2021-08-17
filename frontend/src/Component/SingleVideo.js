import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import YouTube from 'react-youtube';
var getYouTubeID = require('get-youtube-id');

export default function SingleVideo() {
    // css styling
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }

    const { id } = useParams()
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchVideos = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/videolist/${id}/`);
                setVideos(res.data.data.video_serializer)
                setLoading(false)
            } catch (err) {
                console.log("something wrong")
            }
        }
        fetchVideos()

    }, [id])

    console.log(id)

    // youtube setup
    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    const VideoonReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }


    return (
        <div className="container mt-4" >
            <nav aria-label="breadcrumb mt-5" >
                <ol className="breadcrumb" style={breadCrumb}>
                    <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link className="text-dark" to="/">Video playlist</Link></li>
                    <li style={activeLink} className="breadcrumb-item active" aria-current="page">videolist</li>
                </ol>
            </nav>
            {loading ? (<Loader className="text-center" type="ThreeDots" color="#3a414e" height={40} width={40} />) :
                <div className="py-5">
                    <br />
                    {videos.map((video) => {
                        return (
                            <React.Fragment>
                                <YouTube videoId={getYouTubeID(video.video_url)} opts={opts} onReady={VideoonReady} />
                                <br />
                                <p style={{color:"#3a414e"}}>{video.content}</p>
                            </React.Fragment>
                        )
                    })}
                    <br />
                </div>
            }
        </div >
    )
}
