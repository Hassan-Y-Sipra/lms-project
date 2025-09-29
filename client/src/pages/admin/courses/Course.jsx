import React, { useEffect, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../Dashboard/Navbar";
import { NavLink } from "react-router-dom";
import { FileBox } from "lucide-react";
import Confirm from "../../../components/adminComponent/Confirm";

const Course = () => {
  const URL = import.meta.env.VITE_URL;
  const [course, setCourse] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);

  const [addDataPopup, setAddDataPopup] = useState(false);
  const [updateDataPopup, setUpdateDataPopup] = useState(false);

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseAuthor, setCourseAuthor] = useState("");
  const [coursePrice, setCoursePrice] = useState("");

  const [, setUpdateForm] = useState({
    id: "",
    title: "",
    description: "",
    author: "",
    price: "",
  });

  const getCourse = () => {
    axios
      .get(`${URL}/getcourse`)
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

  const handleDelete = (id) => {
    axios
      .delete(`${URL}/deletecourse/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getCourse();
        } else {
          console.log("course data is not deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setCourseTitle(value);
    } else if (name === "description") {
      setCourseDescription(value);
    } else if (name === "author") {
      setCourseAuthor(value);
    } else if (name === "price") {
      setCoursePrice(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: courseTitle,
      description: courseDescription,
      author: courseAuthor,
      price: coursePrice,
    };
    axios
      .post(`${URL}/addnewcourse`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getCourse();
        setAddDataPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = {
      title: courseTitle,
      description: courseDescription,
      author: courseAuthor,
      price: coursePrice,
    };
    axios
      .put(`${URL}/updatecourse/${courseId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUpdateForm({
          title: "",
          description: "",
          author: "",
          price: "",
          id: "",
        });
        getCourse();
        setUpdateDataPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatestatus = (id, status) => {
    axios
      .put(`${URL}/updatecoursestatus/${id}`, {
        status: status ? 1 : 0,
      })
      .then((res) => {
        getCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="w-full pl-60 -mt-[600px] px-30">
        <div className="mb-6 flex justify-between">
          <span className="font-bold text-2xl border-b-2 border-cyan-600 text-cyan-600">
            Courses
          </span>
          <button
            className="border-2  border-indigo-500 text-indigo-500 px-5 rounded-[7px] cursor-pointer hover:bg-[#E5E5E5]"
            onClick={() => {
              setAddDataPopup(true);
            }}
          >
            Add +
          </button>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="w-full border border-gray-200 rounded-xl shadow-lg">
            {/* table header */}
            <thead className="bg-gradient-to-r bg-[#E5E5E5]   rounded-t-xl">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">ID</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Course Title
                </th>
                {/* <th className="py-3 px-4 font-semibold w-96">Description</th> */}
                <th className="py-3 px-4 text-left font-semibold">Author</th>
                <th className="py-3 px-4 text-left font-semibold">Price</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            {/*       table body */}
            <tbody className="divide-y divide-gray-200 bg-white">
              {course.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {item.title}
                  </td>

                  <td className="py-3 px-4 text-gray-700">{item.author}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    ₹{item.price}
                  </td>
                  <td className="px-4 py-2  text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.status === 1}
                        onChange={(e) =>
                          updatestatus(item.id, e.target.checked)
                        }
                      />
                      <div className="w-11 h-6 rounded-full relative overflow-hidden bg-red-500 peer-checked:bg-green-500 transition-colors duration-500 ease-in-out mt-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-500 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-800 peer-checked:translate-x-5 z-10"></div>
                      </div>
                    </label>
                  </td>
                  <td className="py-1 px-4 flex gap-4 mt-4 justify-center">
                    <i
                      className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:scale-110 transform transition"
                      onClick={() => {
                        setUpdateDataPopup(true);
                        setCourseId(item.id);
                        setCourseTitle(item.title);
                        setCourseDescription(item.description);
                        setCourseAuthor(item.author);
                        setCoursePrice(item.price);
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-110 transform transition"
                      onClick={() => {
                        setConfirmBox(true);
                        setCourseId(item.id);
                      }}
                    ></i>
                    <Confirm
                      isOpen={confirmBox}
                      onClose={() => setConfirmBox(false)}
                      onConfirm={() =>
                        handleDelete(courseId, setConfirmBox(false))
                      }
                    ></Confirm>
                    <NavLink to={`/admin/course/module/${item.id}`}>
                      <FileBox color="green " />
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* *************add new course data form popup************ */}
      {addDataPopup && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50 backdrop-blur-sm ">
          <div className="bg-white w-full max-w-4xl  rounded-2xl shadow-2xl relative animate-scaleIn px-14 py-4">
            {/* Close Button */}
            <button
              onClick={() => setAddDataPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition cursor-pointer"
            >
              ×
            </button>

            {/* Heading */}
            <h2 className="text-center text-3xl  text-cyan-600 ">
              Add New Course
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Description
                </label>

                <textarea

                  type="text"
                  name="description"
                  
                  
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter author"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-36 bg-cyan-400 hover:bg-cyan-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ************** course data update form popup*********** */}
      {updateDataPopup && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50 backdrop-blur-sm ">
          <div className="bg-white w-full max-w-4xl  rounded-2xl shadow-2xl relative animate-scaleIn px-14 py-4">
            {/* Close Button */}
            <button
              onClick={() => setUpdateDataPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition cursor-pointer"
            >
              ×
            </button>

            {/* Heading */}
            <h2 className="text-center text-3xl text-cyan-600  ">
              Course Data Update
            </h2>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseTitle}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  type="text"
                  name="description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={courseAuthor}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={coursePrice}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-36 bg-cyan-400 hover:bg-cyan-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition"
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

export default Course;
