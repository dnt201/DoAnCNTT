import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import Product from '../product/Product'

import {listProducts} from '../../actions/productActions'

import './ListProduct.css'

const ListProduct = (props) => {
    const dispatch = useDispatch();
    const listProduct1 = useSelector((state) => state.productList)
    const {loading, products} = listProduct1
    useEffect(() => {
        if(props.filters.brand==="0") delete props.filters.brand
        if(props.filters['price[lte]'] === undefined) delete props.filters.max
        if(props.filters['price[gte]'] === undefined) delete props.filters.min
        dispatch(listProducts(props.filters));
    },[props.filters])

    return (

        <div className="listProduct">
        {loading ? <Loader/> : products && products.map((product) => (
            <Product key={product.id} product={product} />
        ))} 
    </div>
    )
}

export default ListProduct
