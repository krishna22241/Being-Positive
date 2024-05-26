const userModel = require("../models/userModel");

const getDonorDetailsController = async (req, res) => {
   try {
   const donors = await userModel.find({ role: "donor" }).select("name email bloodGroup  address phone");
     res.render('admin_donor',{donors});
  }
   catch (error) {
  }
};

const getDonorDetailsCountController = async (req, res) => {
   try {
   const donors = await userModel?.find({ role: "donor" });
   const Alluser = await userModel?.find({});
    const totalDonor = donors?.length;
    const donatedLengths = Alluser?.map(request =>( { donatedLength: request.donated.length,
                                                     requestedLength: request.Requested.length, } ) );

// Use reduce to sum up the lengths
  const totalDonatedLength = donatedLengths?.reduce((total, length) => total + length.donatedLength, 0);
  const totalRequestedLength = donatedLengths?.reduce((total, length) => total + length.requestedLength, 0);
  const total = totalRequestedLength+ totalDonatedLength;


  const approvedCounts = Alluser?.map(request => {
  const approvedInDonated = request?.donated?.filter(item => item.status === 'approved').length;
  const approvedInRequested = request?.Requested?.filter(item => item.status === 'approved').length;
  return approvedInDonated + approvedInRequested; });
  const totalapp = approvedCounts.reduce((total , count)=> total+ count , 0);
  
     const allUsers = await userModel.find();

   
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodTypeQuantities = {};

    
    bloodGroups.forEach((group) => {
      bloodTypeQuantities[group] = 0;
    });

    
    allUsers.forEach((user) => {
      if (user.role === "donor") {
        user.donated.forEach((donation) => {
          bloodTypeQuantities[user.bloodGroup] += parseInt(donation.quantity);
        });
      }
    });

  res.render('adminHome' , {totalDonor,total, totalapp  , bloodTypeQuantities });
  }
  catch (error) {
    
  }
};


const getPatientDetailsController = async (req , res) => {
   try {
   const donors = await userModel.find({ role: "patient" }).select("name email bloodGroup  address phone");
    res.render('admin_patient',{donors});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllDonorRequests = async (req, res) => {
  try {
    
    const donorsWithRequests = await userModel
      .find({ role: "donor" })
      .populate("donated");

    const donorRequests = donorsWithRequests.reduce((allRequests, donor) => {
      return allRequests.concat(
          donor.donated.map((donation) => ({
          donorName: donor.name,
          donorBloodGroup: donor.bloodGroup,
          donationQuantity: donation.quantity,
          donationDisease: donation.Disease,
          donationStatus: donation.status,
          donationDate: donation.date,
        }))
      );
    }, []);
    // 
   

    res.render('admin_donationsD' , {donorRequests } );

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getAllDonorRequests API",
      error: error.message,
    });
  }
};



const getAllPatientRequests = async (req, res) => {
  try {
    
    const patientsWithRequests = await userModel
      .find({ role: "patient" })
      .populate("Requested");

    const patientRequests = patientsWithRequests.reduce((allRequests, patient) => {
      return allRequests.concat(
        patient.Requested.map((request) => ({
          patientName: patient.name, 
          patientEmail: patient.email,
          patientBloodGroup: patient.bloodGroup,
          requestQuantity: request.quantity,
          requestReason: request.reason,
          requestStatus: request.status,
          requestDate: request.date,
        }))
      );
    }, []);

    // res.status(200).json({
    //   success: true,
    //   data: patientRequests,
    //   message: "All patient requests retrieved successfully",
    // });
    res.render('admin_requestsP',{patientRequests});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getAllPatientRequests API",
      error: error.message,
    });
  }
};


const deleteDonorController = async (req, res) => {
   try {

    const userIdToDelete = req.body.donorId;
 
    
    const updatedUser =  await userModel.findOneAndDelete({ _id: userIdToDelete });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.redirect('/adminD');
    // res.status(200).json({
    //   success: true,
    //   message: 'Donor deleted successfully',
    //   updatedUser,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting donor',
      error: error.message,
    });
  }
};

const deletePatientController = async (req, res) => {
   try {

    const userIdToDelete = req.body.donorId;
    const updatedUser =  await userModel.findOneAndDelete({ _id: userIdToDelete });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.redirect('/adminP');
    // res.status(200).json({
    //   success: true,
    //   message: 'Donor deleted successfully',
    //   updatedUser,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting donor',
      error: error.message,
    });
  }
};
module.exports = { getDonorDetailsController,deletePatientController, getPatientDetailsController ,getAllDonorRequests,getAllPatientRequests,deleteDonorController , getDonorDetailsCountController};


//donor req => name,disease,age,bloodgp , unit, date , status,action

