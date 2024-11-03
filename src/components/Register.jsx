import { faUser,faEyeSlash,faEye,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../services/allApi'

function Register() {
  const navigate=useNavigate()
  const [show,setShow]=useState(false)

  const[userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:""
  })

  const handleClick=()=>{
    setShow(!show)
  }

  const handleRegister=async(e)=>{
    e.preventDefault()
    const {username,email,password}=userDetails
    if(!username || !email || !password){
      alert('please fill the field completly')
    }else{
      const result=await registerApi(userDetails)
      if(result.status==200){
        alert('Registration successfull')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })

        navigate('/')
      }else{
        alert('somthing went wrong please try again')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }

    }
  }
  return (
    <>
    
    <div style={{ backgroundImage: "linear-gradient(#FF8DA6,#B671FF)", height: '100vh', minHeight: '100vh' }}>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
               <div className='border pt-3  rounded-4 shadow-lg  my-5 m-3' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width:'100%'}}>
             <div className='d-flex align-items-center justify-content-center flex-column'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFgQrbwN1RthTLcuPTI9yRyRAJDwHyP1KSQ&s" alt="no image" width={"75px"} height={"75px"} className='shadow-lg rounded-circle'/>
                <h3 className='text-center mt-2 text-black fw-bold'>Register</h3>
             </div>
              <Form  className='px-5 pt-4 pb-5'>
              <div className='input-box position-relative'> 
                <input type="text" className='form-control p-2 text-center shadow rounded-5'  placeholder='Name' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
               <FontAwesomeIcon icon={faUser} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
               </div>
               <div className='input-box position-relative'> 
                <input type="text" className='form-control p-2 text-center shadow rounded-5 mt-4'  placeholder='Email Id' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
               <FontAwesomeIcon icon={faEnvelope} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
               </div>
                <div className='input-box position-relative'>
                  <input type={show?"text":"password"} className='form-control p-2 text-center shadow rounded-5 mt-4' placeholder='Password'onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
                  <p className='fs-4 position-absolute' onClick={handleClick} style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}>
                    {show? 
                    <FontAwesomeIcon icon={faEyeSlash}  />
                    :
                    <FontAwesomeIcon icon={faEye} />
                  }
                  </p>
                 </div>

                 <div className='d-flex justify-content-center align-items-center pt-4'>
                  <button type='button' className="btn btn-primary p-2  rounded-5 mx-3 fw-bold shadow-lg " style={{width:'50%'}} onClick={handleRegister}>Register</button>
                  </div>

                  <p className='text-black pt-3 text-center'>Already a user? <Link to={'/'} className='text-black' style={{textDecoration:'none'}}><span className='fw-bold'>Login</span></Link></p>
                </Form>
        </div> 
          </div>
          <div className="col-md-4"></div>
        </div>





    </div>
      
    </>
  )
}

export default Register
