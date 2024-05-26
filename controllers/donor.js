const userModel = require("../models/userModel");
const donorRequest = async (req,res) =>{
    try{
        const {quantity,Disease} = req.body;
        const us = await userModel.findOne({email: req.us.email});
        us.donated.push({quantity,Disease});
        const response = await us.save();
        
        // res.status(200).json({
        //     success:true,
        //     data:response,
        //     message:"blood Donation request has been sent"
        // })

        res.status(200).render('donorHist',{data:us.donated});
    }
    catch(err){
        console.error(err);
        console.log(err);
        // res.status(500)
        // .json({
        //     success:false,
        //     data:"error in donorRequest API",
        //     message:err.message,
        // })
    }
   
};


// const ReqHistoryForDonor = async (req,res) =>{
//     try{
//         const user = await userModel.findOne({email: req.us.email});
//         res.send(user.donated);
//     }
//     catch(error){
//         console.log(error)
//     }
// }
 
const patientRequest = async (req,res) =>{
    try{
        const {quantity,reason} = req.body;
        const us = await userModel.findOne({email: req.us.email});

        us.Requested.push({quantity,reason});
        const response = await us.save();


        // res.status(200).json({
        //     success:true,
        //     data:response,
        //     message:"blood  request has been sent"
        // })
        res.status(200).render('patientHist',{data:us.Requested});
    }
    catch(err){
        // console.error(err);
        // console.log(err);
        // res.status(500)
        // .json({
        //     success:false,
        //     data:"error in patientRequest API",
        //     message:err.message,
        // })

    }
   
}

// const ReqHistoryForPatient = async (req,res) =>{
//     try{
//         const user = await userModel.findOne({email: req.us.email});
//         res.send(user.Requested);
//     }
//     catch(error){
//         console.log(error)
//     }
// }



module.exports = { donorRequest ,patientRequest };