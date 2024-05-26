const express = require("express");

const router = express.Router();

const {totalRequest, pendingRequest,approvedRequest,rejectedRequest} = require("../controllers/requests");
const {isMiddleware,isAdmin,isDonor,isPatient } = require("../middlewares/authMiddlewares");


//for donor
router.get("/donor/home", isMiddleware, isDonor, async (req, res) => {
   
        const total = await totalRequest(req, res);
        const pending = await pendingRequest(req, res);
        const approved = await approvedRequest(req, res);
        const rejected = await rejectedRequest(req, res);

        // Render the EJS file with the counts
        res.render("donorHome", { total, pending, approved, rejected });
});




// router.get("/totalReq" ,isMiddleware, isDonor ,totalRequest);
// router.get("/pendingReq" , isMiddleware,isDonor,pendingRequest);
// router.get("/approvedReq" , isMiddleware,isDonor,approvedRequest);
// router.get("/rejectedReq" , isMiddleware,isDonor,rejectedRequest);
//for patient
// router.get("/totalReq" ,   isMiddleware, isPatient ,totalRequest);
// router.get("/pendingReq" , isMiddleware,isPatient,pendingRequest);
// router.get("/approvedReq" ,isMiddleware,isPatient,approvedRequest);
// router.get("/rejectedReq" ,isMiddleware,isPatient,rejectedRequest);

module.exports = router;