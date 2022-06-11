import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import Loader from '../../../loader/Loader'
import './DetailUser.css'
import {getUserDetails} from '../../../../actions/userActions'

const DetailUserPopup = (props) => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetail)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if (userInfo && userInfo.role === "admin") {
            dispatch(getUserDetails(props.id))
        }
    },[])

    return (
        <div className="form-detail-user">
            <div className="form-popup" id="myForm">
                <div  className="form-container mw-1000px" >
                    <h1 className="f-s-64px">Detail user</h1>
                    {loading && <Loader />}

                    <div className="item w100 m-b-8px">
                        <b>ID: </b>
                        <h6>{user._id}</h6>
                    </div>

                    <div className="item w100  m-b-8px">
                        <b>Name: </b>
                        <h6>{user.name}</h6>
                    </div>

                    <div className="item w100  m-b-8px">
                        <b>Email: </b>
                        <h6>{user.email}</h6>
                    </div>

                    <div className="item w100  m-b-8px">
                        <b>Role: </b>
                        <h6>{user.role}</h6>
                    </div>

                    <div className="item w100  m-b-8px">
                        <b>IsActive: </b>
                        <h6>{user.isActivate ? <FontAwesomeIcon className="f-s-32px cl-2ecc71" icon={faCheck} /> : <FontAwesomeIcon className="f-s-32px cl-e74c3c" icon={faTimes} />}</h6>
                    </div>

                    <div className="item w100  m-b-8px">
                        <b>Create at: </b>
                        <h6>{user.createAt}</h6>
                    </div>

                <button className="btn cancel" onClick={props.handleClose}>Close</button>
                    {error && <i className="error-message-password">{error}</i>}
                </div>
            </div>
        </div>
    )
}

export default DetailUserPopup
