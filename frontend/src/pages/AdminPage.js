import React, {useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faStore, faFileInvoice,faList } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import AdminListUser from '../components/admin/listuser/AdminListUser'
import AdminListProduct from '../components/admin/listproduct/AdminListProduct'
import AdminListOrder from '../components/admin/listorder/AdminListOrder'
import AdminListCategory from '../components/admin/listcategory/AdminListCategory'

import SomeThingWentWrong from '../components/somethingwentWrong/SomeThingWentWrong'
import {getAllCategories} from '../actions/categoryAction'
import './AdminPage.css'
const AdminPage = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const [active,setActive] = useState("")
    const [childrenActive,setChildrenActive] = useState()
    const [product,setProduct] = useState()
    const [saveCategory,setSaveCategory] = useState()
    const {userInfo} =userLogin
    const allCategory = useSelector((state) => state.allCategory)
    const {listCategories} =allCategory


    useEffect(() => {
        dispatch(getAllCategories());
    },[])
    const [showWhat, setShowWhat] = useState("user")
    
    const handleInput = (e) =>{
        setShowWhat(e.target.id)
    }
    
    return (
        <> { userInfo && userInfo.role==="admin" ?
        <div className="adminPage">
            <div className="nav-left-admin">
                <div className="title"><h1>Admin</h1></div>
                <button 
                    className="btn" 
                    id="user"
                    onClick ={(e) => {handleInput(e); setActive("")}}
                > 
                    <FontAwesomeIcon icon={faUsers} className="w-20p"/> User
                </button>
                <button 
                    className="btn" 
                    id="product"
                    onClick ={(e) => {handleInput(e); setActive("active") }}
                > 
                    <FontAwesomeIcon icon={faStore} className="w-20p"/>  Product
                </button>
                <ul className={"listBtnCategory "+ active}>
                    {listCategories && listCategories.map((category) => (
                        <React.Fragment key={category.id}>
                        {category.children && category.children.map((children) =>(
                          
                            <button 
                                key={children.id} 
                                className={"listBtnCategory-btn" + " " + (children.id===childrenActive && " active")}
                                onClick={()=> {
                                    setProduct(children)
                                    setSaveCategory(category) 
                                    setChildrenActive(children.id)
                                    return
                                }}
                            >
                                {children.name && children.name}</button>
                        ))}
                        </React.Fragment>
                    ))}
                </ul>
                <button 
                    className="btn" 
                    id="order"
                    onClick ={(e) => {handleInput(e); setActive("")}}
                > 
                    <FontAwesomeIcon icon={faFileInvoice} className="w-20p"/> Order 
                </button>
                <button 
                    className="btn" 
                    id="category"
                    onClick ={(e) => {handleInput(e); setActive("")}}
                > 
                    <FontAwesomeIcon icon={faList} className="w-20p"/> Category 
                </button>
            </div>
            <div className="container-right-admin">
                {showWhat === "user" ? <AdminListUser/> : ( showWhat === "product" ? <AdminListProduct category={saveCategory} product={product}/> : (showWhat==="order" ? <AdminListOrder /> : <AdminListCategory/>))
                }
            </div>

        </div> : <SomeThingWentWrong/>}
        </>
    )
}

export default AdminPage
