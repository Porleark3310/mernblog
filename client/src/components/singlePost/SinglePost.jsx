import { Link, useLocation } from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import { Context } from "../../context/Context";
import axios from 'axios';
import "./singlePost.css";

export default function SinglePost() {
  // Fetch data according to post ID. In order to do this, split the string up and isolate the ID
  // Location path right now is .../post/<postid>
  // use the split() method to split the string up by their '/' at the location.
  // [0] - .../
  // [1] - post/
  // [2] - <postid>    
  const location = useLocation();
  const path = (location.pathname.split("/")[2]);
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/"; 
  const {user} = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async() => {
    try {
      await axios.delete(`/posts/${post._id}`, {data:{username: user.username}});
      window.location.replace("/");
    } catch (error) {
      
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username, 
        title: title, 
        desc: desc
      });
      setUpdateMode(false);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    const getPost = async () =>{
      const res  = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  },[path])

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (<img
          className="singlePostImg"
          src={PF  + post.photo}
          alt=""
        />
        )}
        { 
          updateMode ? <input type="text" value={title} className="singlePostTitleInput" onChange={(e)=>setTitle(e.target.value)} autoFocus/> : 
          (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick = {()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
              )}
            </h1>
          )
        } 
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            By:
              <Link to={`/posts?username=${post.username}`} className="link" >
                <b> {post.username}</b>
              </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? 
          <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> : ( 
          <p className="singlePostDesc">
            {desc}
          </p>
        )}
        {updateMode && 
          <button className = "singlePostButton" onClick = {handleUpdate}>Update</button>
        }
      </div>
    </div>
  );
}
