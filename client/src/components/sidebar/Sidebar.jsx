import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  useEffect(() =>{
    const getCats = async ()=>{
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <div className = "mern_image"/>
        <p>
          This is a blog created to learning the MERN stack. It can handle user registration and login as well as CRUD operations
          such as changing user profile details and managing posts.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList" >
          {/* {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} style={{listStyle:"none", textDecoration: "none"}}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))} */}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
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
      </div>
    </div>
  );
}
