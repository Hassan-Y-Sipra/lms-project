import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dasboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      
       
        <div className="w-[100%] flex justify-around gap-0.5 pl-60 -mt-[600px]">
            


          <div className="my-15 w-[20%] px-4 py-5 border-2 h-34 bg-[#E5E5E5] rounded-2xl cursor-pointer flex flex-col justify-between">
            <p className="font-bold text-2xl">📚 Total Courses</p>
            <span className="text-2xl mt-4 ">35</span>
          </div>



              <div className="my-15 w-[20%] px-4 py-5 border-2 h-34 bg-[#FBFC7] rounded-2xl cursor-pointer flex flex-col justify-between">
            <p className="font-bold text-2xl">📚 Total Lesson</p>
            <span className="text-2xl mt-4 ">105</span>
          </div>
                 <div className="my-15 w-[20%] px-4 py-5 border-2 h-34 bg-[#E5E5E5] rounded-2xl cursor-pointer flex flex-col justify-between">
            <p className="font-bold text-2xl">📚 Total Modules</p>
            <span className="text-2xl mt-4 ">75</span>
          </div>
                   <div className="my-15 w-[20%] px-4 py-5 border-2 h-34 bg-[#FBFC7] rounded-2xl cursor-pointer flex flex-col justify-between">
            <p className="font-bold text-2xl">📚 Total Videos</p>
            <span className="text-2xl mt-4 ">305</span>
          </div>
        </div>
    
    </>
  );
};

export default Dasboard;
