import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "./loginContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const LoginContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", title: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedin");
    setIsLoggedin(loggedInStatus === "true");
  }, []);

  const showToast = (type, title, message) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => setToast({ show: false, type: "", title: "", message: "" }), 3000);
  };

  const loginHandler = (email, password) => {
    const usersString = localStorage.getItem("Codingusers");
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find((u) => u.email === email);

    if (user) {
      if (user.password === password) {
        localStorage.setItem("loggedin", "true");
        setIsLoggedin(true);
        navigate("/");
        showToast("success", "Login Successful", `Welcome back, ${user.name}!`);
        localStorage.setItem("LoggedinUser", JSON.stringify(user));
      } else {
        showToast("danger", "Login Failed", "Incorrect password. Please try again.");
      }
    } else {
      showToast("warning", "User Not Found", "No account found with this email.");
    }
  };

  const logoutHandler = (from) => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("LoggedinUser");
    setIsLoggedin(false);
    let message = "You have successfully logged out.";
    if (from === "delete") message = "User deleted successfully.";
    else if (from === "password") message = "Password was successfully changed.";
    showToast("info", "Logged Out", message);
    navigate("/");
  };

  const deleteAccountHandler = (id) => {
    const usersString = localStorage.getItem("Codingusers");
    const users = usersString ? JSON.parse(usersString) : [];

    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("Codingusers", JSON.stringify(updatedUsers));

    logoutHandler("delete");
  };

  const addUserHandler = (user) => {
    const usersString = localStorage.getItem("Codingusers");
    const users = usersString ? JSON.parse(usersString) : [];

    users.push(user);
    localStorage.setItem("Codingusers", JSON.stringify(users));

    showToast("success", "Signed up Successful", "User signed up successfully!");
  };

  return (
    <>
      {toast.show && (
        <div
          className={`toast position-fixed bottom-0 end-0 m-3 bg-${toast.type}`}
          role="alert"
          style={{ zIndex: 1050 }}
        >
          <div className="toast-header">
            <strong className="me-auto">{toast.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setToast({ show: false, type: "", title: "", message: "" })}
            ></button>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      )}
      <LoginContext.Provider
        value={{
          isLoggedin,
          login: loginHandler,
          logout: logoutHandler,
          deleteAccount: deleteAccountHandler,
          addUser: addUserHandler,
        }}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default LoginContextProvider;
