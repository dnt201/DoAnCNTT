import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

import Loader from '../loader/Loader'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { detailMyOrder } from '../../actions/orderActions'

// import { getUserDetails } from '../../actions/userActions'
import './ThankForBuy.css'

const DetailOrder = (props) => {
    const dispatch = useDispatch()

    const orderMy = useSelector((state) => state.orderMy)
    const { loading: loadingOrderMy, order, data } = orderMy

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const userDetail = useSelector((state) => state.userDetail)
    // const { loading: loadingUserDetail, user } = userDetail

    useEffect(() => {
        dispatch(detailMyOrder(props.id))
    }, [props.id])
    return (
        <div className="detail-order-container">
            {(loadingOrderMy) ? <div className="loader-center-screen"><Loader /></div> :
                <div className="wrap">
                    <div className="flex-row jt-ct-center align-item-center">
                        <h1 className="m-r-8px">Order #{props.id}</h1>
                    </div>
                    {props.thanks && props.thanks===true&& <h3 className="thanks-css t-a-center">Cảm ơn bạn đã mua hàng!</h3>}
                    <div className="detail-order-wrap">
                        <div className="flex-row jt-ct-sb">
                            <div>
                                <div>
                                    <span className="w-170px"><b>Customer: </b></span>
                                    <span>{userInfo?.name}</span>
                                </div>
                                <div>
                                    <span className="w-170px"><b>Email:</b></span>
                                    <span>{userInfo?.email}</span>
                                </div>
                                <div>
                                    <span className="w-170px"><b>Numbs of product: </b></span>
                                    <span>{order?.orderItems?.length}</span>
                                </div>
                                <div>
                                    <span className="w-170px"><b>Order Date: </b></span>
                                    <span>{moment(order?.createAt).format("ll")}</span>
                                </div>
                                <div>
                                    <span className="w-170px"><b>Shipped Date: </b></span>
                                    <span>{order?.deliveredAt && order?.orderStatus === "Delivered" ? moment(order?.deliveredAt).format("ll") : (order?.orderStatus === "Canceled" ? <>Đơn hàng đã bị hủy!</> : <>Đơn hàng đang trong quá trình xử lý!</>)}</span>
                                </div>
                            </div>
                            <div className="t-a-right">
                                <div>
                                    <span className="w-170px"><b>Address: </b></span>
                                    <span>{order?.shipingInfo?.address}</span>
                                </div>
                                <div>
                                    <span><b>Phone number: </b></span>
                                    <span>{order?.shipingInfo?.phoneNumber}</span>
                                </div>
                                <div>
                                    <span><b>City: </b></span>
                                    <span>{order?.shipingInfo?.city}</span>
                                </div>

                                <div>
                                    <span><b>Postal code: </b></span>
                                    <span>{order?.shipingInfo?.postalCode}</span>
                                </div>
                                <div>
                                    <span><b>Country: </b></span>
                                    <span>{order?.shipingInfo?.country}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table className="w-100p m-b-8px table">
                                <colgroup>
                                    <col span="1" style={{ width: '45%' }} />
                                    <col span="1" style={{ width: '10%' }} />
                                    <col span="1" style={{ width: '10%' }} />
                                    <col span="1" style={{ width: '10%' }} />
                                    <col span="1" style={{ width: '10%' }} />
                                    <col span="1" style={{ width: '15%' }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Product name</th>
                                        <th>Unit price</th>
                                        <th>Discount</th>
                                        <th>Sale price</th>
                                        <th>Quantity</th>
                                        <th>Total price</th>
                                    </tr>
                                </thead>
                                {/* Start-item */}
                                <tbody>
                                    {orderMy && orderMy.data && order?.orderItems.map((product, index) => (
                                        <tr key={product.id_product} className="t-a-center">
                                            <td className="t-a-left p-l-4px">
                                                <span>
                                                    {data[index].name}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {Intl.NumberFormat('de-DE').format((data[index].price)) + " đ"}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {data[index].sale}%
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {Intl.NumberFormat('de-DE').format((data[index].price - (data[index].price * data[index].sale / 100))) + " đ"}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td className="t-a-right">
                                                <span>
                                                    {Intl.NumberFormat('de-DE').format((data[index].price - (data[index].price * data[index].sale / 100)) * product.quantity) + " đ"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex-column  align-item-flex-end">
                            <span><b>Item price:</b> {Intl.NumberFormat('de-DE').format(order?.itemPrice) + " đ"}</span><br/>
                            <span><b>Tax price:</b>  {Intl.NumberFormat('de-DE').format(order?.taxPrice) + " đ"}</span><br/>
                            <span><b>Shipping price:</b>   {Intl.NumberFormat('de-DE').format(order?.shipingPrice) + " đ"}</span><br/>
                            <span><b>Total:</b>  {Intl.NumberFormat('de-DE').format(order?.totalPrice) + " đ"}</span>


                        </div>
                        <div className="m-t-16px w-100p flex-row jt-ct-center"><button className="btn-close w-50p" onClick={props.handleClose}>Close</button></div>
                    </div>
                </div>
            }

        </div>
    )
}

export default DetailOrder
