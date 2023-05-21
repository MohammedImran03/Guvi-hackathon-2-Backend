const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
     productid:{type:mongoose.Schema.Types.ObjectId, ref:'products'},
     user:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
     stocks:{type:Number},
     bookedTimeSlots:{
        from:{type:String},
        to:{type:String}
      },
      totalhours:{type:Number},
      totalamount:{type:Number},
      transactionid:{type:String},
      delivery:{type:Boolean}
},{timestamps:true});

module.exports = mongoose.model("bookings", bookingSchema);
