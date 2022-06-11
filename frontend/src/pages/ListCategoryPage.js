import React, {useEffect} from 'react'
import BtnListItem from '../components/btnListItem/BtnListItem'

import background from '../images/background.png'
import Policy from '../components/policy/Policy'
import './ListCategoryPage.css'

const ListCategoryPage = (props) => {
    useEffect (() => {
        window.scrollTo(0,0);
    },[])
    
    return (
        <div>
            <div className="header" style={{
            backgroundImage: `url(${background})`,
            }}>
                <span> {props.category && props.category.name} </span>
                <img src={ props.category &&  props.category.image} alt=""/>
            </div>
            <h1 className="listCategoryHeader">Danh sách</h1>
            <div className="listCategory">
                {props.category && props.category.children ? props.category.children.map((item) =>
                    <BtnListItem key={item.id} name={item.name} path={item.path} img={item.image} />
                ) : <h2 className="t-a-center m-t-16px">Oh no! Danh mục hiện tại rỗng!</h2>}
            </div>
            <Policy show={true}/>
        </div>
    )
}

export default ListCategoryPage


