import React from 'react'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Profile() {
    let navigate=useNavigate();
    let {id}=useParams();
    const [username, setUsername]=useState("")
    const [Postarr, setPostarr]=useState([])
    useEffect(() => {
      axios.get(`http://localhost:3001/users/basicinfo/${id}`).then((response) => {
        setUsername(response.data.username);
      })
      axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
       
        setPostarr(response.data);
      })
    }, [])
    
  return (
    <div className="profilepage">Profile Page
    <div className="basicinfo">
        <h1>Username: {username}</h1>
    </div>
    <div>List of this user's posts:</div>
    <div>
      {Postarr.map((value, key)=>{
        return (
        <div className='post' onClick={()=>{navigate(`/post/${value.id}`)}}>
        <div className='title'>{value.title}</div>
        </div>)
      })}
    </div>
    
    </div>


  )
}

export default Profile