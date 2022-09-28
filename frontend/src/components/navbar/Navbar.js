import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCaretDown,
  faCaretRight,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../actions/userActions";
import { getAllCategories } from "../../actions/categoryAction";

import logoIMG from "../../images/logo.jpg";
import "./Navbar.css";

const Navbar = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const cart = useSelector((state) => state.cart);

  const allCategory = useSelector((state) => state.allCategory);
  var listCategories = allCategory.listCategories;
  const userLogin = useSelector((state) => state.userLogin);
  const logoutHandler = () => {
    dispatch(logout());
  };

  const [navToggle, setNavToggle] = useState(false);
  const toggleNav = () => {
    setNavToggle(!navToggle);
  };

  var userInformation = JSON.parse(localStorage.getItem("userInfo"));
  const renderNav = () => {
    let className = "";
    if (navToggle) {
      className += " active";
    }
    return className;
  };
  return (
    <div>
      <nav className={renderNav()}>
        <div className="menu-icons" onClick={toggleNav}>
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <Link to="/#" className="logo">
          <img src={logoIMG} alt="" />
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <div className="cont" type="button">
              Products <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <ul className="sub-menu">
              {listCategories === undefined || listCategories.length <= 0 ? (
                <div className="cont-lazy ">Chưa có category</div>
              ) : (
                listCategories.map((category) => (
                  <li key={category.id}>
                    <div className="cont flex_row_center_between" to="/#">
                      {category.name}
                      <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                    <ul className="sub-menu">
                      <li to="/#">
                        <Link
                          className="ta-center cl_orange"
                          to={"/" + category.path}
                        >
                          {category.name}
                        </Link>
                      </li>
                      {category.children === undefined ||
                      category.children.size <= 0 ? (
                        <li>
                          <i className="cont-lazy">Chưa có category nào cả! </i>
                        </li>
                      ) : (
                        category.children.map((categoryChild) => (
                          <li key={categoryChild.id}>
                            <Link to={category.path + "/" + categoryChild.path}>
                              {categoryChild.name}
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          </li>
          <div className="move-right">
            <>
              {userLogin.userInfo &&
              userLogin.userInfo.role === "admin" ? null : (
                <li className="cover-size btn user">
                  <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="number-items-cart">
                      {" "}
                      {cart.cartItems.length}
                    </span>
                  </Link>
                </li>
              )}
            </>
            {userLogin.isLogin || userInformation ? (
              <>
                <li className="cover-size btn user">
                  <Link to="/user">
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li className="cover-size btn logout">
                  <button onClick={logoutHandler}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li className="cover-size btn login">
                  <Link to="/login">Login</Link>
                </li>
                <li className="cover-size btn login">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            {userLogin.userInfo && userLogin.userInfo.role === "admin" && (
              <li className="cover-size btn admin">
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
