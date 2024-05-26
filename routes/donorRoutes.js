const express = require("express");

const {donorRequest , patientRequest,  ReqHistoryForDonor , ReqHistoryForPatient} = require("../controllers/donor");

const {isMiddleware,isDonor,isPatient } = require("../middlewares/authMiddlewares");
// const methods=require("../controllers/authController");

const router = express.Router();

//console.log(methods);


router.post("/donorReq",isMiddleware, isDonor ,donorRequest);

router.post("/patientReq",isMiddleware, isPatient ,patientRequest);

// router.get("/ReqHisD", isMiddleware, isDonor ,ReqHistoryForDonor);

// router.get("/ReqHisP",isMiddleware, isPatient ,ReqHistoryForPatient);


module.exports = router;