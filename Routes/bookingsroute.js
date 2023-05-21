const express = require("express");
const bookingrouter = express.Router();
const Booking =  require("../Models/bookingmodel");
const products = require("../Models/Products");
const instance = require("../index");


bookingrouter.get("/", async (req, res) => {
      res.status(200).send('This is booking page');
  });

  bookingrouter.get("/getallbookings", async (req, res) => {
    try {
      const response = await Booking.find().populate('productid');
      res.status(200).send(response);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error,
        message: "Internal server error!!!",
      });
    }
});
 


  bookingrouter.post('/bookproduct',async (req,res)=>{
    try {
    
      
//  let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

//  var crypto = require("crypto");
//  var expectedSignature = crypto.createHmac('sha256', 'process.env.RAZOR_API_SECRET')
//                                  .update(body.toString())
//                                  .digest('hex');
//                                  console.log("sig received " ,req.body.response.razorpay_signature);
//                                  console.log("sig generated " ,expectedSignature);
//  var response = {"signatureIsValid":"false"}
//  if(expectedSignature === req.body.response.razorpay_signature)
//   response={"signatureIsValid":"true"}
//      res.send(response);
//  });
      
        const newbooking=new Booking(req.body)
        await newbooking.save();
        const filter = {_id: req.body.productid};
        const update = {$inc:{stocks:-req.body.stocks}};
        // await products.countDocuments(filter); // 0
        const doc = await products.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true // Make this update into an upsert
        });
        // doc.name; // Will Riker
        // doc.age; // 29  
       await doc.save();
        res.status(200).send('Your Booking is Successfull')
    } catch(error){
         res.status(400).send('Booking Failed')
    }

});




  module.exports = bookingrouter;