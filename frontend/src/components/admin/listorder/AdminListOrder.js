import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deliverOrder } from "../../../actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import DetailOrder from "./detailOrder/DetailOrder";
import Loader from "../../loader/Loader";
import { listOrders } from "../../../actions/orderActions";

import "./AdminListOrder.css";

const AdminListOrder = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, totalAmount } = orderList;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const [showDetail, setShowDetail] = useState(false);
  const [idClick, setIdClick] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(listOrders());
  }, [successDeliver]);

  const handleDetails = (id, us) => {
    setShowDetail(!showDetail);
    setIdClick(id);
    setUser(us);
  };

  return (
    <div className="list-order-container">
      <h1 className="t-a-center">Order List</h1>
      {loading || loadingDeliver ? (
        <div className="loader-center-screen">
          <Loader />
        </div>
      ) : (
        <>
          {showDetail && (
            <DetailOrder handleClose={handleDetails} id={idClick} user={user} />
          )}

          {errorDeliver && (
            <div className="loader-center-screen">{errorDeliver}</div>
          )}
          {orders && orders.size > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="flex-row m-b-8px wrap-order">
                <div className="flex-2">
                  <div>
                    <span>
                      <b>Id hóa đơn: </b>
                    </span>
                    <br />
                    <span>{order._id}</span>
                  </div>
                  <div>
                    <span>
                      <b>Id user: </b>
                    </span>
                    <br />
                    <span>{order.user}</span>
                  </div>
                  <div>
                    <span>
                      <b>Ngày tạo: </b>
                    </span>
                    <br />
                    <span>{moment(order.createAt).format("l")} </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="vertical-center">
                    <span>
                      <b>Total: </b>
                    </span>
                    <br />
                    <span>
                      {" "}
                      {Intl.NumberFormat("de-DE").format(order.totalPrice) +
                        " đ"}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  {order.orderStatus === "Processing" ? (
                    <div className="vertical-center">
                      <select
                        className="review-select "
                        value={"Processing"}
                        onChange={(e) => {
                          if (window.confirm("Are you sure?")) {
                            dispatch(deliverOrder(order._id, e.target.value));
                          }
                        }}
                      >
                        <option value="Canceled">Canceled</option>
                        <option value="Processing"> Processing </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  ) : (
                    <div className="vertical-center ">
                      {order.orderStatus === "Delivered" ? (
                        <div className="delivered vertical-center ">
                          <span>
                            {" "}
                            {order.orderStatus}{" "}
                            <FontAwesomeIcon icon={faCheck} />
                          </span>{" "}
                        </div>
                      ) : (
                        <div className="canceled vertical-center ">
                          <span>
                            {" "}
                            {order.orderStatus}{" "}
                            <FontAwesomeIcon icon={faTimes} />{" "}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className=" flex-1">
                  <div className="vertical-center">
                    <button
                      className=" btn-details"
                      onClick={() => handleDetails(order._id, order.user)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="center-screen color-red">
              <i> Chưa có hóa đơn nào </i>
            </h4>
          )}
        </>
      )}
    </div>
  );
};

export default AdminListOrder;
