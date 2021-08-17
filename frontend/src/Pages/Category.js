import React, { useState, useEffect } from 'react';
import BlogSidebar from '../Component/BlogSidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default function Category() {
    // some css
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }
    var imgHeight = {
        maxHeight: "210px",
        objectCover: "fit",
    }

    // Some state
    const [blogCategory, setCategory] = useState([])
    const [pageNumber, setpageNumber] = useState(0)

    const { id } = useParams()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/category/${id}/`);
                setCategory(res.data.data);
            } catch (err) {
                console.log("Something went wrong")
            }
        }
        fetchCategory();

    }, [id])


    // pagination
    const itemperPage = 6;
    const pagesVisited = pageNumber * itemperPage

    const pageCount = Math.ceil(blogCategory.blog_serializer && blogCategory.blog_serializer.length / itemperPage)

    const onPageChange = ({ selected }) => {
        setpageNumber(selected)
    }


    return (
        <React.Fragment>
            <div className="mt-4 container">
                <nav aria-label="breadcrumb mt-5" >
                    <ol className="breadcrumb" style={breadCrumb}>
                        <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                        <li style={activeLink} className="breadcrumb-item active" aria-current="page">Categories</li>
                    </ol>
                </nav>
                <div className="row py-5">
                    <div className="col-lg-8">
                        <div className="row">
                            {blogCategory.blog_serializer && blogCategory.blog_serializer.slice(pagesVisited, pagesVisited + itemperPage).map((blogcategory, i) => {
                                return (
                                    <div className="col-md-6" key={i}>
                                        <div className="single-recent-blog-post card-view">
                                            <div className="thumb">
                                                <Link to={`/blog/${blogcategory.slug}`}>
                                                    {/* http://localhost:8000/ */}
                                                    <img alt={blogcategory.title} style={imgHeight} className="card-img rounded-0" src={"http://localhost:8000" + blogcategory.thumbnail} />
                                                </Link>
                                                <ul className="thumb-info">
                                                    <li><Link><i className="ti-user"></i>JustSoondar</Link></li>
                                                    <li><Link><i className="ti-time"></i>{blogcategory.created_at}</Link></li>
                                                </ul>
                                            </div>
                                            <div className="details mt-20">
                                                <Link to={`/blog/${blogcategory.slug}`}>
                                                    <h3>{blogcategory.title}</h3>
                                                </Link>
                                                <p>{blogcategory.overview}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <BlogSidebar />
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
