import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Loader from "react-loader-spinner";

export default function Blog() {
    // some css
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }



    // Define some states
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [bloglist, setlatestBlog] = useState([])
    const [pageNumber, setpageNumber] = useState(0)


    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/blog/`);
                setlatestBlog(res.data);
            } catch (err) {
                console.log("Something went wrong")
            }
            setLoading(false)
        }
        fetchBlog();
    }, [])

    // pagination
    const itemperPage = 9;
    const pagesVisited = pageNumber * itemperPage

    const pageCount = Math.ceil(bloglist.data && bloglist.data.length / itemperPage)

    const onPageChange = ({ selected }) => {
        setpageNumber(selected)
    }

    return (
        <React.Fragment>
            <div className="mt-4 container">
                <nav aria-label="breadcrumb mt-5" >
                    <ol className="breadcrumb" style={breadCrumb}>
                        <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                        <li style={activeLink} className="breadcrumb-item active" aria-current="page">Bloglist</li>
                    </ol>
                </nav>
                {/* search input  */}
                <div className="single-footer-widget">
                    {/* <p>Stay update with our latest</p> */}
                    <div className="w-100" id="mc_embed_signup">
                        <form>
                            <div className="d-flex flex-row w-100">
                                <input onChange={event => { setSearchTerm(event.target.value) }} className="form-control bg-light w-100 rounded"  placeholder="Search query" type="text" />
                            </div>
                            <div className="info">
                            </div>
                        </form>
                    </div>
                </div>
                {loading ? (<Loader className="text-center" type="ThreeDots" color="#3a414e" height={40} width={40} />) :
                    <div className="row py-5">
                        {bloglist.data && bloglist.data.slice(pagesVisited, pagesVisited + itemperPage).filter((value) => {
                            if (searchTerm === "") {
                                return value
                            } else if (value.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return value
                            }
                        }).map((blog_list, i) => {
                            return (
                                <div className="col-lg-4 col-md-4 col-sm-6" key={i}>
                                    <div className="single-recent-blog-post card-view">
                                        <div className="thumb">
                                            <Link to={`/blog/${blog_list.slug}`} className="w-100 h-100">
                                                <img alt={blog_list.title} style={{ minWidth: "100px", maxHeight: "210px", objectFit: "cover" }} className="card-img rounded-0 w-100" src={blog_list.thumbnail} />
                                            </Link>
                                            <ul className="thumb-info">
                                                <li><Link ><i className="ti-user"></i>JustSoondar</Link></li>
                                                <li><Link ><i className="ti-time"></i>{blog_list.created_at}</Link></li>
                                            </ul>
                                        </div>
                                        <div className="details mt-20">
                                            <Link to={`/blog/${blog_list.slug}`}>
                                                <h3>{blog_list.title}</h3>
                                            </Link>
                                            <p>{blog_list.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
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
        </React.Fragment >
    )
}
