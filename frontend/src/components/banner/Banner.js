import React from 'react'
import backgroundImage from './background.jpg';

import {Link} from 'react-router-dom'



import './Banner.css'

const Header = () => {

    return (
        <header style={{
            backgroundImage: `url(${backgroundImage})`,
        }}>
            <div className="title">
                <h1 >Welcome to our shop!</h1>
                <p>Ưu đãi hấp dẫn dành cho mọi thành viên.</p>
                <Link to="/register" className="regisNow m-t-8px">Đăng ký ngay</Link>
            </div>
        </header>
    )
}

export default Header
