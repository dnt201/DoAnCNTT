import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserPassword } from '../../actions/userActions'
import Loader from '../loader/Loader'
import { USER_UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

import './FormChangePassword.css'

const FormChangePassword = (props) => {
    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const userUpdatePassword = useSelector((state) => state.userUpdatePassword)
    const { loading, error, success } = userUpdatePassword

    useEffect(() => {
        dispatch({ type: USER_UPDATE_PASSWORD_RESET })
    }, [])

    useEffect(() => {
        if (userUpdatePassword) {
            if (success) {
                setMessage("Password was changed!")
            }
            else if (error) {
                setMessage(error)
            }
            else{
                setMessage("")
                setOldPassword("")
                setPassword("")
            }   setConfirmPassword("")
        }
    }, [userUpdatePassword,error,success])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage('')
            dispatch(updateUserPassword(oldPassword, password, confirmPassword))
        }
    }

    return (
        <div className="container-change-password">
            <div className="form-popup" id="myForm">
                <form  className="form-container" onSubmit={onSubmitHandler}>
                    <h1 className="f-s-64px">Change Password</h1>
                    {loading && <Loader />}
                    <div>
                        <label htmlFor="oldPassWord"><b>Old Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter old PassWord"
                            name="oldPassWord"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassWord"><b>New Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="newPassWord"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassWord"><b>Confirm Password</b></label>
                        <input
                            type="password"
                            placeholder="Confirm PassWord"
                            name="confirmPassWord"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {userUpdatePassword && <i className="error-message-password"><b>{message}</b></i>}
                    
                    <button type="submit" className="btn m-t-8px" >Change</button>
                    <button className="btn cancel" onClick={props.handleClose} >Close</button>
                </form>
            </div>
        </div>
    )
}

export default FormChangePassword
