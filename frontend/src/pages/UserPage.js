import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../actions/userActions'

import ThankForBuy from '../components/thankForBuy/ThankForBuy'
import FormChangePassword from '../components/formChangePassword/FormChangePassword'
import Loader from '../components/loader/Loader'

import moment from 'moment';

import userImg from '../images/user-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faCheck, faUnlockAlt,faInfo,faTimes,faSpinner } from '@fortawesome/free-solid-svg-icons'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


import './UserPage.css'
import { listMyOrders } from '../actions/orderActions'

const UserPage = () => {

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [showDetailOder, setShowDetailOrder] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [id,setId] = useState();

    const userInformation = useSelector((state) => state.userLogin)
    const [nameInput, setNameInput] = useState(userInformation.userInfo.name);

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { loading, error, success, userInfo } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(listMyOrders())
    }, [])

    useEffect(() => {
        if (userUpdateProfile) {
            if (success) {
                setMessage("Your profile was updated successfully!")
            }
            else if (error) {
                setMessage(error)
                setNameInput(userInformation.userInfo.name)
            }
            else {
                setMessage("")
            }
        }
    }, [userUpdateProfile, error, success, userInfo])

    const handleClick = () => {
        setIsEdit(!isEdit);
    }
    const togglePopupChangePassword = () => {
        setIsChangePassword(!isChangePassword);
    }
    const handleSubmit = (e) => {
        handleClick()
        e.preventDefault()
        dispatch(updateUserProfile(nameInput))
    }

    return (
        <>
         {showDetailOder && <ThankForBuy handleClose={() => setShowDetailOrder(!showDetailOder)} id={id} />}
            {userInformation ?
                <div className="user-page">
                    {loading && <Loader />}
                    <div className="container-user-information">
                        <div className="user-avatar-name">
                            <img className="avatar center_w50 m-b-8px" src={userImg}
                                alt="cc" />
                            <input className="name f-s-28px w-100p" value={nameInput}
                                disabled={!isEdit}
                                onChange={(e) => setNameInput(e.target.value)}
                            ></input>
                            <div className="wrap-button-user">
                                <button className="btn-sua-thong-tin"
                                    disabled={isEdit}
                                    onClick={handleClick}>Sửa thông tin <FontAwesomeIcon className="icon-sua-thong-tin" icon={faWrench} />
                                </button>
                                <button className="btn-luu-thong-tin"
                                    disabled={!isEdit}
                                    onClick={handleSubmit}>Lưu thông tin <FontAwesomeIcon className="icon-luu-thong-tin" icon={faCheck} />
                                </button>
                            </div>
                            <button className="btn-doi-mat-khau"
                                onClick={togglePopupChangePassword}>Đổi mật khẩu  <FontAwesomeIcon className="icon-doi-mat-khau" icon={faUnlockAlt} />
                            </button>
                        </div>
                        <div className="user-information">

                            <h1 className="title f-s-48px t-a-center"> Thông tin </h1>
                            <div className="flex-column">
                                {!userInformation.userInfo.isActivate && <i className="red_16px_bold_m-t-4px">Tài khoản của bạn chưa được kích hoạt, vui lòng check mail: {userInformation.userInfo.email} để kích hoạt!  (Nếu bạn đã kích hoạt, vui lòng đăng xuất và sau đó đăng nhập lại để hệ thống reset!) </i>}
                                <div className="user-name w-100p">
                                    {userInformation.userInfo && userInformation.userInfo.role === "admin" && <span className="f-s-28px w-100p">Hello admin!</span>}<br />
                                    <span className="f-s-28px">Tài khoản: </span>
                                    <span className="f-s-24px w-100p">{userInformation.userInfo.email}</span>
                                </div>

                                <i className="red_16px_bold_m-t-4px">{message}</i>
                            </div>
                        </div>
                    </div>
                    {userInformation.userInfo && userInformation.userInfo.role === "admin" ? null : <>
                        <h1 className="f-s-48px t-a-center"> Các đơn đã mua</h1>
                        <div className="listBill m-t-16px w-98p p-lr-8px">
                            {orderListMy && orderListMy.orders !== undefined && orderListMy.orders.order && orderListMy.orders.order.map((item) => (
                                <div key={item._id} className="details-bill">
                                    <div className="lazy-res">
                                        <span className="flex-2"><b>Mã hóa đơn:</b>{item._id}</span>
                                        <span className="flex-1"><b>Ngày mua:</b>{moment(item.createAt).format("ll")} </span>
                                        <span className="flex-1"><b>Tổng tiền</b>:{Intl.NumberFormat('de-DE').format((item.totalPrice)) + " đ"}</span>
                                    </div>
                                    <div className="lazy-right">
                                    <span className="flex-1"><b>Tình trạng: </b>{item.orderStatus && item.orderStatus==="Canceled" ?
                                        <span className="canceled">Canceled <FontAwesomeIcon icon={faTimes} /></span> : (item.orderStatus==="Processing" ? 
                                        
                                        <span className="processing">Processing <FontAwesomeIcon icon={faSpinner} /></span> :
                                        
                                        <span className="delivered">Delivered <FontAwesomeIcon icon={faCheck} /></span>) 
                                    }</span>
                                    <button className="btn-detail" 
                                        onClick={()=>{
                                            setId(item._id);
                                            setShowDetailOrder(!showDetailOder);
                                        }}
                                    >Details <FontAwesomeIcon icon={faInfo} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>}
                    {isChangePassword && <FormChangePassword handleClose={togglePopupChangePassword} />}
                </div>
                : document.location.href = '/login'
            }
        </>
    )
}

export default UserPage
