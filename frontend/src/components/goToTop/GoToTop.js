import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

import './GoToTop.css'
const GoToTop = () => {

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

    const [showGoToTop, setShowGoToTop] = useState(false);
    
    useEffect(() => {
        const  handleScroll = () => {
            setShowGoToTop(window.scrollY >= 150)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    return (
        <div>
            {showGoToTop && (
                <button className="btn-goToTop" onClick={topFunction}>
                    <FontAwesomeIcon className="icon-goToTop" icon={faAngleDoubleUp} />
                </button>
            )}
        </div>
    )
}

export default GoToTop
