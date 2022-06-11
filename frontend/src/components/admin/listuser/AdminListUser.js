import React, { useState, useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfo, faWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import DetailUserPopup from './detailUser/DetailUserPopup'
import ChangeUserPopup from './changeUser/ChangeUserPopup'
import { USER_UPDATE_RESET,USER_DELETE_RESET } from '../../../constants/userConstants'
import Loader from '../../loader/Loader'
import { listUsers, logout, deleteUser } from '../../../actions/userActions'


import "./AdminListUser.css"
const AdminListUser = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList
    const userUpdate = useSelector((state) => state.userUpdate)
    const { success: successUpdate} = userUpdate
    const userDelete = useSelector((state) => state.userDelete)
    const {loading: loadingDelete, success: successDelete} = userDelete
    const [showDetailUserPopup, setShowDetailUserPopup] = useState(false)
    const [showChangeUserPopup, setShowChangeUserPopup] = useState(false)
    const [clickedID, setClickedID] = useState()


    useEffect(() => {
        if (userInfo && userInfo.role === "admin") {
            dispatch(listUsers())
        } else {
            dispatch(logout())
        }
        if(successDelete){
            alert("Xóa thành công")
            dispatch({type:USER_DELETE_RESET})
        }
    }, [dispatch, userInfo, successUpdate, successDelete])

    const detailHandler = (id) => {
        setShowDetailUserPopup(!showDetailUserPopup);
        setClickedID(id);
    }
    const changeHandler = (id) => {
        setShowChangeUserPopup(!showChangeUserPopup);
        setClickedID(id);
        dispatch({ type: USER_UPDATE_RESET })
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
        {showDetailUserPopup && <DetailUserPopup id={clickedID} handleClose={detailHandler}  />}
        {showChangeUserPopup && <ChangeUserPopup id={clickedID} handleClose={changeHandler}  />}
        {(loading||loadingDelete) ? <div className="center-screen loader" ><Loader /> </div> 
            :<div className="admin-ListUser">
            {users && users.map((user) =>
                <div key={user._id} className="admin-ItemUsers">
                    <div className="item-information ">
                        <h3 className="item-email f-s-24px flex-4" disabled> {user.email}</h3>
                        <h3 className="item-name f-s-24px flex-2"> {user.name}</h3>
                        <div className="item-active flex-1">
                            <span> <b className="f-s-24px">Active: </b> {user.isActivate ? <FontAwesomeIcon className="icon-check" icon={faCheck} /> : <FontAwesomeIcon className="icon-no" icon={faTimes} />}   </span>
                        </div>

                    </div>
                    <div className="item-button">
                        <button className="btn btn-detail" onClick={()=>detailHandler(user._id)}> Chi tiết <FontAwesomeIcon className="icon icon-detail" icon={faInfo} /></button>
                        <button className="btn btn-change" onClick={()=>changeHandler(user._id)}> Sửa <FontAwesomeIcon className="icon icon-change" icon={faWrench} /></button>
                        {user.role === "admin" ?
                            <button className="btn btn-delete" disabled > Xóa <FontAwesomeIcon className="icon icon-delete" icon={faTrashAlt} /></button>
                            : <button className="btn btn-delete" onClick={()=>deleteHandler(user._id)}> Xóa <FontAwesomeIcon className="icon icon-delete" icon={faTrashAlt} /></button>
                        }
                    </div>
                </div>
            )}
            </div>
        }
        </>
    )
}

export default AdminListUser
