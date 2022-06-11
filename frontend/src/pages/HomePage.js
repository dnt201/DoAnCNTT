import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../components/banner/Banner'
import Policy from '../components/policy/Policy'
import { Link } from 'react-router-dom'


import './HomePage.css'

const HomePage = () => {
    return (
        <div>
            <Banner />
            <div className="flex_column_center w100">
                <h1 className="button mt_16px mb_16px ">Laptop</h1>
                <Link to="/Laptop" className="pd_1628 mb_16px bg_gray white btnHomePage">Details</Link>
                <video className="w100" autoPlay="autoPlay" loop="loop" muted="muted"
                    src="https://thenewxgear.com/wp-content/uploads/2021/10/Dell-Alienware.mp4">
                </video>
            </div>
            <div className="flex_column_center bg_gray mb_36px">
                <h1 className="white mt_16px mb_16px ">MONITOR</h1>
                <div className="flex_row_center">
                    <img className="w35"
                        src="https://www.benq.com/content/dam/b2c/en/monitors/photographer-monitor-pd-series/pd3220u/gallery/04-pd3220u-right45-new-stand-2108.png"
                        alt="" />
                    <img className="w35"
                        src="https://ae01.alicdn.com/kf/H15ea9ee750c0435f8ecf461bbaf4fd24y/2K-resolution-curved-led-lcd-pc-gaming-screen-75hz-24-inch-monitor-retailing.png_.webp"
                        alt="" />
                </div>
                <Link to="/Monitor" className="pd_1628 mb_36px bg_white btnHomePage">Details</Link>
            </div>
            <Policy show={true} />

           
        </div>
    )
}

export default HomePage
