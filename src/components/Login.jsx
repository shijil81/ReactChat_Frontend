import { faUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../services/allApi';

function Login() {
  const navigate = useNavigate();

  // State to store user details for email and password
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });

  // State to toggle password visibility
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    
    if (!email || !password) {
      alert('Please fill in the form completely');
    } else {
      const result = await loginApi(userDetails);

      if (result.status === 200) {
        setUserDetails({ email: "", password: "" });
        sessionStorage.setItem("userId", result.data.existingUser._id);
        sessionStorage.setItem("token", result.data.token);
        alert('Login successful');
        navigate('/home');
      } else if (result.status === 406) {
        alert(result.response.data);
        setUserDetails({ email: "", password: "" });
      } else {
        setUserDetails({ email: "", password: "" });
        alert('Something went wrong');
      }
    }
  };

  return (
    <>
      <div style={{ backgroundImage: "linear-gradient(#FF8DA6, #B671FF)", height: '100vh', minHeight: '100vh' }}>
        <div className="row">
          <div className="col-md-4"></div>
          
          {/* Login Form Container */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className='border pt-3 rounded-4 shadow-lg my-5 m-3' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%' }}>
              
              {/* Logo and Title */}
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFgQrbwN1RthTLcuPTI9yRyRAJDwHyP1KSQ&s"
                  alt="logo"
                  width={"75px"}
                  height={"75px"}
                  className='shadow-lg rounded-circle'
                />
                <h3 className='text-center mt-2 text-black fw-bold'>Login</h3>
              </div>

              {/* Login Form */}
              <Form className='px-5 pt-4 pb-5'>
                
                {/* Email Input */}
                <div className='input-box position-relative'>
                  <input
                    type="text"
                    className='form-control p-2 text-center shadow rounded-5'
                    placeholder='Email Id'
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                  <FontAwesomeIcon icon={faUser} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }} />
                </div>

                {/* Password Input */}
                <div className='input-box position-relative'>
                  <input
                    type={show ? "text" : "password"}
                    className='form-control p-2 text-center shadow rounded-5 mt-4'
                    placeholder='Password'
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  />
                  <p className='fs-4 position-absolute' onClick={handleClick} style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}>
                    {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </p>
                </div>

                {/* Login Button */}
                <div className='d-flex justify-content-center align-items-center pt-4'>
                  <button
                    type='button'
                    className="btn btn-success p-2 rounded-5 mx-3 fw-bold shadow-lg"
                    style={{ width: '50%' }}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>

                {/* Register Link */}
                <p className='text-black pt-3 text-center'>
                  Are you a new user? <Link to={'/register'} className='text-black' style={{ textDecoration: 'none' }}><span className='fw-bold'>Register</span></Link>
                </p>
              </Form>
            </div> 
          </div>

          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
