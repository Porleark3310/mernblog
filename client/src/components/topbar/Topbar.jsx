import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div className="top">
      <div className="topLeft">
        <a onClick={() => openInNewTab("https://www.facebook.com/")}>
          <i className="topIcon fab fa-facebook-square"></i>
        </a>
        <a onClick={() => openInNewTab("https://www.instagram.com/")}>
          <i className="topIcon fab fa-instagram-square"></i>
        </a>
        <a onClick={() => openInNewTab("https://www.pinterest.com/")}>
          <i className="topIcon fab fa-pinterest-square"></i>
        </a>
        <a onClick={() => openInNewTab("https://www.twitter.com/")}>
          <i className="topIcon fab fa-twitter-square"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
