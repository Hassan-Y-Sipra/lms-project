const express = require("express");
const router = express.Router();



const Login=require("../../controllers/admin/Login")
const Course = require ("../../controllers/admin/Course");
const Module =require ("../../controllers/admin/Module")
const Lesson=require("../../controllers/admin/Lesson")




router.route("/login").post(Login.Login)

// ************************course************************
router.route("/getcourse").get(Course.getCourses)
router.route("/deletecourse/:id").delete(Course.deleteCourse)
router.route("/addnewcourse").post(Course.addnewcourse)
router.route("/updatecourse/:id").put(Course.updateCourse)
router.route("/updatecoursestatus/:id").put(Course.updateCourseStatus)


// ***********************module*************************
router.route("/getmodule/:id").get(Module.getMoodule)
router.route("/deletemodule/:id").delete(Module.deleteModule)
router.route("/addnewmodule").post(Module.addnewModule)
router.route("/updatemodule/:id").put(Module.updateModule)
router.route("/updatemodulestatuse/:id").put(Module.updateStatus)

// **********************lesson***************************
router.route("/getlesson/:id").get(Lesson.getLesson)
router.route("/deletelesson/:id").delete(Lesson.deleteLesson)
router.route("/addnewlesson").post(Lesson.addnewLesson)
router.route("/updatelesson/:id").put(Lesson.updatelesson)



module.exports=router;
