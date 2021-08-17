import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Contact() {
    const activeLink = {
        color: "#db162f"
    }
    const breadCrumb = {
        backgroundColor: "#fff"
    }

    // Fetch contact data
    const [contact, setContact] = useState([])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}clientapi/contact/`);

                setContact(res.data.data[0]);

            } catch (err) {
                console.log("Something went wrong")
            }
        }
        fetchBlog();
    }, [])



    // Sent message
    const [btnset, btnSet] = useState({
        btnDisabled: true,
    })

    const [showMessage, setMessage] = useState(false)

    const [contactData, setContactData] = useState({
        fullname: "",
        email: "",
        subject: "",
        message: ""
    })


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}clientapi/contactmessage/`, contactData);
            btnSet(true)
            setMessage(true)
            setTimeout(function () {  setMessage(false) }, 3000);
            document.getElementById("contactForm").reset()

        } catch (err) {
            console.log(err)
        }
    }
    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value
        })

        if (contactData.fullname !== "" && contactData.email !== "" && contactData.subject !== "" && contactData.message !== "") {
            btnSet({ btnDisabled: false })
        } else {
            btnSet({ btnDisabled: true })
        }
    }


    return (
        <React.Fragment >
            <section className="section-margin--small">
                <div className="container mt-4">
                    {/* message sent success message */}
                    {showMessage && (
                        <div className="alert alert-success" role="alert">
                            Thank you your message has been sent ! 
                        </div>
                    )}
                    <nav aria-label="breadcrumb mt-5">
                        <ol className="breadcrumb" style={breadCrumb}>
                            <li className="breadcrumb-item"><Link className="text-dark" to="/">Home</Link></li>
                            <li style={activeLink} className="breadcrumb-item active" aria-current="page">Contact</li>
                        </ol>
                    </nav>
                    <div className="row py-5">
                        <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-home"></i></span>
                                <div className="media-body">
                                    <h3>Kathmandu, Nepal</h3>
                                    <p>{contact.address}</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-headphone"></i></span>
                                <div className="media-body">
                                    <h3><a href="tel:9813210393">{contact.phone_number}</a></h3>
                                    <p>Mon to Fri 9am to 6pm</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-email"></i></span>
                                <div className="media-body">
                                    <h3><a href="mailto:justsoondar3740@gmail.com">{contact.email}</a></h3>
                                    <p>Send me your query anytime!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <form onSubmit={handleSubmit} id="contactForm">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <input onChange={handleChange} className="form-control" name="fullname" id="fullname" type="text" placeholder="Enter your name" required />
                                        </div>
                                        <div className="form-group">
                                            <input onChange={handleChange} className="form-control" name="email" id="email" type="email" placeholder="Enter email address" required />
                                        </div>
                                        <div className="form-group">
                                            <input onChange={handleChange} className="form-control" name="subject" id="subject" type="text" placeholder="Enter Subject" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="form-group">
                                            <textarea onChange={handleChange} className="form-control different-control w-100" name="message" id="message" required cols="30" rows="5" placeholder="Enter Message"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center text-md-right mt-3">
                                    <button disabled={btnset.btnDisabled} type="submit " className="btn btn-danger rounded-0">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
