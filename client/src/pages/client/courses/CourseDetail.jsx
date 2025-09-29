// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CourseDetail = () => {
//   const { courseId } = useParams(); // url se course id
//   const [modules, setModules] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:7000/course/${courseId}/detail`)
//       .then((res) => {
//         setModules(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching course detail:", err);
//       });
//   }, [courseId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Course Detail</h1>

//       {modules.length === 0 ? (
//         <p>No modules found for this course.</p>
//       ) : (
//         modules.map((module) => (
//           <section>
//           <div key={module.module_id} className="mb-6 p-4 border rounded-lg shadow">
//             {/* Module Title */}
//             <h2 className="text-xl font-semibold mb-2">{module.module_title}</h2>

//             {/* Videos */}
//             {module.videos.length > 0 ? (
//               <ul className="list-disc pl-6 space-y-1">
//                 {module.videos.map((video) => (
//                   <li key={video.video_id}>
//                     <span className="font-medium">{video.title}</span> {" - "}
//                     <span className="text-gray-600">{video.duration} min</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No videos in this module.</p>
//             )}
//           </div>
//           </section>
//         ))
//       )}
//     </div>
//   );
// };

// export default CourseDetail;
