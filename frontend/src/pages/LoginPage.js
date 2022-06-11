import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/loader/Loader'

import './LoginPage.css'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    var userInformation = JSON.parse(localStorage.getItem("userInfo"));

    const userLogin = useSelector((state) => state.userLogin)

    return (
        <>{!userInformation || userLogin.isLogin ? 
            <div className="form_container">
                <form className="wrap-login flex_column_center" onSubmit={submitHandler}>
                    <span >Login</span>
                    <p><i>Welcome back to my shop!</i></p>
                    
                   {!userLogin.loading ? <> <div className="wrap_email flex_column_start w100">
                        <label className="m-b-4px">Email</label>
                        <input className="m-b-12px w100" type="email" placeholder="Enter your email address..."
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="wrap_password flex_column_start w100">
                        <label className="m-b-4px">Password</label>
                        <input className="w100 m-b-12px" type="password" placeholder="Enter your password..."
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {!userLogin.isLogin && <i className="errorLogin"><b>{userLogin.error}</b></i>}

                    <button className="login-btn" type="submit" >Login</button>

                    <p className="login-bottom-text">Don't have a account yet? <Link to="/register"> Click here to register!</Link> </p>
                    </> : <Loader/>}
                </form>
                
            </div> : document.location.href = '/user'
        }
        </>
    )
}

export default LoginPage
