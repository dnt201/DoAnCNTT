import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { listProducts, deleteProduct } from '../../../actions/productActions'
import { logout } from '../../../actions/userActions'
import { PRODUCT_DELETE_RESET } from '../../../constants/productConstants'

import AddProduct from './addProduct/AddProduct'
import ChangeProduct from './changeProduct/ChangeProduct'
import Pagination from '../../../components/pagination/Pagination'
import Loader from '../../loader/Loader'
import './AdminListProduct.css'



const AdminListProduct = (props) => {

    const dispatch = useDispatch()

    const [id,setId]=useState()
    const [type,setType] = useState()


    


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userListProduct = useSelector((state) => state.productList)
    const { loading, products, count, total } = userListProduct
    const productDelete = useSelector((state) => state.productDelete)
    const { loading: loadingDelete, success: successDelete } = productDelete
    const productCreate = useSelector((state) => state.productCreate)
    const { success: successCreate } = productCreate
    const productUpdate = useSelector((state) => state.productUpdate)
    const { success: successUpdate} = productUpdate  

    const [showDetailProductPopup, setShowDetailProductPopup] = useState(false)
    const [showAddProductPopup, setShowAddProductPopup] = useState(false)
 
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9,
        total: 9,
    })
    const [filters, setFilters] = useState({
        page: pagination.page,
        category: props?.product?.name,
    })


    useEffect(() => {
        setFilters({
            ...filters,
            page: 1,
            category: props?.product?.name
        })
        setPagination({
            ...pagination,
            page: 1,
        })

    }, [props?.product?.name])
    useEffect(() => {
        if (userInfo && userInfo.role === "admin") {
            dispatch(listProducts(filters))
        } else {
            dispatch(logout())
        }
        if (successDelete) {
            alert("Xóa thành công")
            dispatch({ type: PRODUCT_DELETE_RESET, })
        }
    }, [filters, successDelete,successCreate,successUpdate])
    useEffect(() => {
        setPagination({
            ...pagination,
            total: total,
        })
    }, [userListProduct])

    const addHandler = (type) => {
        setType(type)
        setShowAddProductPopup(!showAddProductPopup)
    }

    const detailHandler = (id) => {
        setShowDetailProductPopup(!showDetailProductPopup)
        setId(id||null)
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }
    function handlePageChange(newPage) {
        setPagination({
            ...pagination,
            page: newPage
        })
        setFilters({
            ...filters,
            page: newPage,
        })
    }
    return (
        <div className="admin-list-product">
            {showAddProductPopup && <AddProduct type={type} category={props.category} handleClose={addHandler}  />}
            {showDetailProductPopup && <ChangeProduct id={id} handleClose={detailHandler}  />}
        
            {loadingDelete ?  <div className="center-screen-loader"><Loader /></div> :
                (props && props.product && props.product.id ?
                    <div>
                        <div className="lazy-header-css">
                            <div className="m-r-32px flex-1">
                                <span className="f-s-36px"><b>List product {props.product.name}</b></span>
                                {count && total ? <i>({count} of {total})</i> : <i>(Chưa có sản phẩm bạn ơi!)</i>}
                            </div>
                            <button className="add-product-btn" onClick={()=> addHandler(props.product.name) }> Thêm sản phẩm <FontAwesomeIcon className="icon icon-change" icon={faPlus} /></button>
                        </div>

                        { }
                        <div className="list-product">
                            {products && products.map((product) => (
                               
                                    <div key={product.id} className="product-item">
                                        <span className="item-name flex-4"><b>{product.name}</b></span>
                                        <img className="item-image flex-4" src={product.image} alt="tôi cũng không biết làm gì khúc này cả" />
                                        <span className="item-price flex-2">{Intl.NumberFormat('de-DE').format(product.price) + " đ"}</span>
                                        <span className="item-sale flex-1">{product.sale}%</span>
                                        {/* <button className="btn btn-detail flex-1" onClick={() => detailHandler(product.id)}> Chi tiết <FontAwesomeIcon className="icon icon-detail" icon={faInfo} /></button> */}
                                        <button className="btn btn-change flex-1" onClick={() => detailHandler(product.id)}>Xem <FontAwesomeIcon className="icon icon-change" icon={faWrench} /></button>
                                        <button className="btn btn-delete flex-1" onClick={() => deleteHandler(product.id)}>Xóa <FontAwesomeIcon className="icon icon-delete" icon={faTrashAlt} />
                                        </button>
                                    </div>

                            ))}
                        </div>
                        {count && total ? <div className="m-b-24px" > <Pagination pagination={pagination} onPageChange={handlePageChange} /></div> : <h3 className="t-a-center">(Opps!)</h3>}


                    </div> : <h1 className="center-screen">Làm gì đó đi <br /> Chọn loại sản phẩm chẳng hạn! :vvv</h1>
                )
            }

        </div>
    )
}

export default AdminListProduct
