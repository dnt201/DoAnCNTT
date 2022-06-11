import React, { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input-field';


import { useDispatch, useSelector } from 'react-redux'
import { listBrandProducts } from '../actions/productActions'

import Loader from '../components/loader/Loader';
import ListProduct from '../components/listproduct/ListProduct'
import Policy from '../components/policy/Policy'
import Pagination from '../components/pagination/Pagination'

import './ListProductPage.css'
import background from '../images/imglaptopgaming.png'


let listPrice = [
    {
        min: undefined,
        max: undefined,
        title: 'All',
        id: '0',
    },
    {
        min: 0,
        max: 10000000,
        title: 'Dưới 10tr',
        id: '1',
    },
    {
        min: 10000000,
        max: 15000000,
        title: 'Từ 10tr - 15tr',
        id: '2',
    },
    {
        min: 15000000,
        max: 20000000,
        title: 'Từ 15tr - 20tr',
        id: '3',
    }, {
        min: 20000000,
        max: 30000000,
        title: 'Từ 20tr - 30tr',
        id: '4',
    }, {
        min: 30000000,
        max: 40000000,
        title: 'Từ 30tr - 40tr',
        id: '5',
    }, {
        min: 40000000,
        max: undefined,
        title: 'Trên 40tr',
        id: '6',
    },
]

const ListProductPage = (props) => {
    const dispatch = useDispatch()
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [isActive, setIsActive] = useState('0')
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9,
        total: 20,
    })
    const listProduct = useSelector((state) => state.productList)
    const { count, total } = listProduct;
    const productListBrand = useSelector((state) => state.productListBrand)
    const { brands } = productListBrand

    const [filters, setFilters] = useState({
        page: pagination.page,
        category: props.productType,
        brand: "0",
        'price[gte]': min,
        'price[lte]': max
    })


    useEffect(() => {
        setFilters({
            ...filters,
            category: props.productType
        }
        )
    }, [props.productType])
    useEffect(() => {
        setPagination({
            ...pagination,
            total: total,
        }
        )
    }, [listProduct])

    useEffect(() => {
        dispatch(listBrandProducts(filters.category))
    }, [filters.category])

    function handlePageChange(newPage) {
        setPagination({
            ...pagination,
            page: newPage
        })
        setFilters({
            ...filters,
            page: newPage,
        })
    }
    function handleValueChange(item) {
        setMin(item.min)
        setMax(item.max)
        setFilters({
            ...filters,
            'price[gte]': item.min,
            'price[lte]': item.max,
        })
        setIsActive(item.id)
    }

    return (
        <div className="ListProductPage">
            <img className="background" src={background} alt="background" />
            <div className="container">
                <div className="left-sidebar">
                    <h2 className="header-left-sidebar"> Bộ lọc sản phẩm</h2>
                    <div className="filter-wrap">
                        <div className="filter-header">Hãng sản xuất</div>
                        <div className="filter-body">
                            <div className="find-filter-wrap">
                                {/*Render hãng*/}
                                {productListBrand ? (productListBrand.loading ? <Loader /> :
                                    <> {
                                        brands.map((brand) => (
                                            <div key={brand} className="filter-item mg-b-8px">
                                                <input type="radio" className="option-input radio" name="manufacturer"
                                                    value={brand}
                                                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                                />
                                                <span>{brand}</span>
                                            </div>))
                                    }
                                        <div className="filter-item mg-b-8px">
                                            <input type="radio" className="option-input radio" name="manufacturer"
                                                value={0}
                                                defaultChecked
                                                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                            />
                                            <span>All</span>
                                        </div></>)
                                    : <h1>SomeThing Went Wrong</h1>
                                }
                                {/*End render hãng*/}
                            </div>
                        </div>
                    </div>

                    <div className="filter-wrap m-t-16px">
                        <div className="filter-header">Mức giá</div>
                        <div className="filter-wrap-price">
                            {/* <div className={"price-filter" + active} onClick={() => handleValueChange(undefined, undefined)}> All </div>
                            <div className="price-filter" onClick={() => handleValueChange(0, 10000000)} className="price-filter"> Dưới 10tr</div>
                            <div className="price-filter" onClick={() => handleValueChange(10000000, 15000000)}>  10Tr - 15Tr </div>
                            <div className="price-filter" onClick={() => handleValueChange(15000000, 20000000)}>  15Tr - 20Tr</div>
                            <div className="price-filter" onClick={() => handleValueChange(20000000, 30000000)}>  20Tr - 30Tr </div>
                            <div className="price-filter" onClick={() => handleValueChange(30000000, 40000000)}>  30Tr - 40Tr </div>
                            <div className="price-filter" onClick={() => handleValueChange(40000000, undefined)}> Trên 40tr </div> */}
                            {listPrice.map((item) => (
                                <div key={item.id} className={"price-filter " + (isActive === item.id && "active")} onClick={() => {handleValueChange(item)}}> {item.title}</div>
                            ))}
                            <div className="price-filter-input-wrap">
                                <div className="m-b-8px">Hoặc nhập giá trị dưới đây</div>
                                <div className="filter-input-price m-b-8px">
                                    <CurrencyInput decimalsLimit={0} decimalSeparator=","
                                        groupSeparator="."
                                        className="form-input m-b-4px w-100p"
                                        placeholder="Từ"
                                        allowNegativeValue={false}
                                        value={min === 0 || min === "0" || min === undefined ? "" : min}
                                        onChange={(e) => setMin(e.target.value.replace(/[.]/g, ""))}
                                    />
                                    <CurrencyInput decimalsLimit={0} decimalSeparator=","
                                        groupSeparator="."
                                        className="form-input w-100p"
                                        allowNegativeValue={false}
                                        placeholder="Đến"
                                        value={max === 0 || max === "0" || max === undefined ? "" : max}
                                        onChange={(e) => setMax(e.target.value.replace(/[.]/g, ""))}
                                    />
                                </div>
                            </div>
                            <button className="btn-apply-price" onClick={()=> {setFilters({
                                ...filters,
                                'price[gte]': min,
                                'price[lte]': max,
                            }); setIsActive("")
                            }}> Áp dụng </button>
                        </div>
                    </div>
                </div>
                <div className="product-list">
                    <div className="list-header">
                        <div className="header-name-list">
                            <h2 className="mg-r-8px">{props.productType}</h2>
                            <span>{count && count !== 0 && total && total !== 0 ? <>({(count + " of " + total)})</> : <>{"Không có sản phẩm"}</>}</span>
                        </div>
                        <div className="header-sort-list">
                            <span className="mg-r-8px">Sắp xếp theo</span>
                            <select>
                                <option>
                                    Mới nhất
                                </option>
                                <option>
                                    Giá (thấp - cao)
                                </option>
                                <option>
                                    Giá (cao - thấp)
                                </option>
                                <option>
                                    Tên (A - Z)
                                </option>
                                <option>
                                    Tên (Z - A)
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="product-list">
                        {/* item truyền vào props category để vào list render */}
                        <ListProduct category={props.productType} filters={filters} />
                    </div>
                </div>
            </div>
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
            <Policy show={true} />
        </div>
    )
}
export default ListProductPage
