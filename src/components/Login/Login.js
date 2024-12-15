import React, { useContext, useState } from "react";
import loginImg from "../../assets/login.jpg";
import LoginContext from "./store/loginContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [passFlag, setPassFlag] = useState(false);
  const [confirmPassFlag, setConfirmPassFlag] = useState(false);
  const [nameFlag, setNameFlag] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const ctx = useContext(LoginContext);

  const emailHandler = (e) => {
    const emailValue = e.target.value;
    if (emailValue.length === 0) {
      setEmailFlag(false);
    } else if (!emailValue.includes("@") || !emailValue.includes(".com")) {
      setEmailFlag(true);
    } else {
      setEmailFlag(false);
    }
    setEmail(emailValue);
  };

  const passwordHandler = (e) => {
    const passValue = e.target.value;
    if (passValue.length === 0) {
      setPassFlag(false);
    } else if (passValue.length < 7) {
      setPassFlag(true);
    } else {
      setPassFlag(false);
    }
    setPass(passValue);
  };

  const confirmPasswordHandler = (e) => {
    const confirmPassValue = e.target.value;
    if (confirmPassValue !== pass) {
      setConfirmPassFlag(true);
    } else {
      setConfirmPassFlag(false);
    }
    setConfirmPass(confirmPassValue);
  };

  const nameHandler = (e) => {
    const nameValue = e.target.value;
    if (nameValue.trim() === "") {
      setNameFlag(true);
    } else {
      setNameFlag(false);
    }
    setName(nameValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (showLoginForm) {
      ctx.login(email,pass);
    } else {
      const usersString = localStorage.getItem("Codingusers");
      const users = usersString ? JSON.parse(usersString) : [];
      ctx.addUser({
        id: users.length + 1,
        name: name,
        email: email,
        password: pass,
        imgUrl: imgUrl,
      });
      setShowLoginForm(true);
      setEmail("");
      setPass("");
      setConfirmPass("");
      setName("");
      setImgUrl("");
    }
  };
  const changeForm = () => {
    setShowLoginForm(!showLoginForm);
    setEmail("");
    setPass("");
    setConfirmPass("");
    setName("");
    setImgUrl("");
  };

  const isButtonDisabled =
    emailFlag ||
    passFlag ||
    email.length === 0 ||
    pass.length === 0 ||
    (showLoginForm === false &&
      (confirmPassFlag ||
        confirmPass.length === 0 ||
        nameFlag ||
        name.length === 0));
  return (
    <div className="bg-sky-400 flex justify-center items-center min-h-screen">
    <div className={`rounded-lg flex border ${showLoginForm? 'h-2/3 w-2/3': 'h-[70%] w-[70%]'}  mb-20 shadow-lg justify-center bg-white`}>
      <img src={loginImg} alt="" className="h-1/2 w-1/2 object-contain" />
  
      <div className="flex items-center justify-center mt-7 ml-14 md:ml-0 md:mt-0 w-1/2">
        <form className="space-y-4 w-3/4 max-w-sm" onSubmit={submitHandler}>
          {!showLoginForm && (
            <div>
              <div className="flex">
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name
                </label>
                <p className="text-red-600 ml-1">*</p>
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-inputtext-sm"
                value={name}
                onChange={nameHandler}
              />
              {nameFlag && <p className="text-red-500">Name cannot be empty</p>}
            </div>
          )}
  
          <div>
            <div className="flex">
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email
              </label>
              <p className="text-red-600 ml-1">*</p>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-inputtext-sm"
              value={email}
              onChange={emailHandler}
            />
            {emailFlag && <p className="text-red-500">Please enter a valid email</p>}
          </div>
          <div>
            <div className="flex">
              <label htmlFor="password" className="block text-lg font-medium mb-2">
                Password
              </label>
              <p className="text-red-600 ml-1">*</p>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-inputtext-sm pr-10"
                value={pass}
                onChange={passwordHandler}
              />
              <i
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                  !showPassword ? "pi pi-eye" : "pi pi-eye-slash"
                }`}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
  
            {passFlag && (
              <p className="text-red-500">
                Password should have at least 7 characters
              </p>
            )}
          </div>
  
          {!showLoginForm && (
            <React.Fragment>
              <div>
                <div className="flex">
                  <label
                    htmlFor="confpassword"
                    className="block text-lg font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <p className="text-red-600 ml-1">*</p>
                </div>
                <div className="relative">
                  <input
                    id="confpassword"
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full p-inputtext-sm"
                    value={confirmPass}
                    onChange={confirmPasswordHandler}
                  />
                  <i
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                      !showConfirmPass ? "pi pi-eye" : "pi pi-eye-slash"
                    }`}
                    onClick={() => {
                      setShowConfirmPass(!showConfirmPass);
                    }}
                  />
                </div>
                {confirmPassFlag && (
                  <p className="text-red-500">Passwords do not match</p>
                )}
              </div>
            </React.Fragment>
          )}
  
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`text-white px-5 py-1 mt-5 rounded-lg ${
                isButtonDisabled ? "bg-gray-400" : "bg-blue-800 hover:bg-blue-900"
              } `}
            >
              Submit
            </button>
          </div>
          <p
            onClick={changeForm}
            className="cursor-pointer text-blue-800 flex justify-center items-center"
          >
            {showLoginForm ? "Not a user? sign up" : "Account exists? login"}
          </p>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
