import './App.css';

import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import HomePage from './pages/HomePage'
import ListCategoryPage from './pages/ListCategoryPage';
import ListProductPage from './pages/ListProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import DetailProductPage from './pages/DetailProductPage';

import SomeThingWentWrong from './components/somethingwentWrong/SomeThingWentWrong'
import GoToTop from './components/goToTop/GoToTop';
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'



// import laptopCategory from './images/laptop-category.png'
// import ListProduct from './components/listproduct/ListProduct';



import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { getAllCategories } from './actions/categoryAction'

function App() {
    const dispatch = useDispatch()

    useEffect(() =>{
      dispatch(getAllCategories());
    },[])
    const allCategory = useSelector((state) => state.allCategory);
    var listCategories =allCategory.listCategories;

  return (
    <Router>
      <Navbar/>
      <Routes >
        <Route path="/" element={<HomePage/>} />
        { listCategories && listCategories.map((category) => (
           <React.Fragment key={category.id}>
            <Route key={category.id} path={"/"+category.path}  element={<ListCategoryPage  category={category}/>} />
              {category.children && category.children.map((categoryChild) => (
                <Route key={categoryChild.id} path={"/"+category.path+"/"+categoryChild.path+"/"}  element={<ListProductPage productType={categoryChild.name}/>} /> 
              ))}
              {category.children && category.children.map((categoryChild) => (
                <Route key={categoryChild.id} path={"/"+category.path+"/"+categoryChild.path+"/:id"}  element={<DetailProductPage productType={categoryChild.name}/>} /> 
              ))}
          </React.Fragment>
        ))}
        <Route path="/user"   element={<UserPage />}/>
        <Route path="/login"  element={<LoginPage/>}/>
        <Route path="/register"  element={<RegisterPage/>}/>
        <Route path="/admin"  element={<AdminPage/>}/>
        <Route path="/cart"  element={<CartPage/>}/>
        <Route path="/detail_product/:id"  element={<DetailProductPage/>}/>
        <Route path="/*" element={<SomeThingWentWrong/>} />

      </Routes>
     {/* <ListProduct/>
     <Loader/> */}
      <GoToTop/>

      <Footer />
    </Router>
  );
}

export default App;
