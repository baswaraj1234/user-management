import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import UserList from "./features/Users/UserList";
import CreateUser from "./features/Users/CreateUser";
import Layout from "./layouts/UserLayout";
import ErrorPage from "components/ErrorPage";

const App: React.FC = () => {
  return (
    // Wrapping the app with BrowserRouter to enable client-side routing
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/userlist" />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
