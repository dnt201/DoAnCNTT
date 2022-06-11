import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'

import Rating from '../components/rating/Rating'
import Loader from '../components/loader/Loader'
import Policy from '../components/policy/Policy'
import ChangeProduct from '../components//admin/listproduct/changeProduct/ChangeProduct'

import { productDetails, 
    createProductReview,
    deleteProductReview,
    deleteAdminProductReview } from '../actions/productActions'
import {addToCart} from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DELETE_REVIEW_RESET } from '../constants/productConstants'

import './DetailProductPage.css'

const DetailProductPage = () => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [detailProduct,setDetailProduct] = useState(false)
    const productState = useSelector((state) => state.productDetails)
    const { loading, product } = productState

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productUpdate = useSelector((state) => state.productUpdate)
    const {success: successUpdate} = productUpdate
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    const productReviewDelete = useSelector((state) => state.productReviewDelete)
    const {
        success: successDeleteProductReview,
        loading: loadingDeleteProductReview,
        error: errorDeleteProductReview,
    } = productReviewDelete
    let params = useParams()

    useEffect(() => {
        window.scrollTo(0, 0);
        setMessage('')
    }, [])

    useEffect(() => {
        if (errorProductReview) {
            setMessage(errorProductReview)
        }
        if (errorDeleteProductReview) {
            setMessage(errorDeleteProductReview)
        }
        if (successProductReview) {
            setRating(0)
            setComment('')
            setMessage("Thêm nhận xét thành công!")
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        if (successDeleteProductReview){
            setMessage("Xóa nhận xét thành công!")
            dispatch({ type:   PRODUCT_DELETE_REVIEW_RESET })
        }
        dispatch(productDetails(params.id))
    }, [params, successProductReview,successDeleteProductReview,successUpdate])

    const handleDetails = () => {
        setDetailProduct(!detailProduct)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (rating === 0) {
            alert("Vui lòng chọn mức độ của sản phẩm!")
        }
        else if (comment === "") {
            alert("Vui lòng nhập đánh giá của bạn")
        }
        else {
            dispatch(createProductReview(params.id, rating, comment))
        }
    }
    const deleteReviewHandle = () => {
        dispatch(deleteProductReview(params.id))
    }
    const deleteAdminReviewHandle =(id) => {
        dispatch(deleteAdminProductReview(params.id,id))
    }
    const handleAddToCart = (product_id,flag) => {
        if(qty<=0) {
            alert("Bạn làm gì dzay? số lượng phải >= 1 chứ!!! :<<<<")
        }
        else {
            dispatch(addToCart(product_id,parseInt(qty),flag))
            alert(typeof parseInt(qty))
        }
    }

    return (
        <div className="detail-product-page-container">
            {detailProduct &&<ChangeProduct id={params.id} handleClose={handleDetails}/>}
            {loading ? <div className="loader_center"><Loader /></div>
                :
                <div className="product-detail">
                    <div className="product-detail-left loader_center">
                        <img src={`${product.images}`} alt="123" />
                    </div>
                    <div className="product-detail-right">
                        <h1 className="name">{product.name}  {product.sale!==0 && ("(Giảm "+product.sale+"%)")}</h1>
                        <Rating value={product.ratings} text={" " + product.reviews.length + " lượt bình chọn"} />
                        <p className="des"> {product.description} </p>
                        <div className="status-quantity-price">
                            <div className="status-quantity">
                                <div className="status">
                                    {product.stock !== 0 ? <><span className="all-ready-span"><FontAwesomeIcon icon={faCheck} /> Còn hàng</span></>
                                        : <><span className="sold-out-span"><FontAwesomeIcon icon={faTimes} /> Hết hàng</span></>}
                                </div>
                                <div className="quantity">
                                    <span>Số lượng</span>
                                    <input className="quantity-input" type="number" id="quantity" name="quantity" defaultValue={qty} min={1} onChange={(e) => setQty(e.target.value)} />
                                </div>
                            </div>
                            <div className="price">
                                {product.sale === 0 ? <div className="new-price"> {Intl.NumberFormat('de-DE').format(product.price) + " đ"} </div>:
                                   <>  
                                        <div className="new-price"> {Intl.NumberFormat('de-DE').format(product.price - (product.price*product.sale/100)) + " đ"}</div>
                                        <div className="old-price"> {Intl.NumberFormat('de-DE').format(product.price) + " đ"} </div>
                                    </>
                                }
                               
                            </div>
                        </div>
                        <div className="button">
                            {userInfo && userInfo.role === "admin" ?  <button className="btn-details" onClick={()=>handleDetails(product.id)}> Details</button> : 
                             <>
                                <button onClick={()=>handleAddToCart(product._id)}> Add to cart  <FontAwesomeIcon icon={faCartArrowDown} /></button>
                                <button onClick={()=>handleAddToCart(product._id,true)}> Buy now <FontAwesomeIcon icon={faReceipt} /></button>
                             </>
                            }
                            
                           
                        </div>

                    </div>
                </div>
            }
            <div className="review-wrap">
                <div className="create-review-container">
                    <h1 className="t-a-center mg-32016">Đánh giá & nhận xét sản phẩm</h1>
                    {(loadingProductReview || loadingDeleteProductReview) && <Loader />}
                    <i className="cl-red">{message}</i>
                    {loading && <Loader />}
                    {userLogin.userInfo ?
                        <div className="create-review">
                            <div className="review-metqua">
                                <select className="review-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value='0' >Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </select>
                                <button className="btn-post-review" onClick={submitHandler}>Post</button>
                            </div>
                            <textarea className="review-input" id="w3review" name="w3review" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </div> : <div><Link className="lazy-css" to="/login">Login</Link> để thêm nhận xét! &#10084;</div>}
                </div>

                <div className="review-container">
                    <h1 className="review-header">Reviews <i className="f-s-20px">({product.reviews.length})</i></h1>
                    <div className="review-list">
                        {/* Map list review */}
                        {product.reviews.map((review) => (
                            <div key={review._id} className="review-item">
                                <div className="item-header">
                                    <h2 className="item-name">{review.name}</h2>
                                    { userLogin && userLogin.userInfo && userLogin.userInfo.role ==="admin" ? 
                                        <button 
                                            className="btn-delete-review"
                                            onClick={() => deleteAdminReviewHandle(review._id)}
                                        ><FontAwesomeIcon icon={faTimes}/></button>
                                        :(userInfo && userInfo._id === review.user && <button className="btn-delete-review"
                                        onClick={deleteReviewHandle}
                                        ><FontAwesomeIcon icon={faTimes}/></button>)
                                    }
                                </div> 
                                <div className="item-content">
                                    <div className="item-content-container">
                                        <b>Đánh giá: </b>
                                        <Rating value={review.rating} />
                                    </div>
                                    <div className="item-content-container">
                                        <b>Nhận xét: </b> <p>{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <Policy show={true} />
        </div>

    )
}

export default DetailProductPage
