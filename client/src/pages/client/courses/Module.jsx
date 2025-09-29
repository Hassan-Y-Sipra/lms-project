import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import moduleImg from "../../../assets/images/moduleimg.png";

const Module = () => {
  const [module, setModule] = useState([]);
  const [lesson, setLesson] = useState({});
  const [course, setCourse] = useState([]);
  console.log("course", course);

  const [openModule, setOpenModule] = useState(null);

  const { id } = useParams();
  const URL = import.meta.env.VITE_URL;

  const getCourse = () => {
    axios
      .get(`${URL}/course/${id}`)
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

  const getModules = () => {
    axios
      .get(`${URL}/modules/${id}`)
      .then((res) => {
        setModule(res.data);
        res.data.forEach((mod) => getLesson(mod.id));
      })
      .catch((err) => console.log(err));
  };

  const getLesson = (moduleId) => {
    axios
      .get(`${URL}/lesson/${moduleId}`)
      .then((res) => {
        setLesson((prev) => ({
          ...prev,
          [moduleId]: res.data,
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id) getModules();
  }, [id]);

  const toggleModule = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  // ✅ Helper functions
  const timeToSeconds = (time) => {
    const parts = time.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    } else {
      seconds = parts[0];
    }
    return seconds;
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  // ✅ Total duration calculation
  const allLessons = Object.values(lesson).flat(); // saare modules ke lessons ek array me
  const totalSeconds = allLessons.reduce(
    (acc, lessonItem) => acc + timeToSeconds(lessonItem.duration),
    0
  );
  const totalDuration = formatTime(totalSeconds);

  return (
    <div className="w-full  ">
      <div className="w-full min-h-200 bg-black pt-10 pb-16 border-b-1 border-b-cyan-700">
        <div className="text-center mb-10">
          <h1 className="text-amber-300 text-4xl font-bold">
            Course Curriculum
          </h1>
          <p className="text-gray-300">
            Here’s a detailed breakdown of what exactly you will learn.
          </p>
        </div>

        <div className="w-full flex gap-10 px-8">
          <div className="w-5xl   space-y-4  ">
            {module.map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(item.id)}
                  className="w-full flex  items-center px-10 py-4 text-left hover:bg-gray-700 transition"
                >
                  <i
                    className={`fa-solid fa-chevron-down text-amber-300 transform transition-transform duration-300 ${
                      openModule === item.id ? "rotate-180" : ""
                    }`}
                  ></i>

                  <div className=" w-full  flex justify-between items-center ">
                    <span className=" text-white text-lg font-semibold pl-7">
                      {item.title}
                    </span>
                    <span className="text-gray-400 bg-black/20 rounded-2xl text-sm  px-7 py-1.5 pl-7">
                      Module &nbsp;{index + 1}
                    </span>
                  </div>
                </button>

                {/* Lessons */}
                <div
                  className={`transition-all duration-500 overflow-hidden  ${
                    openModule === item.id ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="px-14 py-4 bg-gray-900 space-y-3">
                    {lesson[item.id]?.length > 0 ? (
                      lesson[item.id].map((lessonItem) => (
                        <div
                          key={lessonItem.id}
                          className="flex items-center justify-between p-3 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                        >
                          {/* Left side: icon + name + duration */}
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-play text-amber-300"></i>
                            <p className="max-w-48  text-gray-400 font-medium truncate">
                              {lessonItem.name}
                            </p>
                          </div>

                          <span className="text-amber-300 font-medium">
                            {lessonItem.duration}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No lessons available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* *****************right side content************* */}

          <div className="w-[520px] bg-black/20 rounded-2xl border-2   border-cyan-700 ">
            <div className="p-5">
              <img src={moduleImg} />
              {course.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center items-center pt-5"
                >
                  <NavLink to={`/checkout/${item.id}`}>
                    <button className="bg-amber-300 hover:bg-amber-200 font-bold px-36 py-5 rounded-2xl cursor-pointer">
                      JOIN NOW
                    </button>
                  </NavLink>
                </div>
              ))}

              <div className="flex gap-5 bg-cyan-800 mt-5 py-2.5 px-4 rounded-2xl text-white">
                <div className="flex gap-2">
                  <i className="fa-solid fa-layer-group text-gray-400 mt-1"></i>
                  <span className="text-white">{module.length} Modules</span>
                </div>
                <div className="flex gap-2">
                  <i className="fa-solid fa-video text-gray-400 mt-1"></i>
                  <span className="text-white">
                    {totalDuration} Hours of video content
                  </span>
                </div>
              </div>

              <div className="text-gray-400 mt-5">
                <h5>What you will get ?</h5>
                <div className="mt-3 ">
                  <ul className="space-y-2 w-full">
                    <div className="flex space-x-2.5">
                      <li className="w-7 h-7 text white bg-emerald-400 text-black pl-1.5 pt-0.5 rounded-2xl flex ">
                        &#10004;{""}
                      </li>

                      <span className="w-full">Easy payment method </span>
                    </div>

                    <div className="flex space-x-2.5">
                      <li className="w-7 h-7 text white bg-emerald-400 text-black pl-1.5 pt-0.5 rounded-2xl flex ">
                        &#10004;{""}
                      </li>

                      <span className="w-full">
                        Lifetime Access of the Course{" "}
                      </span>
                    </div>
                    <div className="flex space-x-2.5">
                      <li className="w-7 h-7 text white bg-emerald-400 text-black pl-1.5 pt-0.5 rounded-2xl flex ">
                        &#10004;{""}
                      </li>

                      <span className="w-full">Learn Anytime, Anywhere</span>
                    </div>
                    <div className="flex space-x-2.5">
                      <li className="w-7 h-7 text white bg-emerald-400 text-black pl-1.5 pt-0.5 rounded-2xl flex ">
                        &#10004;{""}
                      </li>

                      <span className="w-full">
                        Guaranteed Best Pricing from the Market
                      </span>
                    </div>
                    <div className="flex space-x-2.5">
                      <li className="w-7 h-7 text white bg-emerald-400 text-black pl-1.5 pt-0.5 rounded-2xl flex ">
                        &#10004;{""}
                      </li>

                      <span className="w-full">24/7 Instant Email Support</span>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ***********************2****************************** */}
    </div>
  );
};

export default Module;
