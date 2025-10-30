import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

import { Routes, Route } from 'react-router-dom';



const App = () => {
  return (
    <div>
       {/* <Routes>
          <Route path="/login" element={<LoginSignup />} />
        </Routes> */}
      <Navbar/>
      <Admin/>

    </div>
  )
}

export default App
