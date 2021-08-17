import React, { useState, useEffect } from 'react';
import BlogSidebar from '../Component/BlogSidebar';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import BlogComment from './BlogComment';
import purify from "dompurify";
import Loader from "react-loader-spinner";

export default function BlogDetail() {
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }

    const singleBlogImg = {
        maxHeight: "350px",
        objectFit: "cover"
    }


    // blod detail
    const [blogdetail, setBlog] = useState({})
    const [blogCategories, setCategory] = useState({})
    const [loading, setLoading] = useState(false)


    const { id } = useParams()

    console.log(blogdetail.blog_lesson)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/blog/${id}/`);
                setBlog(res.data.data);
                setCategory(res.data.data.categories);

                console.log(res.data)
            } catch (err) {
                console.log("Something wrong")
            }
            setLoading(false)
        }
        fetchData();

    }, [id])

    return (
        <React.Fragment>
            <div className="container mt-4">
                <nav aria-label="breadcrumb mt-5" >
                    <ol className="breadcrumb" style={breadCrumb}>
                        <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                        <li style={activeLink} className="breadcrumb-item active" aria-current="page">Blogdetails</li>
                    </ol>
                </nav>
                {loading ? (<Loader className="text-center" type="ThreeDots" color="#3a414e" height={40} width={40} />) :
                    <div className="row py-5">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="main_blog_details">
                                <img className="img-fluid w-100" src={blogdetail.thumbnail} alt="" style={singleBlogImg} />
                                <Link><h4>{blogdetail.title}</h4></Link>
                                <div className="user_details">
                                    <div className="float-left">
                                        <Link>{blogCategories.title}</Link>
                                    </div>
                                    <div className="float-right mt-sm-0 mt-3">
                                        <div className="media">
                                            <div className="media-body">
                                                <h5>JustSoondar</h5>
                                                <p><i className="ti-time pr-2"></i>{blogdetail.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: purify.sanitize(blogdetail.content) }} />
                            </div>
                            <BlogComment />
                        </div>
                        <BlogSidebar />
                    </div>
                }
            </div>
        </React.Fragment>
    )
}
