import React, { useEffect }from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import './Pagination.css'

const Pagination = (props) => {
    const { pagination, onPageChange } = props
    const { page, limit, total } = pagination
    const totalPage = Math.ceil(total / limit);

    function handlePageChange(newPage) {
        if (onPageChange) onPageChange(newPage);
    }
    function handleChange(e){
        let temp = e.target.value
        temp = parseInt(temp)
        if(temp <= 0 || temp > totalPage)
            alert("Số trang không hợp lệ!")
        else {
            handlePageChange(temp)
        }
    }
    return (
        <div className="pagination-components">
            <div className="m-b-8px">
                <b> -- {page} of {totalPage} --</b>
            </div>
            <div className="pagination-container">
                <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(1)}
                >
                    Go to first
                </button>
                <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <input type="number" defaultValue={page} min={1} max={totalPage||null} onChange={(e) => setTimeout(() => {
                    handleChange(e)
                }, 1000)}/>
                <button
                    disabled={page >= totalPage}
                    onClick={() => handlePageChange(page + 1)}
                >
                    <FontAwesomeIcon icon={faChevronRight} />

                </button>
                <button
                    disabled={page >= totalPage}
                    onClick={() => handlePageChange(totalPage)}
                >
                    Go to last
                </button>
            </div>

        </div>
    )
}
// eslint-disable-next-line no-use-before-define
Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
}
// eslint-disable-next-line no-use-before-define
Pagination.defaultProps = {
    onPageChange: null
}

export default Pagination
