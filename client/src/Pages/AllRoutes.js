

import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import Register from './Register'
const AllRoutes = () => {
  return (
  <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/register' element={<Register/>} />
  </Routes>
    
  )
}

export default AllRoutes
