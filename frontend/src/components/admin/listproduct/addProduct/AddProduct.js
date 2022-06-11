import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from "react-number-format";

import { createLaptopProduct, createMonitorProduct, createElseProduct } from '../../../../actions/productActions';
import { PRODUCT_CREATE_RESET} from '../../../../constants/productConstants'

import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../../../../firebase"

import Loader from '../../../loader/Loader'
import './AddProduct.css'
const AddProduct = (props) => {
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState();
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState(0)
    // const [image,setImage]=useState()
    const [stock, setStock] = useState()
    const [type, setType] = useState(props.category.name)
    const [category, setCategory] = useState(props.type)
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
    const [restime,setRestime]= useState()
    const [panel, setPanel] = useState()
    const [corlorSpace,setCorlorSpace] = useState()

    const[message, setMessage] = useState()

    const productCreate = useSelector((state) => state.productCreate)
    const { loading, success ,error} = productCreate
    let images;
    useEffect(() => { 
        setMessage("")
        dispatch({type:PRODUCT_CREATE_RESET})
    },[])

    useEffect(() => { 
        if(success) {
            setMessage("Thêm sản phẩm thành công")
        }
        else if(error) {
            setMessage(error)
        }
   },[success,error])

    const formHandler = (e) => {
        e.preventDefault();
        uploadFiles(selectedImage, images)
    };
    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/doancntt/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => { },
            (error) => { alert("lỗi", JSON.stringify(error)) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    images = url
                    if(type==="Laptop")  dispatch(createLaptopProduct(name,description,price,category,images,stock,type,brand,cpu,vga,ram,hdd,ssd,weight,size,hz,resolution))
                    else if (type==="Monitor" || type ==="ComputerScreen") dispatch(createMonitorProduct(name,description,price,category,images,stock,"ComputerScreen",brand,size,hz,resolution,restime,panel,corlorSpace))
                    else dispatch(createElseProduct(name,description,price,category,images,stock,"None",brand))
            
                   
                    //", size, hz, resolution"
                })
            }
        );
    };
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (

        <div className="add-product-container">
            <h1 className="t-a-center">Thêm sản phẩm: {props.type}</h1>
            {(success || error) && message&& <h4 className="t-a-center"><i className="lazy-mess">{message}</i></h4>}
            <form className="form" onSubmit={(e) => formHandler(e)}>
                    <span> Name</span>
                    <input
                        type="text"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <span>Description</span>
                    <textarea
                        className="" rows="6" name="description"
                        type="text"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <div className="flex-row m-b-8px">
                        <div className="flex-column flex-1">
                            <span>Images</span>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={imageChange}
                                required
                            />
                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="image-previews" alt="Pumb" />}
                        </div>
                        <div className="flex-column flex-2 m-lr-8px">
                            <span>Type</span>
                            <input disabled defaultValue={props.category.name} />
                            <span>Category</span>
                            <input disabled defaultValue={props.type} />
                        </div>
                        <div className=" flex-column flex-2 ">
                            <span>Price</span>
                            {/* <input
                            type="text"
                            defaultValue={Intl.NumberFormat('de-DE').format(price) + " đ"}
                            onChange={(e) => setPrice(e.target.value)}
                        /> */}
                            <NumberFormat className="w-100p"
                                defaultValue={price}
                                onChange={(e) => setPrice(e.target.value.replace(/[,. đ]/g, ""))}
                                decimalScale={0}
                                allowNegative={false}
                                suffix=" đ"
                                thousandSeparator={'.'}
                                decimalSeparator=","
                            />
                            <span>Brand</span>
                            <input
                                type="text"
                                defaultValue={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            />
                            <span>Stock</span>
                            <input
                                type="number"
                                defaultValue={stock}
                                onChange={(e) => setStock(e.target.value)}
                                min={0}
                                required
                            />
                        </div>
                    </div>
                    {props.category.name === "Laptop" ? <div className="m-b-24px">
                        <div className="flex-row">
                            <div className="flex-column flex-1">
                                <span>Cpu</span>
                                <input
                                    type="text"
                                    defaultValue={cpu}
                                    onChange={(e) => setCpu(e.target.value)}
                                    required
                                />
                                <span>Vga</span>
                                <input
                                    type="text"
                                    defaultValue={vga}
                                    onChange={(e) => setVga(e.target.value)}
                                    required
                                />
                                <span>Ram</span>
                                <input
                                    type="text"
                                    defaultValue={ram}
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
                                            defaultValue={hdd}
                                            onChange={(e) => setHdd(e.target.value)}
                                            required
                                        />
                                        <span>Ssd</span>
                                        <input
                                            type="text"
                                            defaultValue={ssd}
                                            onChange={(e) => setSsd(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <span>Weight</span>
                                <input
                                    type="text"
                                    defaultValue={weight}
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
                                        defaultValue={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        required
                                    />
                                    <span>Hz</span>
                                    <input
                                        type="text"
                                        defaultValue={hz}
                                        onChange={(e) => setHz(e.target.value)}
                                        required
                                    />
                                    <span>Resolution</span>
                                    <input
                                        type="text"
                                        defaultValue={resolution}
                                        onChange={(e) => setResolution(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : (props.category.name === "Monitor" ? <div className="flex-row">
                        <div className="flex-row flex-1 m-b-8px">
                            <div className="flex-column flex-1">
                                <span>Size</span>
                                <input 
                                    type="text"
                                    defaultValue={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    required                            
                                />
                                <span>Resolution</span>
                                <input 
                                    type="text"
                                    defaultValue={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                    required  
                                />
                            </div>
                            <div className="flex-column flex-1 m-lr-8px">
                                <span>Hz</span>
                                <input 
                                    type="text"
                                    defaultValue={hz}
                                    onChange={(e) => setHz(e.target.value)}
                                    required  
                                />
                                <span>Restime</span>
                                <input 
                                    type="text"
                                    defaultValue={restime}
                                    onChange={(e) => setRestime(e.target.value)}
                                    required  
                                />
                            </div>
                            <div className="flex-column flex-1">
                                <span>Panel</span>
                                <input 
                                    type="text"
                                    defaultValue={panel}
                                    onChange={(e) => setPanel(e.target.value)}
                                    required  
                                />
                                <span>Color Space</span>
                                <input 
                                    type="text"
                                    defaultValue={corlorSpace}
                                    onChange={(e) => setCorlorSpace(e.target.value)}
                                    required  
                                />
                            </div>
                        </div>
                    </div> : null)}
                    <button className="btn-add" type="submit">Add</button>
                    {loading && <div className="loader-center-screen"><Loader /></div>}
                </form>
            <button className="btn-close" onClick={props.handleClose}>Close</button>
        </div>
    )
}

export default AddProduct
