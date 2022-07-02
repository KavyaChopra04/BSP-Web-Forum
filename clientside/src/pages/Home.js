import axios from "axios"
import {useEffect, useState} from "react";
import React from 'react'
import { useNavigate } from 'react-router-dom';
function custom_sort(a, b) {
    return -new Date(a.updatedAt).getTime() + new Date(b.updatedAt).getTime();
    //sorts keeping newest arrivals first
}
function Home() {
    const [Postsarr, fillarr] = useState([]);
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
      redirect();
    })
  },[])
  return (
    <div>
      {Postsarr.map((value, key)=>{
        return (
        <div className='post' onClick={()=>{navigate(`/post/${value.id}`)}}>
        <div className='title'>{value.title}</div>
        <div className='author'>{value.author}</div>
        </div>)
      })}
    </div>)
}

    
export default Home