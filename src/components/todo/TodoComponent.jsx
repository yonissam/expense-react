import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNewTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import * as yup from "yup";
import toast from "react-hot-toast";

export default function TodoComponent() {
  const { id } = useParams();
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [targetDate, setTargetDate] = useState("");

  const [amount, setAmount] = useState("");

  const [owner, setOwner] = useState("");

  const authContext = useAuth();

  const navigate = useNavigate();

  const username = authContext.username;

  const token = authContext.token;

  useEffect(() => retrieveTodos(), [id]);

  function retrieveTodos() {
    if (id != -1) {
      retrieveTodoApi(username, id, token)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      category: values.category,
      date: values.targetDate,
      amount: parseFloat(values.amount),
      owner: values.owner,
    };

    if (id == -1) {
      addNewTodoApi(username, todo, token)
        .then((response) => {
          toast.success("Todo added successfully");
          navigate("/todos");
        })
        .catch((error) => {
          toast.error("Error adding todo");
          console.log(error);
        });
    } else {
      updateTodoApi(username, id, todo, token)
        .then((response) => {
          toast.success("Todo updated successfully");
          navigate("/todos");
        })
        .catch((error) => {
          toast.error("Error updating todo");
          console.log(error);
        });
    }
  }

  function validate(values) {
    let errors = {
      // description: 'Enter a valid description'
    };
    if (!values.description) {
      errors.description = "Select an expense item";
    }
    if (!values.category) {
      errors.description = "Select a category";
    }
    if (!values.owner) {
      errors.description = "Select an owner";
    }
    if (values.description.length < 2)
      errors.description = "Enter at least 2 characters";

    if (
      values.targetDate == null ||
      values.targetDate == "" ||
      !moment(values.targetDate).isValid
    )
      errors.description = "Enter a target date";

    return errors;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center text-white">
      <div className="form ">
        <div className="title">Enter Details</div>

        <Formik
          initialValues={{ description, category, targetDate, amount, owner }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="owner"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group padding-top--24">
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Expense Item"
                />
              </fieldset>
              <fieldset className="form-group padding-top--24">
                <Field
                  as="select"
                  className="form-control"
                  name="category"
                  placeholder="Category"
                >
                  <option value="">Select Category</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Instacart">Instacart</option>
                  <option value="Rent">Rent</option>
                  <option value="Phone Bill">Phone Bill</option>
                  <option value="Electric Bill">Electric Bill</option>
                  <option value="Internet Bill">Internet Bill</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Injera">Injera</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </Field>
              </fieldset>
              <fieldset className="form-group padding-top--24">
                <Field
                  type="number"
                  className="form-control"
                  name="amount"
                  placeholder="Amount"
                />
              </fieldset>
              <fieldset className="form-group padding-top--24">
                <Field
                  as="select"
                  className="form-control"
                  name="owner"
                  placeholder="Owner"
                >
                  <option value="">Select Owner</option>
                  <option value="Yonatan">Yonatan</option>
                  <option value="Nebiyu">Nebiyu</option>
                </Field>
              </fieldset>
              <fieldset className="form-group padding-top--24">
                <Field
                  type="date"
                  className="form-control"
                  name="targetDate"
                  placeholder="Date"
                />
              </fieldset>
              <div>
                <button className="btn btn-success m-4" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
