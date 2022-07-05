import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
function Editpost() {
    let {id}=useParams();
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
    axios.put(`http://localhost:3001/posts/edit/${id}`, data, {
    }).then((response)=>{
        navigate(`/post/${id}`);
    }, )
  };
  return (
    <div className="Editpost page"> Editpost page
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="inputcreatepost" name="title" placeholder="Sample Title" />
          <label>PostText: </label>
          <ErrorMessage name="text" component="span" />
          <Field id="inputcreatepost" name="text" placeholder="Sample Text" />
          <button>Edit it!</button>
        </Form>
    </Formik>
    
    </div>
  )
}

export default Editpost