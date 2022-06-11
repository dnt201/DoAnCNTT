import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faMoneyCheckAlt, faCreditCard, faCommentDots } from '@fortawesome/free-solid-svg-icons'

import './Policy.css'

const Policy = (props) => {
    return (
        <div className="policy_container">
            {props.show === true && <h1>Chính sách</h1>}
            <div className="policy_list">
                <div className="police_item">
                    <FontAwesomeIcon icon={faCreditCard} className="icon" />
                    <p> Hỗ trợ trả góp 0%, trả trước 0đ</p>
                </div>
                <div className="police_item">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
                    <p> Hoàn tiền 200% nếu có hàng giả</p>
                </div>
                <div className="police_item">
                    <FontAwesomeIcon icon={faTruck} className="icon" />
                    <p> Giao hàng nhanh trên toàn quốc</p>
                </div>
                <div className="police_item">
                    <FontAwesomeIcon icon={faCommentDots} className="icon" />
                    <p> Hỗ trợ kỹ thuật online 24/7</p>
                </div>
            </div>
        </div>
    )
}

export default Policy
