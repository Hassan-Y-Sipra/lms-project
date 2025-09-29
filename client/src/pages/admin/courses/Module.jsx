import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Dashboard/Navbar";

import Sidebar from "../dashboard/Sidebar";
import { useParams } from "react-router-dom";
import Confirm from "../../../components/adminComponent/Confirm";

const Module = () => {
  const URL=import.meta.env.VITE_URL
  const [module, setModule] = useState([]);
  const { id } = useParams();
  const [confirmBox, setConfirmBox] = useState(false);
  const[lessonConfirmBox,setLesonConfirmBox]=useState(false)

  const [addModuleDataPopup, setAddModuleDataPopup] = useState(false);
  const [getCourseid, setGetCourseid] = useState([]);
  const [course_id, setCourse_id] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");

  const [updateModuleDataPopup, setUpdateModuleDataPopup] = useState(false);
  const [moduleId, setModuleId] = useState("");

  const [updateModule, setUpdatModule] = useState({
    id: "",
    course_id: "",
    title: "",
  });

  // ***********lesson state************
  const [lesson, setLesson] = useState({}); // 👈 array ki jagah object
  const [addLessonPopup, setAddLessonPopup] = useState(false);
  const [module_id, setModule_id] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [lessonUrl, setLesonUrl] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [updateLessonDataPopup, setUpdateLessonDataPopup] = useState(false);
  const [lessonId, setLessonId] = useState("");

  const [updateLesson, setUpdateLesson] = useState({
    id: "",
    module_id: "",
    name: "",
    url: "",
    description: "",
    duration: "",
  });

  const getModule = () => {
    axios
      .get(`${URL}/getmodule/${id}`)
      .then((res) => {
        setModule(res.data);

        // har ek module ke liye lesson fetch karna
        res.data.forEach((mod) => {
          getLesson(mod.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getModule();
    }
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`${URL}/deletemodule/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getModule();
        } else {
          console.log("module data is not deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setModuleTitle(value);
    } else if (name === "name") {
      setLessonName(value);
    } else if (name === "url") {
      setLesonUrl(value);
    } else if (name === "description") {
      setLessonDescription(value);
    } else if (name === "duration") {
      setLessonDuration(value);
    }
  };

  const fetchCourseId = () => {
    axios
      .get(`${URL}/getcourse`)
      .then((res) => {
        setGetCourseid(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCourseId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const moduleData = {
      course_id: course_id,
      title: moduleTitle,
    };
    axios
      .post(`${URL}/addnewmodule`, moduleData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getModule();
        setAddModuleDataPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = {
      course_id: course_id, // already number
      title: moduleTitle,
    };

    axios
      .put(`${URL}/updatemodule/${moduleId}`, updateData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setUpdatModule({ course_id: "", title: "", id: "" });
        getModule();
        setUpdateModuleDataPopup(false);
      })
      .catch((err) => console.log(err));
  };

  const updatestatus = (id, status) => {
    axios
      .put(`${URL}/updatemodulestatuse/${id}`, {
        status: status ? 1 : 0,
      })
      .then((res) => {
        getModule();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ************************Lesson [get,delete,add,update and status]******************************

  const getLesson = (moduleId) => {
    axios
      .get(`${URL}/getlesson/${moduleId}`)
      .then((res) => {
        // lesson ko moduleId ke key ke under store karo
        setLesson((prev) => ({
          ...prev,
          [moduleId]: res.data,
        }));
      })
      .catch((err) => {
        console.log("Lesson API Error =>", err);
      });
  };

  
  const deleteLesson = (id, moduleId) => {
    axios
      .delete(`${URL}/deletelesson/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getLesson(moduleId);
          
        } else {
          console.log("module data is not deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewLesson = (e) => {
    e.preventDefault();
    const lessonData = {
      module_id: module_id,
      name: lessonName,
      url: lessonUrl,
      description: lessonDescription,
      duration: lessonDuration,
    };
    axios
      .post(`${URL}/addnewlesson`, lessonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getLesson();
        getModule();
        setAddLessonPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateLessonData = (e) => {
    e.preventDefault();
    const updatelessondata = {
      module_id: module_id,
      name: lessonName,
      url: lessonUrl,
      description: lessonDescription,
      duration: lessonDuration,
    };
    axios
      .put(`${URL}/updatelesson/${lessonId}`, updatelessondata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUpdateLesson({
          module_id: "",
          name: "",
          url: "",
          description: "",
          duration: "",
          id: "",
        });
        setUpdateLessonDataPopup(false);
        getLesson();
        getModule();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="w-[80%] pl-100 -mt-[600px] ">
        <div className="mb-6 flex  items-center">
          <span className="font-bold text-2xl border-b-2 border-cyan-600 text-cyan-600">
            Modules
          </span>
          <div className="pl-86 flex gap-14">
            <button
              className="border-2 px-5 py-1 rounded-[7px] cursor-pointer hover:bg-[#E5E5E5] text-indigo-500"
              onClick={() => {
                setAddModuleDataPopup(true);
                fetchCourseId();
              }}
            >
              + Add Module
            </button>
            <button
              className="border-2 px-5 py-1 rounded-[7px] cursor-pointer hover:bg-[#E5E5E5] text-indigo-500"
              onClick={() => {
                setAddLessonPopup(true);
                getModule();
              }}
            >
              + Add Lesson
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {module.map((item, index) => (
            <div key={item.id} className="bg-gray-200 rounded-lg shadow p-4  ">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.status === 1}
                      onChange={(e) => updatestatus(item.id, e.target.checked)}
                    />
                    <div className="w-11 h-6 rounded-full relative overflow-hidden bg-red-500 peer-checked:bg-green-500 transition-colors duration-500 ease-in-out">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-500 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-500 peer-checked:translate-x-5 z-10"></div>
                    </div>
                  </label>

                  <div className="flex gap-4">
                    <i
                      className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:scale-110 transform transition"
                      onClick={() => {
                        setUpdateModuleDataPopup(true);
                        fetchCourseId();
                        setModuleId(item.id);
                        setCourse_id(item.course_id); // 👈 direct number
                        setModuleTitle(item.title);
                        
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-110 transform transition"
                      onClick={() => {
                        setConfirmBox(true);
                        setModuleId(item.id);
                      }}
                    ></i>
                    <Confirm
                      isOpen={confirmBox}
                      onClose={() => setConfirmBox(false)}
                      onConfirm={() =>
                        handleDelete(moduleId, setConfirmBox(false))
                      }
                    ></Confirm>
                  </div>
                </div>
              </div>

              {/*********************** Lessons List *************************/}
              <div className="mt-4 space-y-2 ">
                {lesson[item.id]?.length > 0 ? (
                  lesson[item.id].map((item) => (
                    <div
                      key={item.id}
                      className="flex p-3 rounded-md bg-white justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-700 max-w-150 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</p>
                      </div>
                      <div className="flex gap-4 group opacity-0 hover:opacity-100 pt-2">
                        <i
                          className=" text-[12px] fa-solid fa-pen-to-square text-gray-500 cursor-pointer hover:scale-110 transform transition"
                          onClick={() => {
                            setUpdateLessonDataPopup(true);
                            getModule();
                            setLessonId(item.id);
                            setModuleId(item.id);
                            setLessonName(item.name);
                            setLesonUrl(item.url);
                            setLessonDescription(item.description);
                            setLessonDuration(item.duration);
                          }}
                        ></i>

                        <i
                          className="text-[12px] fa-solid fa-trash text-neutral-500 cursor-pointer hover:scale-110 transform transition"
                          // onClick={() => deleteLesson(item.id, item.module_id)}
                          onClick={() => {
                            setLesonConfirmBox(true);
                            setLessonId(item.id);
                            setModule_id(item.module_id);
                          }}
                        ></i>
                        <Confirm
                          isOpen={lessonConfirmBox}
                          onClose={() => setLesonConfirmBox(false)}
                          onConfirm={() =>
                            deleteLesson(lessonId, item.module_id)
                          }
                        ></Confirm>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No lessons available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ********************add new module popup ************** **********/}
      {addModuleDataPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-40 z-50 ">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setAddModuleDataPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-emerald-600 mb-6">
              Add New Module
            </h3>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Title input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Select Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course
                </label>
                <select
                  name="course_id"
                  value={course_id} // 👈 yahan string hi hamesha rahega
                  onChange={(e) => setCourse_id(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select Course --</option>
                  {getCourseid.map((course) => (
                    <option key={course.id} value={String(course.id)}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ******************** Update Module data popup***************** ***/}
      {updateModuleDataPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opicity-40 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative animate-fadeIn">
            <button
              onClick={() => setUpdateModuleDataPopup(false)}
              className="absolute top-3 right-3 text-red text-2xl"
            >
              &times;
            </button>
            <h3 className="text-center text-2xl text-emerald-600 mb-6">
              Update Module Data
            </h3>
            <form className="space-y-5" onSubmit={handleUpdate}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={moduleTitle}
                  onChange={handleChange}
                  required
                  className="w-full border border-lg rounded px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course
                </label>
                <select
                  name="course_id"
                  value={String(course_id)} // React ko string chahiye
                  onChange={(e) => setCourse_id(Number(e.target.value))} // yahan convert
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select Course --</option>
                  {getCourseid.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button className="w-40 bg-emerald-500 text-white px-4 py-2 font-bold rounded-lg">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* *********************add new lesson popup************************ */}
      {addLessonPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opicity-40 z-50">
          <div className="bg-white w-full max-w-[650px] rounded-2xl p-6 shadow-lg relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setAddLessonPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-3xl cursor-pointer"
            >
              &times;
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-emerald-600  mb-6">
              Add New Lesson
            </h3>

            {/* Form */}
            <form onSubmit={addNewLesson} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Select Module */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Module
                </label>
                <select
                  name="module-id"
                  onChange={(e) => setModule_id(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Module --</option>
                  {module.map((module) => (
                    <option key={module.id} value={String(module.id)}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="text-center ">
                <button
                  type="submit"
                  className="w-40 bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* *********************Update Lesson data popup **********************/}
      {updateLessonDataPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opicity-40 z-50">
          <div className="bg-white w-full max-w-[650px] rounded-2xl p-6 shadow-lg relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setUpdateLessonDataPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-3xl cursor-pointer"
            >
              &times;
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-emerald-600  mb-6">
              Update Lesson
            </h3>

            {/* Form */}
            <form onSubmit={updateLessonData} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={lessonName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={lessonUrl}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={lessonDescription}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={lessonDuration}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Select Module */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course
                </label>
                <select
                  name="module_id"
                  value={String(module_id)} // React ko string chahiye
                  onChange={(e) => setModule_id(Number(e.target.value))} // yahan convert
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select Module --</option>
                  {module.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="text-center ">
                <button
                  type="submit"
                  className="w-40 bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Module;
