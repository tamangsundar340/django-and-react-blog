import React from 'react'

export default function Footer() {
    const getYear = () => {
        return new Date().getFullYear();
    }

    const handleSubmit = (Event) =>{
        Event.preventDefault()
    }

    return (
        <footer className="footer-area section-padding mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4  col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h6>About me</h6>
                            <p>
                                Welcome to JustSoondar site, you will find different types of artiles and videos related to web development and Data sciene.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4  col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h6>Newsletter</h6>
                            <p>Stay update with our latest</p>
                            <div className="" id="mc_embed_signup" onSubmit={handleSubmit}>
                                <form >
                                    <div className="d-flex flex-row">
                                        <input className="form-control bg-light" name="email" placeholder="Enter Email" required="" type="email" />
                                        <button className="click-btn btn btn-default"><span className="lnr lnr-arrow-right text-light" ></span></button>
                                        <div style={{ position: "absolute", left: "-5000px" }}>
                                            <input name="" tabIndex="-1" value="" type="text" />
                                        </div>
                                    </div>
                                    <div className="info"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h6>Follow Us</h6>
                            <p>Let us be social</p>
                            <div className="footer-social d-flex align-items-center">
                                <a rel="noreferrer" target="_blank" href="https://www.facebook.com/profile.php?id=100008481586016">
                                    <i className="ti-facebook"></i>
                                </a>
                                <a rel="noreferrer" target="_blank" href="https://www.instagram.com/soondartamang/">
                                    <i className="ti-instagram"></i>
                                </a>
                                <a rel="noreferrer" target="_blank" href="https://www.youtube.com/channel/UC7HiBgI4x1tJps2hQaVACtw/featured">
                                    <i className="ti-youtube"></i>
                                </a>
                                <a rel="noreferrer" target="_blank" href="www.github.com">
                                    <i className="ti-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
                    <p className="footer-text m-0">
                        Copyright © {getYear()} All rights reserved | JustSoondar
                    </p>
                </div>
            </div>
        </footer>
    )
}
