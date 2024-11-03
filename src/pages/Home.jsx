import React, { useState } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import RecentChats from "../components/RecentChats";
import ActiveUsers from "../components/ActiveUsers";
import Chat from "../components/Chat";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import Profile from "../components/Profile";
import { Link } from "react-router-dom";

function Home() {
  
  const [view, setView] = useState("recentChats"); // To toggle between views
  const [currentChat, setCurrentChat] = useState(null); // Holds current chat object

  const token = sessionStorage.getItem("token");

  // If there's no token, display a message to log in
  if (!token) {
    return (
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "linear-gradient(#FF8DA6,#B671FF)",
          minHeight: "100vh",
        }}
      >
        <div className="col-md-6 text-center">
          <div
            className="border border-3 border-info shadow rounded-4 p-5"
            style={{
              backgroundImage: "linear-gradient(#563e43,#4c3c5d)",
              color: "white",
            }}
          >
            <h2>Please Log In</h2>
            <p>You need to log in to access the chat features.</p>
            <Link to={'/'}><button className="btn btn-danger">Login</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "linear-gradient(#FF8DA6,#B671FF)",
          minHeight: "100vh",
        }}
      >
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="border border-3 border-info shadow rounded-4 " style={{backgroundImage: "linear-gradient(#563e43,#4c3c5d)", height:"90vh"}}>
            <div className="row m-2 mt-3">
              <div className="col-4 ">
                <button
                  className="btn btn-success p-2"
                  onClick={() => setView("recentChats")}
                  style={{ width: "100%" }}
                >
                  Recent Chats
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-primary p-2"
                  style={{ width: "100%" }}
                  onClick={() => setView("users")}
                >
                  Users
                </button>
              </div>

              <div className="col-4">
                <button
                  className="btn btn-info p-2"
                  style={{ width: "100%" }}
                  onClick={() => setView("profile")}
                >
                  Profile
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <div
                className="m-3"
                style={{
                  width: "75%",
                  height: "3px",
                  backgroundColor: "white",
                }}
              ></div>
            </div>

            <div className="row d-flex justify-content-center align-items-center m-3">
              {/* Conditionally render based on view */}
              {view === "recentChats" ? (
                <RecentChats/>
              ) : view === "users" ? (
                <ActiveUsers/>
              ) : (
                <Profile />
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
}

export default Home;
