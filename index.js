const express=require ('express');
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const dbconnection = require('./dbconfig');
const Razorpay = require ('razorpay')
const Productrouter = require('./Routes/Products');
const userrouter = require('./Routes/Users');
const bookingrouter=require('./Routes/bookingsroute');
var cors = require('cors')
dotenv.config();

const PORT = process.env.PORT;
app.use(cors())
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const instance = new Razorpay({ 
  key_id: process.env.RAZORPAY_API_KEY, 
  key_secret: process.env.RAZOR_API_SECRET 
});

//Rest API Endpoints
app.get("/", function (req, res) {
    res.send("Hi World Welcome to my Website🙏");
  });

app.use("/products", Productrouter);
app.use("/users", userrouter);
app.use("/bookings", bookingrouter);
app.listen(PORT, () => {
  dbconnection;
  console.log(`Server Started at ${PORT} 🎉`)
});

module.exports =instance;