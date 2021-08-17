import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function BlogSidebar() {

    // fetch category
    const [blogCategory, setCategory] = useState([])


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/category/`);
                setCategory(res.data.data);
            } catch (err) {
                console.log("Something went wrong")
            }
        }
        fetchCategory();

    }, [])


    // fetch trednding blogs
    const [trendingblog, setTrendingBlog] = useState([])

    useEffect(() => {
        const fetchTrendingBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/trendingblog/`);
                setTrendingBlog(res.data.data);
            } catch (err) {
                console.log("Something went wrong")
            }
        }
        fetchTrendingBlog();

    }, [])

    return (
        <div className="col-lg-4 col-md-4 col-sm-12 sidebar-widgets">
            <div className="widget-wrap">
                <div className="single-sidebar-widget post-category-widget">
                    <h4 className="single-sidebar-widget__title">Catgory</h4>
                    <ul className="cat-list mt-20">
                        {blogCategory && blogCategory.map((category, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/category/${category.slug}`} className="d-flex justify-content-between">
                                        <p>{category.title}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="single-sidebar-widget popular-post-widget">
                    <div className="col-lg-4">

                    </div>
                    <div className="col-lg-8">

                    </div>
                    <h4 className="single-sidebar-widget__title">Popular Post</h4>
                    <div className="popular-post-list">
                        <div className="single-post-list row">
                            {trendingblog && trendingblog.map((trending_blog, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <div className="thumb col-lg-4 col-md-4 col-sm-4 col-xs-4 pb-3">
                                            <img style={{height:"70px", objectFit:"cover", width:"100%"}} className="card-img img-fluid rounded-3" src={trending_blog.thumbnail} alt={trending_blog.title} />
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                            <Link to={`/blog/${trending_blog.slug}`}>
                                                <h6><Link className="text-dark" to={`/blog/${trending_blog.slug}`}>{trending_blog.title}</Link></h6>
                                            </Link>
                                            <ul className="thumb-info rounded-2">
                                                <li><Link to={`/blog/${trending_blog.slug}`}>JustSoondar</Link></li>
                                                <li><Link to={`/blog/${trending_blog.slug}`}>{trending_blog.created_at}</Link></li>
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
