import React from 'react'
import { ExternalLink  } from 'react-external-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons';
import dntImage from './dnt.jpg';
import qmdImage from './qmd.jpg';


import './Footer.css'
const Footer = () => {
    return (
        <footer>
            <div className="social_list">
                <ExternalLink href="https://facebook.com" className="social_item"><FontAwesomeIcon icon={faFacebook} /></ExternalLink>
                <ExternalLink href="https://instagram.com" className="social_item"><FontAwesomeIcon icon={faInstagram} /></ExternalLink>
                <ExternalLink href="https://twitter.com" className="social_item"><FontAwesomeIcon icon={faTwitter} /></ExternalLink>
                <ExternalLink href="https://github.com" className="social_item"><FontAwesomeIcon icon={faGithub} /></ExternalLink>
                <ExternalLink href="https://youtube.com" className="social_item"><FontAwesomeIcon icon={faYoutube} /></ExternalLink>
            </div>
            <div className="contactList">
                <div className="information">
                    <h4 className="lazy_title">About us</h4>
                    <div className="information_item"><b>Showroom:</b> Trường ĐH Sư Phạm Kỹ Thuật - Số 1 Võ Văn Ngân, Phường Linh Chiểu, Quận Thủ Đức, TP.HCM</div>
                    <div className="information_item"><b>Trung tâm bảo hành 1:</b> 201 Lê Thanh Nghị, Phường Đồng Tâm, Quận Hai Trưng, Hà Nội</div>
                    <div className="information_item"><b>Trung tâm bảo hành 2:</b> 111 Lê Văn Việt, P. Tăng Nhơn Phú B, Q. 9, TP.HCM</div>
                    <div className="information_item"><b>Trung tâm bảo hành 3:</b> 71 Lê Thanh Nghị, Phường Đồng Tâm, Quận Hai Trưng, Hà Nội</div>
                    <div className="information_item"><b>Gmail 1: 19110251@student.hcmute.edu.vn</b></div>
                    <div className="information_item"><b>Gmail 2: 19110015@student.hcmute.edu.vn</b></div>
                    <div className="information_item"><b>Phone Number: </b>1800 một không không có</div>
                </div>

                <div className="member_list">
                    <h4 className="lazy_title">Members</h4>
                    <div className="flex_row_evenly w80"> 
                        <div className="member_item">
                            <img src={dntImage} alt="Avatar member"/>
                            <p className="mb_4px"> Trần Duy Nhã </p>
                            <p> 19110251 </p>
                        </div>
                        <div className="member_item">
                            <img src={qmdImage} alt="Avatar member"/>
                            <p className="mb_4px"> Quản Minh Đức </p>
                            <p> 19110015 </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
