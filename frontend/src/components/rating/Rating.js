import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
const Rating = ({ value, text}) => {
  return (
    <div className='rating'>
      <span
       style={{
        color: '#f8e825',
       }}>
        {value >= 1
          ? <FontAwesomeIcon icon={faStar} />
          : value >= 0.5
            ? <FontAwesomeIcon icon={faStarHalfAlt} />
            : <FontAwesomeIcon icon={farFaStar} />
        }
      </span>
      <span
       style={{
        color: '#f8e825',
       }}>
        {
          value >= 2
            ? <FontAwesomeIcon icon={faStar} />
            : value >= 1.5
              ? <FontAwesomeIcon icon={faStarHalfAlt} />
              : <FontAwesomeIcon icon={farFaStar} />
        }
      </span>
      <span
       style={{
        color: '#f8e825',
       }}>
        {
          value >= 3
            ? <FontAwesomeIcon icon={faStar} />
            : value >= 2.5
              ? <FontAwesomeIcon icon={faStarHalfAlt} />
              : <FontAwesomeIcon icon={farFaStar} />
        }
      </span>
      <span
       style={{
        color: '#f8e825',
       }}>
        {
          value >= 4
            ? <FontAwesomeIcon icon={faStar} />
            : value >= 3.5
              ? <FontAwesomeIcon icon={faStarHalfAlt} />
              : <FontAwesomeIcon icon={farFaStar} />
        }
      </span>
      <span
         style={{
          color: '#f8e825',
         }}
      >
        {
          value >= 5
            ? <FontAwesomeIcon icon={faStar} />
            : value >= 4.5
              ? <FontAwesomeIcon icon={faStarHalfAlt} />
              : <FontAwesomeIcon icon={farFaStar} />
        }
      </span>
      <span>{text && text}</span>
    </div>
  )
}

export default Rating
