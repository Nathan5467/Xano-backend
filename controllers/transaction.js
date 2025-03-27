const Transaction = require("../models/Transaction");
const Fund_history = require("../models/Fund_history");
const Order = require("../models/Order");
const Total_fund = require("../models/Total_fund");
const Fund = require("../models/Fund");

///this is portfolio section
const getTransacton_history = async (req, res) => {
  // const transaction = new Transaction({
  //   stocks: "Apple INC",
  //   qty: 10,
  //   avg: 144.5,
  //   cmp: 147.7,
  //   value_cost: 1445.0,
  //   value_cmp: 1477.0,
  //   day_gain: 0.8,
  //   returun: 32,
  // });
  // await transaction.save();
  const transaction = await Transaction.find({}).sort({updatedAt: -1});
  return res.status(200).json({ transaction });
};
const postTransaction_history = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  const result = await Transaction.findByIdAndUpdate(
    req.body._id,
    updatedata,
    options
  );
  if (!result) {
    return res.status(404).send({ message: "User not found" });
    console.log("err");
  }
  const transaction = await Transaction.find({});
  return res.status(200).json({ transaction });
};

//this is fund section
const getFund_history = async (req, res) => {
  const fund = await Fund.find({});
  return res.status(200).json({ fund });
};
const putFund_history = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  const result = await Fund.findByIdAndUpdate(
    req.body._id,
    updatedata,
    options
  );
  if (!result) {
    return res.status(404).send({ message: "Fund not found" });
    console.log("err");
  }
  return res.status(200).json({ msg: "success" });
};
const postFund_history = async (req, res) => {
  const new_fund = new Fund(req.body);
  await new_fund.save();
  const fund = await Fund.find({});
  return res.status(200).json({ fund });
};

const getAdminFund = async (req, res) => {
  const found_found = await Fund.find({});
  const fund = found_found.filter((item) => item.Type === "pending");
  return res.status(200).json({ fund });
};

//order section
const getOrder = async (req, res) => {
  // const newOrder = new Order({
  //   name: "AppleInc 28 Jan 50 Call",
  //   status: "successful",
  //   Time: "09:35",
  //   Type: "B",
  //   Qty: 75,
  //   value: 75,
  //   CMP: 22.1,
  //   price: 30.0,
  // });
  // await newOrder.save();
  const order = await Order.find({});
  return res.status(200).json({ order });
};

const deleteOrder = async (req, res) => {
  const userId = req.params.id;
  const result = await Order.findByIdAndDelete(userId);
  if (!result) {
    return res.status(404).send({ message: "User not found" });
    console.log("err");
  }
  const order = await Order.find({});
  return res.status(200).json({ order });
};

const postOrder = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  console.log(updatedata);
  const result = await Order.findByIdAndUpdate(
    req.body._id,
    updatedata,
    options
  );
  if (!result) {
    return res.status(404).send({ message: "User not found" });
    console.log("err");
  }
  const order = await Order.find({});
  return res.status(200).json({ order });
};

// fund section
// get total_fund is to get the whole date
// post total_fund is to delete previous data and reset fund
const getTotal_fund = async (req, res) => {
  const total_fund = await Total_fund.find({});
  return res.status(200).json({ total_fund });
};
const postTotal_fund = async (req, res) => {
  const result = await Total_fund.deleteMany({});
  const fund = req.body;
  fund.map(async (item, index) => {
    let total_fund = new Total_fund(item);
    await total_fund.save();
  });
  return res.status(200).json({ msg: "success" });
};

module.exports = {
  getTransacton_history,
  getFund_history,
  postFund_history,
  getOrder,
  getTotal_fund,
  postTotal_fund,
  postTransaction_history,
  postOrder,
  deleteOrder,
  getAdminFund,
  putFund_history,
};
