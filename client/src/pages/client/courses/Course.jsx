import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../../../assets/images/thruv.png";
import { NavLink } from "react-router-dom";

const Course = () => {
  const [course, setCourse] = useState([]);
  const URL = import.meta.env.VITE_URL;

  const getCourse = () => {
    axios
      .get(`${URL}/courses`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      {course.map((item) => (
        <div key={item.id} className="w-full mt-5 p-8 bg-amber-200">
          <div
            className="w-[500] h-160 relative flex items-center justify-start text-white pt-10 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${bgImg})` }}
          >
            {/* Overlay for better text visibility (optional) */}

            {/* Text left side */}
            <div className=" w-170 -mt-50 pl-20">
              <div key={item.id} className=" flex  ">
                <p className="text-12 font-bold bg-white text-black p-2 rounded-ee-2xl rounded-ss-2xl">
                  PRODUCTIVITY
                </p>
              </div>
              <div className="mt-7">
                <span className="text-3xl font-bold ">{item.title}</span>
              </div>
              <div className="text-[22px] font-sans mt-5">
                <p> {item.description}</p>
              </div>

              <NavLink to={`/module/${item.id}`}>
                <div className="mt-10 ">
                  <button className="bg-white text-black py-2 px-5 rounded-3xl  cursor-pointer font-bold">
                    GET STARTED
                  </button>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Course;
