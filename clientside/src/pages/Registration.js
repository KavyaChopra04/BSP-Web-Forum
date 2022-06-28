import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios"
function Registration() {
    const initialValues={
        username: "",
        password: "", 
        emailid : ""
      };
      const validationSchema=Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
        emailid: Yup.string().required(),
      });
      const onSubmit=(data)=>{
        axios.post("http://localhost:3001/users", data).then((response)=>{
          console.log("entered into database");
          console.log(response.data);
        })
      };
  return (
    <div className="regn page">
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field id="regnpage" name="username" placeholder="" />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field id="regnpage" name="password" placeholder="" />
          <label>EmailID: </label>
          <ErrorMessage name="emailid" component="span" />
          <Field id="regnpage" name="emailid" placeholder="" />
          <button>Register</button>
        </Form>
    </Formik>
    </div>
  )
}

export default Registration