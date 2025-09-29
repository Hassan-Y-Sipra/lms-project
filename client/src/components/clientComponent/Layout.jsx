import React from 'react'
import Header from './Header'
import{Outlet}from "react-router-dom"

const Layout = () => {
  return (
    <>
    <Header/>
 <div className="flex flex-col min-h-screen">
        <main className="pb-1 flex-grow mt-0.5 ">
        <Outlet/>
    </main>
  </div>
    </>
  )
}

export default Layout