import "./login.css";

import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const {dispatch, isFetching } = useContext(Context);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});

    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"});
      setError(true);
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Username..." ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Password..." ref={passwordRef}/>
        <div className="btnWrapper">
          <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </div>
      </form>
      <Link className="link" to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
      {error && <span className = "error-container">Wrong username or password.</span>}
    </div>
  );
}
