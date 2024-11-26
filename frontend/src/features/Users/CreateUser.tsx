import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css"; // Import the CSS file

// Define the CreateUser component
const CreateUser: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // Initialize Formik for form state and validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    // Define validation schema using Yup
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Must contain only letters")
        .max(100, "Must be 100 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Must contain only letters")
        .max(100, "Must be 100 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    // Define the onSubmit handler
    onSubmit: async (values, { resetForm }) => {
      try {
        // Make a POST request to create a user
        await axios.post("http://localhost:5000/api/users", values);
        toast.success("User created successfully!");
        resetForm(); // Clear form fields
        // Set focus back to the first name field
        if (firstNameRef.current) {
          firstNameRef.current.focus();
        }
        navigate("/userlist");
      } catch (error:any) {
        toast.error(error.response.data.error);
      }
    },
  });

  // Rendering the form
  return (
    <div className="form-container">
      <form autoComplete="off" onSubmit={formik.handleSubmit} className="form">
        <Typography variant="h4" className="title" gutterBottom>
          Create User
        </Typography>
        <div className="form-group">
          <TextField
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            error={Boolean(formik.errors.firstName && formik.touched.firstName)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.firstName &&
              formik.touched.firstName &&
              String(formik.errors.firstName)
            }
            inputRef={firstNameRef}
          />
        </div>
        <div className="form-group">
          <TextField
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            error={Boolean(formik.errors.lastName && formik.touched.lastName)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.lastName &&
              formik.touched.lastName &&
              String(formik.errors.lastName)
            }
          />
        </div>
        <div className="form-group">
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            error={Boolean(formik.errors.email && formik.touched.email)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.email &&
              formik.touched.email &&
              String(formik.errors.email)
            }
          />
        </div>
        <div className="button-group">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
