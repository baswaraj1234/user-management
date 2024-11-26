import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Define the Layout component
const Layout = () => {
  return (
    <div className="layout">
      {/* Header Section */}
      <header>
        <Header />
      </header>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Main Content Section */}
      <main className="content">
        <Outlet />
      </main>
      {/* Footer Section */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
