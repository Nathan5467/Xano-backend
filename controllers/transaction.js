const Transaction = require("../models/Transaction");
//const Fund_history = require("../models/Fund_history");
const Order = require("../models/Order");
const Total_fund = require("../models/Total_fund");
const Fund = require("../models/Fund");

///this is portfolio section
const getTransacton_history = async (req, res) => {
  const transaction = await Transaction.find({}).sort({updatedAt: -1});
  return res.status(200).json({ transaction });
};
const deleteTransaction_history = async (req, res) => {
  const transactionId = req.params.id;
  const result = await Transaction.findByIdAndDelete(transactionId);
  if (!result) {
    return res.status(404).send({ message: "This transaction not found" });
    console.log("err");
  }
  const transaction = await Transaction.find({});
  return res.status(200).json({ transaction });
};

const getPendingPortfolio = async (req, res) => {
  const penPort = await Transaction.find({});
  const portf = penPort.filter((item) => item.Type === "pending");
  return res.status(200).json({ portf });
};

const putPendingPortfolio = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  const result = await Transaction.findByIdAndUpdate(
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

const postTransaction_history = async (req, res) => {
  const new_Transaction = new Transaction(req.body);
  await new_Transaction.save();
  const transaction = await Transaction.find({});
  return res.status(200).json({ transaction });
};

const putTransaction_history = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  const result = await Transaction.findByIdAndUpdate(
    req.body._id,
    updatedata,
    options
  );
  if (!result) {
    return res.status(404).send({ message: "Transaction not found" });
    console.log("err");
  }
  return res.status(200).json({ msg: "success" });
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

const editFund_history = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  console.log(req.params);
  const result = await Fund.findByIdAndUpdate(
    req.params.id,
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
  console.log(new_fund);
  await new_fund.save();
  const fund = await Fund.find({});
  return res.status(200).json({ fund });
};
const deleteFund_history = async (req, res) => {
  const fundId = req.params.id;
  const result = await Fund.findByIdAndDelete(fundId);
  if (!result) {
    return res.status(404).send({ message: "Fund not found" });
    console.log("err");
  }
  const fund = await Fund.find({});
  return res.status(200).json({ fund });
};

const getAdminFund = async (req, res) => {
  const found_found = await Fund.find({});
  const fund = found_found.filter((item) => item.Type === "pending");
  return res.status(200).json({ fund });
};

//order
const getOrder = async (req, res) => {
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
  
  const new_Order = new Order(req.body);
  console.log(new_Order);
  await new_Order.save();
  const order = await Order.find({});
  return res.status(200).json({ order });
};
const putOrder = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  const result = await Order.findByIdAndUpdate(
    req.body._id,
    updatedata,
    options
  );
  if (!result) {
    return res.status(404).send({ message: "Order not found" });
    console.log("err");
  }
  return res.status(200).json({ msg: "success" });
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
  deleteTransaction_history,
  postTransaction_history,
  putTransaction_history,
  getFund_history,
  postFund_history,
  deleteFund_history,
  getTotal_fund,
  postTotal_fund,
  getOrder,
  postOrder,
  putOrder,
  deleteOrder,
  getAdminFund,
  putFund_history,
  editFund_history,
  getPendingPortfolio,
  putPendingPortfolio,
};
