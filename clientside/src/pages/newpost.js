import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios"
function newpost() {
  const initialValues={
    title: "",
    text: "",
    author: "",
  };
  const validationSchema=Yup.object().shape({
    title: Yup.string().required(),
    text: Yup.string().required(),
    author: Yup.string().required(),
  });
  const onSubmit=(data)=>{
    axios.post("http://localhost:3001/posts", data).then((response)=>{
      console.log("entered into database");
    })
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
          <label>Username: </label>
          <ErrorMessage name="author" component="span" />
          <Field id="inputcreatepost" name="author" placeholder="Sample Username" />
          <button>Post it!</button>
        </Form>
    </Formik>
    </div>
  )
}

export default newpost