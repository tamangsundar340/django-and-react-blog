import React from 'react'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'

export default function Layout(props) {
    return (
        <div>
            <Navbar />
            {props.children}
            
            <Footer />
        </div>
    )
}
