import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faWrench, faTimes } from '@fortawesome/free-solid-svg-icons'
import Rating from '../../../rating/Rating'

import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../../../../firebase"


import { updateElseProduct, updateLaptopProduct, updateMonitorProduct } from '../../../../actions/productActions';
import { productDetails } from '../../../../actions/productActions'

import { PRODUCT_UPDATE_RESET } from '../../../../constants/productConstants';

import Loader from '../../../loader/Loader'

import './ChangeProduct.css'

const ChangeProduct = (props) => {


    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [images, setImages] = useState()
    const [sale, setSale] = useState()
    const [saleDate, setSaleDate] = useState()
    const [stock, setStock] = useState()
    const [type, setType] = useState()
    const [category, setCategory] = useState()
    const [brand, setBrand] = useState()
    const [cpu, setCpu] = useState()
    const [vga, setVga] = useState()
    const [ram, setRam] = useState()
    const [hdd, setHdd] = useState()
    const [ssd, setSsd] = useState()
    const [weight, setWeight] = useState()
    const [size, setSize] = useState()
    const [hz, setHz] = useState()
    const [resolution, setResolution] = useState()
    const [restime, setRestime] = useState()
    const [panel, setPanel] = useState()
    const [corlorSpace, setCorlorSpace] = useState()
    const [message, setMessage] = useState()
    const [isEdit, setIsEdit] = useState(false);



    const productDetail = useSelector((state) => state.productDetails)
    const { loading, product, data } = productDetail
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate





    useEffect(() => {
        dispatch(productDetails(props.id))
        if (successUpdate === true) dispatch({ type: PRODUCT_UPDATE_RESET })
    }, [props.id])

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImages(e.target.files[0]);
        }
    };

    const saveInfo = () => {
        //Nếu không thay đổi gì thì alert lên và save info
        if ((name === product.name || name === undefined) &&
            (description === product.description || description === undefined) &&
            (images === undefined) &&
            (price === product.price || price === undefined) &&
            (sale === product.sale || sale === undefined) &&
            (saleDate === undefined) &&
            (brand === product.brand || brand === undefined) &&
            (stock === product.stock || stock === undefined) &&
            (cpu === product.cpu || cpu === undefined) &&
            (vga === product.vga || vga === undefined) &&
            (ram === product.ram || ram === undefined) &&
            (hdd === product.hdd || hdd === undefined) &&
            (ssd === product.ssd || ssd === undefined) &&
            (weight === product.weight || weight === undefined) &&
            (size === product.size || size === undefined) &&
            (hz === product.hz || hz === undefined) &&
            (resolution === product.resolution || resolution === undefined) &&
            (restime === product.restime || restime === undefined) &&
            (panel === product.panel || panel === undefined) &&
            (corlorSpace === product.corlorSpace || corlorSpace === undefined)
        )
            alert("Không có gì thay đổi");
        else if (sale > 100 || sale < 0) { alert("Chửi"); dispatch(productDetails(props.id)) }
        else {
            alert("dispatch update nè")
            uploadFiles(images, props.id, name, description, category, type, stock, price, images, brand, sale, saleDate)
            // dispatch(updateElseProduct(props.id,name,description,category,type,stock,price,images,brand,sale,saleDate))
        }
    }

    const uploadFiles = (file, id, name, description, category, type, stock, price, images, brand, sale, saleDate) => {
        if (!file) {
            if (product.type === "Laptop") {

            dispatch(updateLaptopProduct(id, name, description, category, type, stock, price, images, brand, sale, saleDate, cpu||data.cpu, vga||data.vga, ram||data.ram, hdd||data.storage.hdd, ssd||data.storage.ssd, weight||data.weight, size||data.monitor.size, hz||data.monitor.hz, resolution||data.monitor.resolution))
            }
            else if (product.type === "ComputerScreen") dispatch(updateMonitorProduct(id, name, description, category, type, stock, price, images, brand, sale, saleDate, size, hz, resolution, restime, panel, corlorSpace))
            else dispatch(updateElseProduct(id, name, description, category, type, stock, price, images, brand, sale, saleDate))

        }
        else {
            const storageRef = ref(storage, `/doancntt/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => { },
                (error) => { alert("lỗi", JSON.stringify(error)) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        let image = url
                        if (product.type === "Laptop") dispatch(updateLaptopProduct(id, name, description, category, type, stock, price, image, brand, sale, saleDate, cpu, vga, ram, hdd, ssd, weight, size, hz, resolution))
                        else if (product.type === "ComputerScreen") dispatch(updateMonitorProduct(id, name, description, category, type, stock, price, image, brand, sale, saleDate, size, hz, resolution, restime, panel, corlorSpace))
                        else dispatch(updateElseProduct(id, name, description, category, type, stock, price, image, brand, sale, saleDate))
                    })
                }
            );
        }
    };

    return (
        <div className="change-product-container">
            <div className="flex-row m-g-4-8px">
                <div className="flex-1 flex-row">
                    <h1 className="">Xem sản phẩm {props.type}</h1>
                    <button className="btn-fix-from-change"
                        disabled={isEdit}
                        onClick={() => setIsEdit(!isEdit)}
                    >Sửa <FontAwesomeIcon icon={faWrench} /></button>
                    <button className="btn-save-from-change"
                        disabled={!isEdit}
                        onClick={() => {
                            setIsEdit(!isEdit)
                            saveInfo()
                        }}
                    >Lưu <FontAwesomeIcon icon={faCheck} /></button>
                </div>
                <button className="btn-close-from-change" onClick={props.handleClose}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
            {/* {(success || error) && message&& <h4 className="t-a-center"><i className="lazy-mess">{message}</i></h4>} */}
            {loading ? <div className="loader-center-screen"><Loader /></div> :
                <form className="flex-column  m-lr-8px">
                    {loadingUpdate && <div className="loader-center-screen"><Loader /></div>}
                    {successUpdate && <div className="loader-center-screen"><i className="red-bold">Update thành công!</i></div>}
                    {errorUpdate && <div className="loader-center-screen"><i className="red-bold">Lỗi {errorUpdate}, liên hệ với dev nhé mình lười quá</i></div>}
                    <div className="flex-row">
                        <div className="flex-column flex-1">
                            <span> Name</span>
                            <input
                                disabled={!isEdit}
                                type="text"
                                defaultValue={product.name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-column  flex-1  m-lr-8px">
                            <span> Rating ({product.ratings})</span>
                            <Rating value={product.ratings} text={`${product.reviews.length} reviews`} />
                        </div>
                        <div className="flex-column flex-1 m-lr-8px">
                            {(product.type === "Laptop" || product.type === "ComputerScreen") &&
                                <div className="flex-row m-b-4px">
                                    <span className="flex-1">Type</span>
                                    <input className="flex-2" disabled defaultValue={product.type} />
                                </div>
                            }
                            <div className="flex-row">
                                <span className="flex-1">Category</span>
                                <input className="flex-2" disabled defaultValue={product.category} />
                            </div>
                        </div>
                    </div>
                    <span>Description</span>
                    <textarea
                        disabled={!isEdit}
                        className="" rows="6" name="description"
                        type="text"
                        defaultValue={product.description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <div className="flex-row m-b-8px">
                        <div className="flex-column flex-1">
                            <span>Images</span>
                            <input
                                disabled={!isEdit}
                                accept="image/*"
                                type="file"
                                onChange={imageChange}
                                required
                            />
                            {images ? <img src={URL.createObjectURL(images)} className="image-previews" alt="Pumb" /> :
                                (product.images && <img src={product.images} className="image-previews" alt="Pumb" />)
                            }
                        </div>

                        <div className="flex-column flex-1 m-lr-8px">
                            <div className="flex-column">
                                <span>Price</span>
                                <NumberFormat className="w-100p"
                                    disabled={!isEdit}
                                    defaultValue={product.price}
                                    onChange={(e) => setPrice(e.target.value.replace(/[,. đ]/g, ""))}
                                    decimalScale={0}
                                    allowNegative={false}
                                    suffix=" đ"
                                    thousandSeparator={'.'}
                                    decimalSeparator=","
                                />
                            </div>
                            <div className="flex-column">
                                <span>Sale</span>
                                <input
                                    disabled={!isEdit}
                                    type="number"
                                    defaultValue={product.sale}
                                    onChange={(e) => setSale(e.target.value)}
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>
                            <div className="flex-column">
                                <span>Date sale</span>
                                <DatePicker
                                    disabled={!isEdit}
                                    className="w-100p m-b-8px t-a-center"
                                    selected={moment(saleDate).isValid() ? moment(saleDate).toDate() : (moment(product.saleEnd).isValid() ? moment(product.saleEnd).toDate() : null)}
                                    onChange={(date) => setSaleDate(date)}
                                    dateFormat="MM/dd/yyyy"
                                />
                            </div>
                        </div>


                        <div className="flex-column flex-1">
                            <span>Brand</span>
                            <input
                                disabled={!isEdit}
                                type="text"
                                defaultValue={product.brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            />
                            <span>Stock</span>
                            <input
                                disabled={!isEdit}
                                type="number"
                                defaultValue={product.stock}
                                onChange={(e) => setStock(e.target.value)}
                                min={0}
                                required
                            />
                        </div>
                    </div>
                    {product.type === "Laptop" ? <div className="m-b-24px">
                        <div className="flex-row">
                            <div className="flex-column flex-1">
                                <span>Cpu</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.cpu}
                                    onChange={(e) => setCpu(e.target.value)}
                                    required
                                />
                                <span>Vga</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.vga}
                                    onChange={(e) => setVga(e.target.value)}
                                    required
                                />
                                <span>Ram</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.ram}
                                    onChange={(e) => setRam(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-column m-lr-8px  flex-1">
                                <div className="flex-row">
                                    <span>Storage: </span>
                                    <div className="flex-column flex-1">
                                        <span>Hdd</span>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            defaultValue={data?.storage.hdd}
                                            onChange={(e) => setHdd(e.target.value)}
                                            required
                                        />
                                        <span>Ssd</span>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            defaultValue={data?.storage.ssd}
                                            onChange={(e) => setSsd(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <span>Weight</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-row  flex-1">
                                <span>Monitor: </span>
                                <div className="flex-column flex-1">
                                    <span>Size</span>
                                    <input
                                        type="text"
                                        disabled={!isEdit}
                                        defaultValue={data?.monitor.size}
                                        onChange={(e) => setSize(e.target.value)}
                                        required
                                    />
                                    <span>Hz</span>
                                    <input
                                        type="text"
                                        disabled={!isEdit}
                                        defaultValue={data?.monitor.hz}
                                        onChange={(e) => setHz(e.target.value)}
                                        required
                                    />
                                    <span>Resolution</span>
                                    <input
                                        type="text"
                                        disabled={!isEdit}
                                        defaultValue={data?.monitor.resolution}
                                        onChange={(e) => setResolution(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : (product.type === "ComputerScreen" ? <div className="flex-row">
                        <div className="flex-row flex-1 m-b-8px">
                            <div className="flex-column flex-1">
                                <span>Size</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.size}
                                    onChange={(e) => setSize(e.target.value)}
                                    required
                                />
                                <span>Resolution</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-column flex-1 m-lr-8px">
                                <span>Hz</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.hz}
                                    onChange={(e) => setHz(e.target.value)}
                                    required
                                />
                                <span>Restime</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.restime}
                                    onChange={(e) => setRestime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-column flex-1">
                                <span>Panel</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.panel}
                                    onChange={(e) => setPanel(e.target.value)}
                                    required
                                />
                                <span>Color Space</span>
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    defaultValue={data.corlorSpace}
                                    onChange={(e) => setCorlorSpace(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div> : null)}
                </form>
            }
            { }
        </div>
    )
}

export default ChangeProduct
