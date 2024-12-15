import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "./loginContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import user1 from '../../../assets/User1.png'

const LoginContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const toast = React.useRef(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedin");
    setIsLoggedin(loggedInStatus === "true");
  }, []);

  const loginHandler = (email, password) => {
    const usersString = localStorage.getItem("Codingusers");
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find((u) => u.email === email);

    if (user) {
      if (user.password === password) {
        localStorage.setItem("loggedin", "true");
        setIsLoggedin(true);
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome back, ${user.name}!`,
        });
        localStorage.setItem("LoggedinUser", JSON.stringify(user));
      } else {
        toast.current.show({
          severity: "error",
          summary: "Login Failed",
          detail: "Incorrect password. Please try again.",
        });
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "User Not Found",
        detail: "No account found with this email.",
      });
    }
  };

  const logoutHandler = (from) => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("LoggedinUser");
    setIsLoggedin(false);
    if (from === "navbar") {
      toast.current.show({
        severity: "info",
        summary: "Logged Out",
        detail: "You have successfully logged out.",
      });
    } else if (from === "delete") {
      toast.current.show({
        severity: "info",
        summary: "Deleted successfully",
        detail: "User deleted successfully",
      });
    } else {
      toast.current.show({
        severity: "info",
        summary: "Password successfully changed",
        detail: "Password was successfully changed",
      });
    }
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
    const newUser = { ...user, imgUrl: user1 };

    const usersString = localStorage.getItem("Codingusers");
    const users = usersString ? JSON.parse(usersString) : [];

    users.push(newUser);
    
    localStorage.setItem("Codingusers", JSON.stringify(users));

    toast.current.show({
      severity: "success",
      summary: "Signed up Successful",
      detail: "User signed up successfully!",
    });
};


  return (
    <>
      <Toast ref={toast} />

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
