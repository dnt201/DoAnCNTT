import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateCategory } from '../../../../actions/categoryAction'
import Loader from '../../../loader/Loader'

import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../../../../firebase"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { CATEGORY_UPDATE_RESET } from '../../../../constants/categoryConstants'
import './UpdateCategory.css'

const UpdateCategory = (props) => {
    const dispatch = useDispatch()

    const [selectedImage, setSelectedImage] = useState();
    const [nameCategory, setNameCategory] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const updateCategoryState = useSelector((state) => state.updateCategory)
    const { loading, success, error } = updateCategoryState
    useEffect(() => {
        dispatch({ type: CATEGORY_UPDATE_RESET })
    }, [])

    useEffect(() => {
        setNameCategory(props.name)
    }, [error])

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEdit(!isEdit);
        if ((nameCategory === undefined || nameCategory === props.name) && (selectedImage === undefined))
            alert("Không có gì thây đổi")
        else uploadFiles(selectedImage, props.id, nameCategory)

    }
    const uploadFiles = (file, id, name) => {
        if (!file) {
            dispatch(updateCategory(id, name, props.image))
        }
        else {
            const storageRef = ref(storage, `/doancntt/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => { },
                (error) => { alert("lỗi", JSON.stringify(error)) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        let image = url
                        dispatch(updateCategory(id, name, image))

                    })
                }
            );
        }
    };
    const handleUpdate = () => {
        setIsEdit(!isEdit);
    }



    return (
        <div className="update-category-container">
            <div className="update-category-wrap">
                <div className="left-side"><button onClick={props.handleClose}><FontAwesomeIcon icon={faTimes} /></button></div>
                {props.type === undefined ? <h1 className="t-a-center">Update category {props.name}</h1> :
                    <h1 className="t-a-center">Update child category of {props.type}</h1>
                }

                {success && success === true && <h4 className="t-a-center m-b-16px cl-red"><i>Sửa thành công!</i></h4>}
                {error && <h4 className="cl-red">{error}</h4>}
                {loading && <div className="loader-center-screen"><Loader /></div>}
                {props.type === undefined ? null : <><span>Parent: {props.type}</span><br /></>}

                <form onSubmit={(e) => handleSave(e)}>
                    <span>Name category: </span>
                    <input type="text" className=""
                        disabled={!isEdit}
                        defaultValue={props.name}
                        required
                        onChange={(e) => setNameCategory(e.target.value)}
                    /><br />

                    <div>
                        <span>Images: </span>
                        <input
                            disabled={!isEdit}
                            accept="image/*"
                            type="file"
                            onChange={imageChange}
                        /><br />
                        {selectedImage ? <img src={URL.createObjectURL(selectedImage)} className="image-previews" alt="Pumb" /> :
                            (props.image && <img src={props.image} className="image-previews" alt="Pumb" />)
                        }
                    </div>
                    <div className="wrap-button">
                        <button className="m-t-8px btn-change btn" type="button" onClick={handleUpdate} disabled={isEdit}>Sửa</button>
                        <button className="m-t-8px btn-save btn" type="submit" disabled={!isEdit}>Lưu</button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default UpdateCategory
