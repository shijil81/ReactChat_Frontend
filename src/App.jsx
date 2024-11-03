import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './pages/Home'
import Chat from './components/Chat'
import ActiveUsers from './components/ActiveUsers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/users' element={<ActiveUsers/>}/>
    </Routes>
    </>
  )
}

export default App
