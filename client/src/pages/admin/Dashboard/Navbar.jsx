import React from "react";
import lmsLogo from "../../../assets/images/LMS-logo.png"
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate=useNavigate()

  const logOut=()=>{
    localStorage.removeItem("isLogin")
    navigate("/admin/login")

  }
  return (
    <>
      <div className="flex bg-gray-100 border-b-2 border-b-amber-200">
       
        <div className="w-15%">
          <img src={lmsLogo}alt="" className="w-41 h-24 cursor-pointer" />
          
        </div>
        <div className="w-85% flex  items-center pl-18 justify-around gap-180">
          <h1 className=" text-3xl text-blue-700   ">LMS PROJECT</h1>
          <div className="  flex gap-10 text-2xl cursor-pointer">
            <i className="fa-solid fa-magnifying-glass" ></i>
            <i className="fa-solid fa-user text-indigo-500" ></i>
            <i className="fa-solid fa-bell text-amber-500"></i>
            <i className="fa-solid fa-right-from-bracket text-red-600"
            onClick={logOut}
            ></i>
            
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Header;
