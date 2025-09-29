const express = require("express");
const router = express.Router();

const BrandSlider = require("../../controllers/client/BrandSlider");
const Brand = require("../../controllers/client/Brand");
const BrandModel = require("../../controllers/client/BrandModel");
const Parts = require("../../controllers/client/Parts");
const partdetail = require("../../controllers/client/PartsDetail");


const courses=require("../../controllers/client/courses")

router.route("/getbrandslider").get(BrandSlider.getbrandslider);
router.route("/getbrand").get(Brand.getBrand);
router.route("/gettruckbrand").get(Brand.getTruckBrand);
router.route("/getbrandmodel/:category_id").get(BrandModel.getBrandModel);
router.route("/getparts/:model_id").get(Parts.getParts);
router.route("/getpartdetail/:id").get(partdetail.getPartDetail);





// *********************courses**************************
router.route("/courses").get(courses.getCourse)
router.route("/modules/:id").get(courses.getModules)
router.route("/lesson/:id").get(courses.getLessons)
router.route("/course/:id").get(courses.Course)
// router.route("/submit-order").post(courses.payment)

module.exports = router;
