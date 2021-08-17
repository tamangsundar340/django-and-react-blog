import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default function Youtube() {
    // css styling
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }

    // fetch data
    // blog list
    const [videolist, setVideoList] = useState([])
    const [pageNumber, setpageNumber] = useState(0)


    useEffect(() => {
        const fetchBVideos = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/youtubevideo/`);
                setVideoList(res.data.data);
            } catch (err) {
                console.log("Something went wrong")
            }
        }
        fetchBVideos();
    }, [])


    // pagination
    const itemperPage = 12;
    const pagesVisited = pageNumber * itemperPage

    const pageCount = Math.ceil(videolist && videolist.length / itemperPage)

    const onPageChange = ({ selected }) => {
        setpageNumber(selected)
    }


    return (
        <React.Fragment>
            <div className="container mt-4">
                <nav aria-label="breadcrumb mt-5" >
                    <ol className="breadcrumb" style={breadCrumb}>
                        <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                        <li style={activeLink} className="breadcrumb-item active" aria-current="page">Video's playlist</li>
                    </ol>
                </nav>
                <div className="row py-5">

                    {videolist && videolist.slice(pagesVisited, pagesVisited + itemperPage).map((yvideo, i) => {
                        return (

                            <div className="col-lg-3 col-md-3 col-sm-6" key={i}>
                                <div className="single-recent-blog-post card-view">
                                    <div className="thumb">
                                        <Link to={`/videolist/${yvideo.slug}`} className="w-100 h-100">
                                            <img alt={yvideo.title} style={{ minWidth: "100px", maxHeight: "210px", objectFit: "cover" }} className="card-img rounded-0 w-100" src={yvideo.thumbnail} />
                                        </Link>
                                    </div>
                                    <div className="details mt-20">
                                        <Link to={`/videolist/${yvideo.slug}`}>
                                            <h3>{yvideo.title}</h3>
                                        </Link>
                                        <p>{yvideo.overview}</p>
                                    </div>
                                </div>
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
        </React.Fragment>
    )
}
