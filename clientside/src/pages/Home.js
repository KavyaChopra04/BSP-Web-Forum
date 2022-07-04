import axios from "axios"
import {useEffect, useState} from "react";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
function custom_sort(a, b) {
    return -new Date(a.updatedAt).getTime() + new Date(b.updatedAt).getTime();
    //sorts keeping newest arrivals first
}
function Home() {
    const [Postsarr, fillarr] = useState([]);
    var userId;
    const [username, setUsername]=useState("");
    const [id, setUserId]=useState("");
    let navigate=useNavigate()
    const redirect = () => {
    if(!localStorage.getItem("accessToken"))
    {
      alert("Please login before ");
      navigate("/users/login");
    }
      
  };
  useEffect(()=>{
    axios.get("http://localhost:3001/posts").then((response)=>{
      const nobj=response.data;
      nobj.sort(custom_sort);
      fillarr(response.data);
      console.log(response.data);
      redirect();
    })
    axios.get(`http://localhost:3001/users/bytoken/${localStorage.getItem("accessToken")}`).then((response)=>{
      setUsername(response.data.username);
      setUserId(response.data.id);
    })
  },[])
  return (
    <div> Home Page
      <div>Welcome {username}!</div>
      <div className='title' onClick={()=>{navigate(`/profile/${id}`)}}>Click here to go to your profile page</div>
    <div>
      {Postsarr.map((value, key)=>{
        return (
        <div className='post'>
        <div className='title' onClick={()=>{navigate(`/post/${value.id}`)}}>{value.title}</div>
        <div className='author'><Link to={`/profile/${value.UserId}`}>{value.author}</Link></div>
        </div>)
      })}
    </div>
    </div>)
}

    
export default Home