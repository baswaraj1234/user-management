import React from "react";
import { useNavigate } from "react-router-dom";

//component to display page not found page
const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="pageNotFound" onClick={() => navigate("/")}>
        Go to User List
      </button>
    </div>
  );
};

export default ErrorPage;
