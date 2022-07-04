import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Newpost() {
  const initialValues={
    title: "",
    text: "",
  };
  const validationSchema=Yup.object().shape({
    title: Yup.string().required(),
    text: Yup.string().required(),
  });
  let navigate=useNavigate()
  const onSubmit=(data)=>{
    axios.post("http://localhost:3001/posts", data, {

        headers:{
          accessToken: localStorage.getItem("accessToken"),
        },
    }).then((response)=>{
      if(response.data.error)
      {
        console.log(response);
        alert("User not authenticated. Please log in");
        navigate("/users/login");
      }
      else{
        navigate("/");
      }
    }, )
  };
  return (
    <div className="Newpost page">
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="inputcreatepost" name="title" placeholder="Sample Title" />
          <label>PostText: </label>
          <ErrorMessage name="text" component="span" />
          <Field id="inputcreatepost" name="text" placeholder="Sample Text" />
          <button>Post it!</button>
        </Form>
    </Formik>
    </div>
  )
}

export default Newpost