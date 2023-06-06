import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { registerNewUserApi } from "./api/TodoApiService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

const RegistrationComponent = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <div>
        <div className="title">Welcome</div>
        <div className="subtitle mb-3">Let's create your account!</div>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().max(15, "Must be 15 characters or less"),
            lastName: Yup.string().max(20, "Must be 20 characters or less"),
            userName: Yup.string().max(10, "Must be 10 characters or less"),
            email: Yup.string().email("Invalid email address"),
            password: Yup.string().min(8, "Must be at least 8 characters"),
          })}
          onSubmit={(values) => {
            const user = {
              firstname: values.firstname,
              lastname: values.lastname,
              username: values.username,
              email: values.email,
              password: values.password,
            };

            registerNewUserApi(user)
              .then(() => {
                toast.success("Registration successful");
                navigate("/login");
              })
              .catch((error) => {
                toast.error(error.response.data.responseText);
                console.log(error);
              });
          }}
        >
          <Form className="form">
            <div className="form-group mb-4 py-2">
              <Field
                className="form-control"
                name="firstname"
                type="text"
                placeholder="First name"
              />
              <ErrorMessage name="firstName" />
            </div>
            <div className="form-group mb-4">
              <Field
                className="form-control"
                name="lastname"
                type="text"
                placeholder="Last Name"
              />
              <ErrorMessage name="lastName" />
            </div>
            <div className="form-group mb-4">
              <Field
                className="form-control"
                name="username"
                type="text"
                placeholder="Username"
              />
              <ErrorMessage name="userName" />
            </div>
            <div className="form-group mb-4">
              <Field
                className="form-control"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" />
            </div>
            <div className="form-group mb-4">
              <Field
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" />
            </div>
            <button className="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationComponent;
