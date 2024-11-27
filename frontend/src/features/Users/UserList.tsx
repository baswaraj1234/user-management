import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Box, Typography } from "@mui/material";
import "./UserList.css";
import { toast } from "react-toastify";

// Define the structure of a user object
interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserList: React.FC = () => {

  // State to store the list of users
  const [users, setUsers] = useState<IUser[]>([]);

  // Define the columns for the DataGrid
  const columns = [
    { field: "firstName", headerName: "First name", flex: 1 },
    { field: "lastName", headerName: "Last name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  // Fetch user data when the component mounts
  useEffect(() => {
    // Make a GET request to fetch user data from the backend
    axios
      .get(`${process.env.REACT_APP_API_URL}`)
      .then((response) => {
        setUsers(response.data)
        console.log('Fetched user data successfully');
      })
      .catch((error) => {
          // Handle other errors
          if(error.response?.data?.error) toast.error(error.response?.data?.error);
      });
  }, []);

  return (
    <Container maxWidth="xl" className="user-list-container">
      <Typography variant="h4" component="h4" className="title" gutterBottom>
        User List
      </Typography>
      <Box className="data-grid-container">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick/>
      </Box>
    </Container>
  );
};

export default UserList;
