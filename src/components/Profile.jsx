import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getUserApi, updateApi } from "../services/allApi";
import { serverUrl } from "../services/serverUrl";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [see, setSee] = useState(false);
  
  const [editProfile, setEditProfile] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
  });

  // password show hide
  const handleClick = () => {
    setSee(!see);
  };

  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(false);

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getUserApi(reqHeader);
      if (result.status === 200) {
        setUser(result.data);
        setEditProfile({
          username: result.data.username,
          email: result.data.email,
          password: result.data.password,
          profile: result.data.profile,
        });
      }
    }
  };

  // clear edit function
  const handleClear = () => {
    setEditProfile({
      username: user?.username || "",
      email: user?.email || "",
      password: user?.password || "",
      profile: "",
    });
    setPreview("");

    setKey(!key);
  };

  // handle image file selection
  const handleFile = (e) => {
    setEditProfile({ ...editProfile, profile: e.target.files[0] });
  };

  const handleClose = () => {
    handleClear()
    setShow(false); 
  };

  useEffect(() => {
    if (editProfile.profile instanceof File) {
      setPreview(URL.createObjectURL(editProfile.profile));
    }
  }, [editProfile.profile]);

  const handleEdit = async () => {
    const { username, email, password, profile } = editProfile;

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("email", email);
    reqBody.append("password", password);
    preview?reqBody.append("profile",profile):reqBody.append("profile",user.profile)

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": preview ? "multipart/form-data" : "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await updateApi(reqBody, reqHeader);
      if (result.status === 200) {
        alert("Edited successfully");
        getUser()
        handleClose();
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleShow = () => {
    setEditProfile({
      username: user.username,
      email: user.email,
      password: user.password,
      profile: user.profile,
    });
    setShow(true);
  };

  const handleLogout=()=>{
    sessionStorage.removeItem('token')
    navigate('/')

    useEffect(() => {
      if (!sessionStorage.getItem("token")) navigate('/');
    }, []);
  }



  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="m-md-2 px-md-5 d-flex justify-content-center align-items-center flex-column">
        <div className="ms-auto px-md-5">
          <button className="btn btn-outline-danger  text-white fs-5" onClick={handleLogout}>Logout</button>
          <button className="ms-2 btn btn-outline-info text-white fs-5" onClick={handleShow}>
            <FontAwesomeIcon icon={faPenToSquare}  /> Edit
          </button>
        </div>

        <img
          src={
            user.profile
              ? `${serverUrl}/uploads/${user.profile}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFgQrbwN1RthTLcuPTI9yRyRAJDwHyP1KSQ&s"
          }
          alt="profile img"
          className="rounded-circle mt-3"
          style={{ height: "150px", width: "150px" }}
        />
        <h3 className="text-white mt-4">{user?.username}</h3>
        <h4 className="text-white mt-4">Email Id: {user?.email}</h4>
      </div>

      {/* edit profile modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-black">
            Edit your Profile here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <label htmlFor="projImg">
              <input
                type="file"
                id="projImg"
                style={{ display: "none" }}
                key={key}
                onChange={(e) => handleFile(e)}
              />
              <img
                src={
                  preview
                    ? preview
                    : user.profile
                    ? `${serverUrl}/uploads/${user.profile}`
                    : "https://woxikon.co.nz/uploads/large-default.jpg"
                }
                alt="no image"
                height={"150px"}
                width={"150px"}
                className="rounded-circle mb-3"
              />
            </label>
          </div>

          <div>
            <Form.Floating className="mb-3">
              <Form.Control
                id="username"
                type="text"
                placeholder="Username"
                value={editProfile.username}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, username: e.target.value })
                }
              />
              <label htmlFor="username">Name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="email"
                value={editProfile.email}
                type="email"
                placeholder="Email address"
                readOnly
              />
              <label htmlFor="email">Email address</label>
            </Form.Floating>

            <Form.Floating className="mb-3 position-relative">
              <Form.Control
                id="password"
                value={editProfile.password}
                type={see ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setEditProfile({ ...editProfile, password: e.target.value })
                }
              />
              <label htmlFor="password">Password</label>
              <p
                className="fs-4 position-absolute"
                onClick={handleClick}
                style={{
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-55%)",
                }}
              >
                {see ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </p>
            </Form.Floating>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger p-2 px-3 rounded mx-3" onClick={handleClear}>
            Clear
          </button>
          <button
            type="button"
            className="btn btn-success p-2 px-3 rounded fw-bold" onClick={handleEdit}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
