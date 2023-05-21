const Productrouter = require("express").Router();
const Productmodel = require("../Models/Products");

Productrouter.get("/", async (req, res, next) => {
  try {
    const response = await Productmodel.find();
    if (response.length > 0) {
      return res.status(200).send(response);
    } else {
      return res.status(500).json({
        success: false,
        data: response,
        message: "no Products found!!!",
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

Productrouter.post("/createproduct", async function (req, res, next) {
  const {  productid,
    name,
    model,
    description,
    price,
    normalprice,
    time,
    image,
    priceperhour,
    stocks}=req.body;
  const newProduct =await new Productmodel({
    productid,
    name,
    model,
    description,
    price,
    normalprice,
    time,
    image,
    priceperhour,
    stocks
});
try {
  const response = await newProduct.save();
  if (response?._id) {
    return res.status(200).json({
      success: true,
      message: "New Product Created Successfully!!!",
      data: response,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "New Product Created failed!!!",
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

Productrouter.post("/editproduct", async function (req, res, next) {
  try {
    const filter = { _id: req.body._id };
    const update = {
      productid: req.body.productid,
      name: req.body.name,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      normalprice: req.body.normalprice,
      time: req.body.time,
      image: req.body.image,
      priceperhour: req.body.priceperhour,
      stocks: req.body.stocks,
    };
    const doc = await Productmodel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    await doc.save();
    res.send("Product details edited Successfuly");
  } catch (error) {
    return res.status(400).json(error);
  }
});

Productrouter.post("/deleteproduct", async function (req, res, next) {
  try {
    await Productmodel.findOneAndDelete({ _id: req.body.Productid });
    res.send("Product Deleted Successfuly");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = Productrouter;
