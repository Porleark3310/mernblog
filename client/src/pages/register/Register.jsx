import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./register.css"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    } catch (error) {
        setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
            <input 
                className="registerInput" 
                type="text" 
                placeholder="Username..."
                onChange = {e => setUsername(e.target.value)}
            />

          <label>Email</label>
            <input 
              className="registerInput" 
              type="text" 
              placeholder="Email..." 
              onChange = {e => setEmail(e.target.value)}
            />

          <label>Password</label>
            <input 
              className="registerInput" 
              type="password" 
              placeholder="Password..." 
              onChange = {e => setPassword(e.target.value)}
            />
          <div className="btnWrapper">
            <button className="registerButton" type="submit">Register</button>
          </div>
        </form>
        <Link className="link" to="/login">
          <button className="registerLoginButton">Login</button>
        </Link>
        {error && <span className = "error-container">Oops. Something went wrong!</span>}
    </div>
  )
}
