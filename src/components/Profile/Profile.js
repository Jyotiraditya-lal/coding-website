import { Button } from "primereact/button";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import LoginContext from "../Login/store/loginContext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Profile = () => {
  const userString = localStorage.getItem("LoggedinUser");
  const user = JSON.parse(userString);
  const [visible, setVisible] = useState(false);
  const [changePassDialog, setChangePassDialog] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [newImage, setNewImage] = useState(null);
  const toast = useRef(null);
  const [header, setHeader] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [currPassword, setCurrPassword] = useState("");
  const ctx = useContext(LoginContext);

  let submissionsString = localStorage.getItem("submissions");
  let allSubmissions = submissionsString ? JSON.parse(submissionsString) : {};

  let submissions = allSubmissions[user.id] || [];

  const changePasswordHandler = (e) => {
    e.preventDefault();

    if (currPassword !== user.password) {
      toast.current.show({
        severity: "error",
        summary: "Incorrect password",
        detail: "You have entered the current password incorrectly",
      });
    } else if (password.length < 7) {
      toast.current.show({
        severity: "error",
        summary: "Low password length",
        detail: "Password should have at least 7 characters ",
      });
    } else {
      user.password = password;

      const usersString = localStorage.getItem("users");
      const users = JSON.parse(usersString);

      users.forEach((u) => {
        if (u.id === user.id) {
          u.password = password;
        }
      });

      localStorage.setItem("loggedinUser", JSON.stringify(user));
      localStorage.setItem("users", JSON.stringify(users));

      ctx.logout("changePassword");
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Empty name",
        detail: "Name field is empty",
      });
    } else if (email.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Empty email",
        detail: "Email field is empty",
      });
    } else {
      user.name = name;
      user.email = email;

      const usersString = localStorage.getItem("users");
      const users = JSON.parse(usersString);

      users.forEach((u) => {
        if (u.id === user.id) {
          u.name = name;
          u.email = email;
        }
      });

      localStorage.setItem("loggedinUser", JSON.stringify(user));
      localStorage.setItem("users", JSON.stringify(users));

      toast.current.show({
        severity: "success",
        summary: "Saved successfully",
        detail: "Data saved successfully",
      });
    }
  };

  const openPassDialog = () => {
    setChangePassDialog(true);
    setHeader("Change password");
  };

  const hideDialog = () => {
    setVisible(false);
    setChangePassDialog(false);
    setPassword("");
    setCurrPassword("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.includes("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Invalid file type",
        detail: "Please upload a valid image file (JPEG or PNG).",
      });
    }
  };

  useEffect(() => {
    if (newImage) {
      changeImageHandler(newImage);
    }
  }, [newImage]);

  const changeImageHandler = (imageUrl) => {
    if (!imageUrl) {
      toast.current.show({
        severity: "error",
        summary: "No Image Selected",
        detail: "Please select a valid image",
      });
    } else {
      user.imgUrl = imageUrl;
      const usersString = localStorage.getItem("users");
      const users = JSON.parse(usersString);

      users.forEach((u) => {
        if (u.id === user.id) {
          u.imgUrl = imageUrl;
        }
      });

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedinUser", JSON.stringify(user));
      setVisible(false);
      toast.current.show({
        severity: "success",
        summary: "Profile image updated",
        detail: "Profile image updated successfully",
      });
      setNewImage(null);
    }
  };

  return (
    <React.Fragment>
      <ConfirmDialog />
      <Dialog
        visible={visible || changePassDialog}
        header={header}
        onHide={hideDialog}
      >
        {changePassDialog && (
          <div className="w-full max-w-lg mx-auto">
            <div className="flex mb-3">
              <p className="font-bold w-1/3">Current password</p>
              <div className="relative w-2/3">
                <InputText
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border p-inputtext-sm pr-10 px-2"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  style={{ borderColor: "black" }}
                />
                <i
                  className={`absolute right-2 top-[28%] transform -translate-y-1/2 cursor-pointer ${
                    !showPassword ? "pi pi-eye" : "pi pi-eye-slash"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className="flex mb-3">
              <label className="font-bold w-1/3">New password</label>
              <div className="relative w-2/3">
                <InputText
                  id="confpassword"
                  type={showNewPass ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full border p-inputtext-sm pr-10 px-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderColor: "black" }}
                />
                <i
                  className={`absolute right-1 top-[50%] px-2 transform -translate-y-1/2 cursor-pointer ${
                    !showNewPass ? "pi pi-eye" : "pi pi-eye-slash"
                  }`}
                  onClick={() => setShowNewPass(!showNewPass)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                rounded
                raised
                className="bg-blue-700 text-white hover:bg-blue-600 mt-4"
                tooltip="Change password"
                tooltipOptions={{ position: "left" }}
                icon="pi pi-save"
                onClick={changePasswordHandler}
              />
            </div>
          </div>
        )}
      </Dialog>

      <Toast ref={toast}></Toast>

      <div className="flex rounded-lg shadow-md w-full">
        <div className="w-1/2 mb-5">
          <div className="flex justify-center items-center">
            <img
              src={user.imgUrl}
              className="rounded-full h-96 object-contain py-4"
              alt="User profile"
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer bg-blue-700 text-white px-4 py-2 rounded-full hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-700 text-white px-4 py-2 rounded-full"
            >
              Change profile image
            </label>
          </div>
        </div>

        <div className="w-1/2 mb-5 mt-20 text-2xl">
          <div className="flex mb-3">
            <p className="font-bold">Name</p>
            <div className="ml-3 w-3/4">
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderColor: "black" }}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex mb-3">
            <p className="font-bold">Email</p>
            <div className="ml-3 w-3/4">
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: "black" }}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex mb-3">
            <p className="font-bold">Total submissions</p>
            <p className="ml-3">{submissions.length}</p>
          </div>
          <div className="flex justify-end">
            <div className="flex justify-end items-end mt-32 mr-5">
              <Button
                className="bg-blue-700 hover:bg-blue-600 text-white mr-5 rounded-full"
                icon="pi pi-lock"
                tooltip="Change password"
                tooltipOptions={{ position: "top" }}
                onClick={openPassDialog}
                rounded
                raised
              ></Button>
              <Button
                className="bg-red-700 hover:bg-red-600 text-white mr-5 rounded-full"
                icon="pi pi-trash"
                tooltip="Delete account"
                tooltipOptions={{ position: "top" }}
                onClick={() => {
                  confirmDialog({
                    message: "Are you sure you want to delete this account?",
                    header: "Delete account",
                    icon: "pi pi-trash",
                    defaultFocus: "accept",
                    accept: () => {
                      ctx.deleteAccount(user.id);
                    },
                    acceptClassName:
                      "bg-blue-700 hover:bg-blue-600 ml-3 px-2 py-1 text-white",
                    acceptIcon: "pi pi-check",
                    rejectClassName:
                      "hover:bg-gray-100 px-2 py-1 border border-blue-200 ",
                    rejectIcon: "pi pi-times",
                  });
                }}
                rounded
                raised
              ></Button>
              <Button
                className="bg-blue-700 hover:bg-blue-600 text-white mr-5 rounded-full"
                icon="pi pi-save"
                tooltip="Save changes"
                tooltipOptions={{ position: "top" }}
                onClick={(event) => {
                  confirmDialog({
                    message: "Are you sure you want to save changes?",
                    header: "Save changes",
                    icon: "pi pi-save",
                    defaultFocus: "accept",
                    accept: () => {
                      saveHandler(event);
                    },
                    acceptClassName:
                      "bg-blue-700 hover:bg-blue-600 ml-3 px-2 py-1 text-white",
                    acceptIcon: "pi pi-check",
                    rejectClassName:
                      "hover:bg-gray-100 px-2 py-1 border border-blue-200",
                    rejectIcon: "pi pi-times",
                  });
                }}
                rounded
                raised
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
