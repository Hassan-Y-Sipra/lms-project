import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className=" w-[15%]  flex  ">
        <div className=" max-w-15%  h-[630px] px-8 py-5  flex border-r-2 border-r-amber-200  text-blue-700 pb-80">
          <ul className="flex flex-col gap-y-5 ">
            <NavLink to="/admin/dashboard">
              <li className="flex  gap-3 ">
                <i className="fa-solid fa-chart-line  "></i>Dashboard
              </li>
            </NavLink>

            <NavLink to="/admin/course">
              <li className="flex  gap-3">
                <i className="fa-solid fa-graduation-cap"></i>Courses
              </li>
            </NavLink>
            <li className="flex  gap-3">
              <i className="fa-solid fa-gear"></i>Settings
            </li>
          </ul>
        </div>

     
      </div>
    </>
  );
};

export default Sidebar;
