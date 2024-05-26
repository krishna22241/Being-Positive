const express = require("express");

const {getDonorDetailsController,getPatientDetailsController,deletePatientController  ,getBloodTypeQuantities  , getAllDonorRequests,getAllPatientRequests ,deleteDonorController} = require("../controllers/Admin");

const {isMiddleware,isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();


router.get("/AdmindonorReq",isMiddleware, isAdmin ,getDonorDetailsController);
router.get("/AdminpatientReq",isMiddleware, isAdmin ,getPatientDetailsController);
// router.get("/blood-group",isMiddleware, isAdmin , getBloodTypeQuantities);
router.post("/get-donor-requests", isMiddleware, isAdmin,getAllDonorRequests);
router.get("/get-patient-requests", isMiddleware, isAdmin,getAllPatientRequests);

// router.put("/donors/:id",isMiddleware, isAdmin, editDonor);
router.post("/delete-donor",isMiddleware, isAdmin , deleteDonorController);
router.post("/delete-patient",isMiddleware, isAdmin , deletePatientController);


module.exports = router;