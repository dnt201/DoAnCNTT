import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {createCategory} from '../../../../actions/categoryAction'
import Loader from '../../../loader/Loader'

import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../../../../firebase"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {CATEGORY_CREATE_RESET} from '../../../../constants/categoryConstants'

import './AddCategory.css'

const AddCategory = (props) => {

    const dispatch = useDispatch()

    const [selectedImage, setSelectedImage] = useState();
    const [nameCategory, setNameCategory] = useState();
    const createCategoryState = useSelector((state) => state.createCategory)
    const {loading,error,success} = createCategoryState


    useEffect(() => {
        dispatch({type:CATEGORY_CREATE_RESET})
    },[])


    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (props ===null || props === undefined) return;
        else if (props.type === "addCategory") {
            uploadFiles(selectedImage,"addCategory",nameCategory,"")
        }
        else{
            uploadFiles(selectedImage,props.type,nameCategory,"/"+props.type)
        }
    }
    const uploadFiles = (file,type,nameCategory,parent) => {
        if (!file) return;
        const storageRef = ref(storage, `/doancntt/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => { },
            (error) => { alert("lỗi", JSON.stringify(error)) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    let images = url
                    if(type==="addCategory") dispatch(createCategory(nameCategory,parent,images))
                    else dispatch(createCategory(nameCategory,parent,images))
                })
            }
        );
    };


    return (
        <div className="add-category-container">
            <div className="add-category-wrap">

                <div className="left-side"><button onClick={props.handleClose}><FontAwesomeIcon icon={faTimes} /></button></div>
                {props.type === "addCategory" ?
                    <h1 className="t-a-center">Add new category</h1> :
                    <h1 className="t-a-center">Add child category of {props.type}</h1>
                }
                {success && success===true && <h4 className="t-a-center m-b-16px cl-red"><i>Thêm thành công!</i></h4>}
                {error&& <h4 className="cl-red">{error}</h4>}
                {loading && <div className="loader-center-screen"><Loader/></div>}
                {props.type !== "addCategory" &&
                    <><span>Parent: {props.type}</span><br /></>
                }
                <form  onSubmit={(e) => handleAdd(e)}>
                    <span>Name category: </span>
                    <input type="text" className="" 
                        required
                        defaultValue={nameCategory}
                        onChange={(e) =>setNameCategory(e.target.value)}
                    /><br />

                    <div>
                        <span>Images: </span>
                        <input
                            // disabled={!isEdit}
                            accept="image/*"
                            type="file"
                            onChange={imageChange}
                            required
                        /><br />
                        {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="image-previews" alt="Pumb" />}
                    </div>
                    <button className="m-t-8px w-100p btn-add" type="submit">Add</button>
                </form>
                
            </div>
        </div>
    )
}

export default AddCategory
