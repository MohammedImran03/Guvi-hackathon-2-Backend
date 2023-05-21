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
  try {
    const newProduct = new Productmodel(req.body);
    await newsave();
    res.send("New Product added Successfuly");
  } catch (error) {
    return res.status(400).json(error);
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
