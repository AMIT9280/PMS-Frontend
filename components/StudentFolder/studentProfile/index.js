import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";

function StudentProfile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdatePasswordShown, setIsUpdatePasswordShown] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsUpdatePasswordShown(true);
  };
  const handleClose = () => setOpen(false);

  const handleProfileEditOpen = () => {
    setOpenProfile(true);
    setIsUpdateProfile(true);
  };
  const handleProfileEditClose = () => setOpenProfile(false);
  const router = useRouter();

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const handleEnrollment = (event) => {
    setEnrollment(event.target.value);
  };

  const changePassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "POST",
          body: JSON.stringify({
            email: userData.user.email,
            password: oldPassword,
            newPassword: newPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        router.push("/login");
        return responseData;
      }
      if (!response.ok) {
        throw new Error("Error changing password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleEditProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          email: email,
          department: department,
          enrollment_number: enrollment,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        router.push("/login");
        return responseData;
      }
      if (!response.ok) {
        throw new Error("Error changing password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-3xl text-center pb-4 font-bold mb-4">
            User Profile
          </h1>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="/img/team-2-800x800.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20"></div>
              </div>
              <div className="text-center mt-12">
                <div className="bg-gray-400 rounded-lg shadow-md p-4">
                  <div className="mb-4">
                    <label className="text-gray-600 font-bold">Name : </label>
                    {userData.user && (
                      <label className="text-red-500 font-bold">
                        {userData.user.name}
                      </label>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-600 font-bold">Email : </label>
                    {userData.user && (
                      <label className="text-red-500 font-bold">
                        {userData.user.email}
                      </label>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-600 font-bold">
                      Department :
                    </label>
                    {userData.user && (
                      <label className="text-red-500 font-bold">
                        {userData.user.department}
                      </label>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-600 font-bold">
                      Enrollment Number :
                    </label>
                    {userData.user && (
                      <label className="text-red-500 font-bold">
                        {userData.user.enrollment_number}
                      </label>
                    )}
                  </div>
                  <Button onClick={handleProfileEditOpen}>Edit Profile</Button>
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className=" mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Pavan & Nisarg
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>

                <Button onClick={handleOpen}>Update Password</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {isUpdatePasswordShown && (
                      <div className="mt-4">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="old-password-input"
                          >
                            Old Password
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="old-password-input"
                            type="password"
                            placeholder="********"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="new-password-input"
                          >
                            New Password
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="new-password-input"
                            type="password"
                            placeholder="********"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="confirm-password-input"
                          >
                            Confirm Password
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirm-password-input"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                            type="submit"
                            onClick={changePassword}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </Box>
                </Modal>
                <Modal
                  open={openProfile}
                  onClose={handleProfileEditClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {isUpdateProfile && (
                      <div className="mt-4">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="name-input"
                          >
                            Name
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name-input"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={handleName}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="email-input"
                          >
                            Email
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email-input"
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={handleEmail}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="department-input"
                          >
                            Department
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="department-input"
                            type="text"
                            placeholder="Department"
                            value={department}
                            onChange={handleDepartment}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="enrollment-input"
                          >
                            Enrollment number
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="enrollment-input"
                            type="text"
                            placeholder="Enrollment"
                            value={enrollment}
                            onChange={handleEnrollment}
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                            type="submit"
                            onClick={handleEditProfile}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentProfile;
