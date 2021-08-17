import React, { useState, useEffect } from 'react';
import 'myblog/vendors/bootstrap/bootstrap.min.css';
import 'myblog/vendors/fontawesome/bootstrap.min.css';
import 'myblog/vendors/themify-icons/themify-icons.css';
import 'myblog/vendors/linericon/style.css';
import 'myblog/vendors/owl-carousel/owl.theme.default.min.css';
import 'myblog/css/style.css';
import 'myblog/css/custom.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Navbar() {
    const navbarColor = {
        // backgroundColor: "#192a42"
        boxShadow: '0 2px 4px -1px rgb(0 0 0 / 25%)',
    }

    // Navbar in mobile small devices
    const [hamMenu, sethamMenu] = useState({
        defaultButton: "navbar-toggler collapsed",
        areaExpand: false,
        defaultDiv: "navbar-collapse offset collapse",


    })
    const hamburgerMenu = () => {
        if (hamMenu.defaultButton === "navbar-toggler collapsed") {
            sethamMenu({
                defaultButton: "navbar-toggler",
                areaExpand: true,
                defaultDiv: "navbar-collapse offset collapse show"
            })
        }
        if (hamMenu.defaultButton === "navbar-toggler") {
            sethamMenu({
                defaultButton: "navbar-toggler collapsed",
                areaExpand: false,
                defaultDiv: "navbar-collapse offset collapse"
            })
        }
    }


    // Show dropdown menu on small devices
    const [menudropdown, setmenudropdown] = useState({
        defaultClass: "nav-item active submenu dropdown",
        areaExpand: false,
        dropmenu: "dropdown-menu"

    })
    const dropdownMenu = () => {
        if (menudropdown.defaultClass === "nav-item active submenu dropdown") {
            setmenudropdown({
                defaultClass: "nav-item active submenu dropdown show",
                areaExpand: true,
                dropmenu: "dropdown-menu show"
            })
        }
        if (menudropdown.defaultClass === "nav-item active submenu dropdown show") {
            setmenudropdown({
                defaultClass: "nav-item active submenu dropdown",
                areaExpand: false,
                dropmenu: "dropdown-menu"
            })
        }
    }

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


    return (
        <header className="header_area " style={navbarColor}>
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container box_1620">
                        <p class="navbar-brand logo_h pt-3">
                            <h2 className="pt-1"><span style={{ color: "#db162f" }}>ju</span>st<span style={{ fontSize: "21px" }}>Soondar</span></h2>
                        </p>
                        <button onClick={hamburgerMenu} className={hamMenu.defaultButton} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={hamMenu.areaExpand} aria-label="Toggle navigation">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <div className={hamMenu.defaultDiv} id="navbarSupportedContent">
                            <ul className="nav navbar-nav menu_nav justify-content-center">
                                <li hidden className="nav-item"><Link className="nav-link active" to="/"></Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
                                <li className={menudropdown.defaultClass}>
                                    <Link onClick={dropdownMenu} className=" text-dark nav-link dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={menudropdown.areaExpand}>Category</Link>
                                    <ul className={menudropdown.dropmenu} style={{ borderRadius: "3px" }}>
                                        {blogCategory && blogCategory.map((category, i) => {
                                            return (
                                                <li className="nav-item" key={i}>
                                                    <Link className="nav-link text-dark" to={`/category/${category.slug}`}>{category.title}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/youtube">Youtube</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                            </ul>
                            <ul className="mr-auto nav navbar-nav navbar-right navbar-social">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li>
                                <a rel="noreferrer" target="_blank" href="https://www.youtube.com/channel/UC7HiBgI4x1tJps2hQaVACtw/featured">
                                        <i className="ti-youtube"></i>
                                </a>
                                </li>
                                <li>
                                <a rel="noreferrer" target="_blank" href="www.github.com">
                                        <i className="ti-github"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
