import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientRoute from './routes/clientRoutes/ClientRoute';
import AdminRoute from './routes/adminRoutes/AdminRoute';



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/*'element={<ClientRoute/>}/>
      <Route path='/admin/*'element={<AdminRoute/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App;
