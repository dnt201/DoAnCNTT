import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../loader/Loader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { getUserDetails } from '../../../../actions/userActions'

import { USER_UPDATE_RESET } from '../../../../constants/userConstants'

import { updateUser } from '../../../../actions/userActions'
import './ChangeUserPopup.css'

const ChangeUserPopup = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [role, setRole] = useState(null)
    const [message, setMessage] = useState(null)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector((state) => state.userDetail)
    const { loading, error, user } = userDetails
    const userUpdate = useSelector((state) => state.userUpdate)

    useEffect(() => {
        dispatch({ type: USER_UPDATE_RESET })
        if (userInfo && userInfo.role === "admin") {
            dispatch(getUserDetails(props.id))
        }
    }, [])

    useEffect(() => {
        if (userUpdate.error) {
            setMessage(userUpdate.error)
            setName(user.name)
        } else if (userUpdate.success) {
            setMessage("Update thành công!")
            dispatch(getUserDetails(props.id))
        }
    }, [userUpdate.error, userUpdate.success])

    useEffect(() => {
        setEmail(user.email)
        setName(user.name)
        setRole(user.role)
    }, [user])

    const handleOptionChange = (e) => {
        setRole(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(props.id, email, name, role))
    }
    return (
        <div className="form-change-user">
            <div className="form-popup" id="myForm">
                <div className="form-container mw-1000px miw-640px">
                    <h1 className="f-s-64px">Change User <br /> <b className="f-s-28px">{user._id} </b></h1>
                    {(loading || userUpdate.loading) && <Loader />}
                    <div className="item w100  m-b-8px">
                        <b className="flex-1">Email: </b>
                        <input className="w100 m-b-12px flex-3 pd-bt-0px f-s-24px " type="email" placeholder="Enter email..."
                            required
                            value={email||null}
                            onChange={e => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="item w100  m-b-8px">
                        <b className="flex-1">Name: </b>
                        <input className="w100 m-b-12px flex-3 pd-bt-0px f-s-24px " type="text" placeholder="Enter name..."
                            required
                            value={name||null}
                            onChange={e => setName(e.target.value)}


                        />
                    </div>
                    <div className="item w100  m-b-8px">
                        <b className="flex-1">Role: </b>
                        <div className="flex-3">
                            <input
                                type="radio"
                                value="user"
                                name="role"
                                className="role"
                                id="userChoice"
                                checked={role === "user"}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="userChoice" className="role">User</label>

                            <input
                                type="radio"
                                value="admin"
                                id="adminChoice"
                                name="role"
                                className="role"
                                checked={role === "admin"}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="adminChoice">Admin</label>
                        </div>
                    </div>
                    <button className="btn m-t-8px" onClick={onSubmitHandler} >Change</button>
                    <button type="button" className="btn cancel" onClick={props.handleClose } >Close</button>
                    {error && <i className="error-message-password">{error}</i>}
                    {message && <i className="error-message-password">{message}</i>}
                </div>

                onClick={}
            </div>
        </div>
    )
}

export default ChangeUserPopup
