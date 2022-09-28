import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { register } from "../actions/userActions";
import SendEmail from "../components/sendEmail/SendEmail";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";

//import { USER_REGISTER_RESET } from '../constants/userConstants'

import "./RegisterPage.css";

const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  console.log(error);

  const userLogin = useSelector((state) => state.userLogin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    if (userLogin.userInfo) {
      navigate("/user");
    }
  }, []);
  useEffect(() => {
    setMessage(error);
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password not match!");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      {" "}
      {userInfo && !userInfo.isActivate ? (
        <SendEmail />
      ) : (
        <div className="form_container">
          <form className="wrap-register" onSubmit={submitHandler}>
            <span>Register</span>
            <p>
              <i>Many thanks for your registration!</i>
            </p>

            <div className="wrap_name_email flex_row_around w100 m-t-8px">
              <div className="form_control wrap_name flex_column_start w48">
                <label className="m-b-4px">Name</label>
                <input
                  id="nameInput"
                  className="m-b-4px w100 p-lr-4px w100"
                  placeholder="Enter your name..."
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="correct_icon"
                />
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="error_icon"
                />
                <small className="error_message m-b-12px">Error message</small>
              </div>
              <div className="form_control wrap_email flex_column_start w48">
                <label className="m-b-4px">Email</label>
                <input
                  id="emailInput"
                  className="m-b-4px w100 p-lr-4px w100"
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="correct_icon"
                />
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="error_icon"
                />
                <small className="error_message m-b-12px">Error message</small>
              </div>
            </div>
            <div className="form_control wrap_address flex_column_start w100">
              <label className="m-b-4px">Address</label>
              <input
                id="addressInput"
                className="w100 m-b-4px p-lr-4px"
                type="text"
                placeholder="Enter your password..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <FontAwesomeIcon icon={faCheckCircle} className="correct_icon" />
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="error_icon"
              />
              <small className="error_message">Error message</small>
            </div>
            <div className="form_control wrap_password flex_column_start w100">
              <label className="m-b-4px">Password</label>
              <input
                id="passwordInput"
                className="w100 m-b-4px p-lr-4px"
                type="password"
                placeholder="Enter your password..."
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon icon={faCheckCircle} className="correct_icon" />
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="error_icon"
              />
              <small className="error_message m-b-12px">Error message</small>
            </div>
            <div className="form_control wrap_conf_password flex_column_start w100">
              <label className="m-b-4px">Confirm Password</label>
              <input
                id="confPasswordInput"
                className="w100 m-b-4px p-lr-4px"
                type="password"
                placeholder="Confirm password..."
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon icon={faCheckCircle} className="correct_icon" />
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="error_icon"
              />
              <small className="error_message m-b-12px">Error message</small>
            </div>
            {loading && <Loader />}
            <i className="red_16px_bold">{message}</i>
            <button className="register-btn" type="submit">
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
