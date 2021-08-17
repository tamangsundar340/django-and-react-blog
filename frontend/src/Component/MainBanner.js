import React from 'react'

export default function MainBanner() {
    const styleColor  = {
        color :'#3a414e',
    }

    return (
        <div className="hero-banner" style={{backgroundColor :"#fff"}}>
            <div className="hero-banner__content">
                <h3 style={styleColor}>JustSoondar</h3>
                <br />
                <a rel="noreferrer" className="button text-light" target="_blank" href="https://www.youtube.com/channel/UC7HiBgI4x1tJps2hQaVACtw/featured"><b>Youtube channel</b></a>
            </div>
        </div>
    )
}
