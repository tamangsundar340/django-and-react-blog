import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BlogComment() {

    // Fetch comments and buttin disabled 
    const [blogdetail, setBlog] = useState({})
    const [status, setStatus] = useState()
    const [visible, setVisible] = useState(2)


    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/blog/${id}/`);
                setBlog(res.data.data);
            } catch (err) {
                console.log("Something wrong")
            }
        }
        fetchData();

    }, [id])


    const countComent = () => {
        return blogdetail.blog_comment && blogdetail.blog_comment.length;
    }

    const [btnset, btnSet] = useState({
        btnDisabled: true,
    })


    // Handle forms
    const [commentBlog, setcommentBlog] = useState({
        blog: id,
        user: "",
        email: "",
        text: "",
    })

    const handleChange = (event) => {
        setcommentBlog({
            ...commentBlog,
            [event.target.name]: event.target.value
        })
        if (commentBlog.user !== "" && commentBlog.email !== "" && commentBlog.text !== "" && commentBlog.blog !== "") {
            btnSet({ btnDisabled: false })
        } else {
            btnSet({ btnDisabled: true })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}clientapi/blogcomment/`, commentBlog);
            setStatus(true)
            btnSet(true)
            console.log("Comment sent to backend")
        } catch (err) {
            console.log(err)
            console.log("Comment not successfull")
        }
    }
    if (status) {
        return <BlogComment />
    }

    // blog comment visible  and not visible
    const showMoreComment = () =>{
        setVisible((prevValue) => prevValue +2)
    }



    return (
        <React.Fragment>
            <div className="comments-area">
                <h4> {countComent()} Comments</h4>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="desc" >
                                {blogdetail.blog_comment && blogdetail.blog_comment.slice(0,visible).map((blog, i) => {
                                    return (
                                        <div key={i}>
                                            <h5><Link>{blog.user}</Link></h5>
                                            {/* <p className="date">{blog.created_at}</p> */}
                                            <p className="comment">
                                                {blog.text}
                                            </p>
                                            <br />
                                        </div>
                                    )
                                })}
                                {blogdetail.blog_comment && blogdetail.blog_comment.length >3 ? 
                                <button onClick ={showMoreComment} className="btn btn-info btn-sm">Load more</button>
                                :null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-list left-padding">
                </div>
            </div>
            <div className="comment-form">
                <h4>Leave a Reply</h4>
                <small className="text-muted">We will not share your information</small>
                <div className="p-2">
                    <p>Comment Rules</p>
                    <div className="row">
                        <div className="col-lg-6">
                            <small className="text-muted">Do not post adult/illegal links</small>
                            <br />
                            <small className="text-muted">Your comment should be based on topic</small>
                        </div>
                        <div className="col-lg-6">
                            <small className="text-muted">Do not post other website links which are useless</small>
                            <br />
                            <small className="text-muted">Do not use abusive language</small>
                        </div>
                    </div>
                </div>
                <form className="pt-4" onSubmit={handleSubmit}>
                    <div className="form-group form-inline">
                        <div className="form-group col-lg-6 col-md-6 name">
                            <input onChange={handleChange} name="user" type="text" className="form-control" id="user" placeholder="Enter Name" onfocus="this.placeholder = ''" onBlur="this.placeholder = 'Enter Name'" />
                        </div>
                        <div className="form-group col-lg-6 col-md-6 email">
                            <input onChange={handleChange} name="email" type="email" className="form-control" id="email" placeholder="Enter email address" onfocus="this.placeholder = ''" onBlur="this.placeholder = 'Enter email address'" />
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea onChange={handleChange} name="text" className="form-control mb-10" rows="5" placeholder="Enter a comment" onfocus="this.placeholder = ''" onBlur="this.placeholder = 'Messege'" required=""></textarea>
                    </div>
                    {/* button submit_btn text-light */}
                    <button className="btn btn-danger rounded-0" type="submit" disabled={btnset.btnDisabled}>Post Comment</button>
                </form>
            </div>
        </React.Fragment>
    )
}
