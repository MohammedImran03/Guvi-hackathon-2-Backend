const userrouter = require("express").Router();
const User = require("../Models/userlogin");


userrouter.get("/", async (req, res, next) => {
  try {
    const response = await User.find();
    if (response.length > 0) {
      return res.status(200).send(response);
    } else {
      return res.status(500).json({
        success: false,
        data: response,
        message: "Users not found!!!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
      message: "Internal server error!!!",
    });
  }
});

userrouter.post("/createuser", async function (req, res, next) {
    const {userName,
      password} =
      req.body;
    const newuser = new User({
        userName,
      password
    });
    try {
      const response = await newuser.save();
      if (response?._id) {
        return res.status(200).json({
          success: true,
          message: "User Created Successfully!!!",
          data: response,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "User Creation failed!!!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Bad request!!!",
        error: error.message,
      });
    }
  });

  userrouter.post("/login", async function (req, res, next) {
    const {userName,
      password} =
      req.body;
    try {
      const user= await User.findOne({userName, password})
      if(user){
        res.send(user);
      }else{
        return res.status(400).json({
          success: false,
          message: "User Not Found!!!",
        });;
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  userrouter.post("/register", async function (req, res, next) {
    const {userName,
      password} =
      req.body;
    try {
      const newuser= new User(req.body)
      await newuser.save()
      res.send('user registered Successfully')
    } catch (error) {
      return res.status(400).json(error);
    }
  });


module.exports = userrouter;