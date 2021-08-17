import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


export default function VideoList() {
    // css styling
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }

    // Fetch videos
    const { id } = useParams()
    const history = useHistory();

    const [videos, setVideos] = useState([])
    const [pageNumber, setpageNumber] = useState(0)

    useEffect(() => {

        const fetchVideos = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/youtubevideo/${id}/`);
                setVideos(res.data.data.video_serializer)

            } catch (err) {
                console.log("something wrong")
            }
        }

        fetchVideos()

    }, [id])


    // pagination
    const itemperPage = 12;
    const pagesVisited = pageNumber * itemperPage

    const pageCount = Math.ceil(videos && videos.length / itemperPage)

    const onPageChange = ({ selected }) => {
        setpageNumber(selected)
    }



    return (
        <div className="container mt-4">
            <nav aria-label="breadcrumb mt-5" >
                <ol className="breadcrumb" style={breadCrumb}>
                    <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link className="text-dark" onClick={() => history.goBack()}>Video playlist</Link></li>
                    <li style={activeLink} className="breadcrumb-item active" aria-current="page">videolist</li>
                </ol>
            </nav>
            <div className="py-5 row">
                {videos && videos.slice(pagesVisited, pagesVisited + itemperPage).map((video, i) => {
                    return (
                        <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 p-3" key={i}>
                            <p className="text-center">
                                <Link target="__blank" to={`/video/${video.slug}`}>
                                <span className="badge badge-pill badge-dark p-2 rounded-0">{video.title}</span>
                                </Link>
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <nav className="blog-pagination justify-content-center d-flex">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={onPageChange}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttns"}
                            nextLinkClassName={"nextBttns"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        ></ReactPaginate>
                    </nav>
                </div>
            </div>
        </div>

    )
}
