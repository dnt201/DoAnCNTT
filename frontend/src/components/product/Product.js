import React, {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,Route } from 'react-router-dom'

import './Product.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import {addToCart} from '../../actions/cartActions'

import imgCPU from '../../images/cpu.png'
import imgGPU from '../../images/gpu.png'
import imgHZ from '../../images/Hz.png'
import imgPanel from '../../images/panel.png'
import imgRam from '../../images/ram.png'
import imgResolution from '../../images/resolution.png'
import imgResTime from '../../images/response-time.png'
import imgSize from '../../images/size.png'
import imgStorage from '../../images/storage.png'
import imgWeight from '../../images/weight.png'
import imgColorSpace from '../../images/color-space.png'

const Product = ({product}) => {
    const dispatch = useDispatch()
    const userInformation = useSelector((state) => state.userLogin)

    function handleAddToCart (product_id){
        dispatch(addToCart(product_id,1))
    }
    
    return (
        <div className="item-product">
            {product.sale !== 0 && <div className="stick-percent"><p>Giảm {product.sale}%</p></div>}
            <img className="img-product" src={product.image} alt="" />
            <h4 className="name">{product.name}</h4>
            <div className="box-price">
                <div className="sale-product">
                    <span className="price-sale">{product.sale === 0 ? Intl.NumberFormat('de-DE').format(product.price) + " đ" : Intl.NumberFormat('de-DE').format(product.price - product.price * product.sale / 100) + " đ"}</span>
                    <span className="price-old">{product.sale !== 0 && Intl.NumberFormat('de-DE').format(product.price) + " đ"}</span>
                </div>
                {userInformation.userInfo && userInformation.userInfo.role === "user" &&
                    <button 
                        className="add-to-card" 
                        onClick={() => handleAddToCart(product.id)}><FontAwesomeIcon className="add-to-card-icon" icon={faCartPlus} />
                    </button>
                    
                }  
            </div>
            {product.category === "Laptop" ? (
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="detail">
                                    <img
                                        src={imgCPU} data-ll-status="loaded" alt="" />
                                    <b>{product.shortInfomation.cpu}</b>
                                </div>
                            </td>
                            <td>
                                <div className="detail ml_16px" >
                                    <img
                                        src={imgGPU} alt="" />
                                    <b>{product.shortInfomation.vga}</b>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="detail">
                                    <img
                                        src={imgRam} data-ll-status="loaded" alt="" />
                                    <b>{product.shortInfomation.ram}</b>
                                </div>
                            </td>
                            <td>
                                <div className="detail ml_16px">
                                    <img
                                        src={imgStorage} alt="" />
                                    <div className="flex_column_start">
                                        {product.shortInfomation.storage.ssd && <b>{"SSD: " + product.shortInfomation.storage.ssd}</b>}
                                        {product.shortInfomation.storage.hdd && <b>{"HDD: " + product.shortInfomation.storage.hdd}</b>}
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="detail">
                                    <img
                                        src={imgWeight} data-ll-status="loaded" alt="" />
                                    <b>{product.shortInfomation.weight}</b>
                                </div>
                            </td>
                            <td>
                                <div className="detail ml_16px">
                                    <img
                                        src={imgSize} alt="" />
                                    <div className="flex_column_start">
                                        <div>
                                            {product.shortInfomation.monitor.size && <b>{product.shortInfomation.monitor.size + " "}</b>}
                                            {product.shortInfomation.monitor.resolution && <b>{product.shortInfomation.monitor.resolution}</b>}
                                        </div>
                                        {product.shortInfomation.monitor.hz && <b>{product.shortInfomation.monitor.hz}</b>}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (product.category === "ComputerScreen" ?
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="detail">
                                    <img
                                        src={imgSize} data-ll-status="loaded" alt="" />
                                    <b>{product.shortInfomation.size}</b>
                                </div>
                            </td>
                            <td>
                                <div className="detail ml_16px" >
                                    <img
                                        src={imgResolution} alt="" />
                                    <b>{product.shortInfomation.resolution}</b>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="detail">
                                    <img
                                        src={imgHZ} data-ll-status="loaded" alt="" />
                                    <b>{product.shortInfomation.hz}</b>
                                </div>
                            </td>
                            <td>
                                <div className="detail ml_16px">
                                    <img
                                        src={imgResTime} alt="" />
                                    <div className="flex_column_start">
                                    <b>{product.shortInfomation.restime}</b>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="detail">
                                    <img
                                        src={imgPanel} data-ll-status="loaded" alt="" />
                                    <div className="flex_column_start">
                                    <b>{product.shortInfomation.panel}</b>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="detail ml_16px">
                                    <img
                                        src={imgColorSpace} alt="" />
                                    <div className="flex_column_start">
                                        <div>
                                            {product.shortInfomation.corlorSpace && <b>{product.shortInfomation.corlorSpace}</b>}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table> : null)
            }
         <Link to={`${product.id}`} className="btn-details">Details</Link>
            {/* //} */}
           
        </div>
    )
}

export default Product
