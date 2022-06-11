import React from 'react'

import { Link  } from 'react-router-dom'

import './BtnListItem.css'

const BtnListItem = (props) => {
    return (
        <Link to={props.path} className="item">
            <h1>{props.name}</h1>
            <img src={props.img} alt=""/>
        </Link>
    )
}

export default BtnListItem
