const express = require("express");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
  updateUser,
  registeragain,
  deleteUser,
  resetPassword,
  logBoolean
} = require("../controllers/user");
const {
  getTransacton_history,
  postTransaction_history,
  putTransaction_history,
  deleteTransaction_history,
  getOrder,
  postOrder,
  putOrder,
  deleteOrder,
  getFund_history,
  putFund_history,
  editFund_history,
  postFund_history,
  deleteFund_history,
  getTotal_fund,
  postTotal_fund,
  getAdminFund,
  getPendingPortfolio,
  putPendingPortfolio,
} = require("../controllers/transaction");
const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/registeragain").post(authMiddleware, registeragain);
router.route("/updateUser/:id").put(authMiddleware, updateUser);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/getAllusers").get(authMiddleware, getAllUsers);
router.route("/resetPassword/:id").put(authMiddleware, resetPassword);
  //userlists admin user delete
  router.route("/getAllusers/:id").delete(authMiddleware, deleteUser);

//portfolio section
router.route("/getTransacton_history").get(authMiddleware, getTransacton_history);
router.route("/getTransacton_history").post(authMiddleware, postTransaction_history);
router.route("/getTransacton_history").put(authMiddleware, putTransaction_history);
router.route("/getTransacton_history/:id").delete(authMiddleware, deleteTransaction_history);
router.route("/getPendingPortfolio").get(authMiddleware, getPendingPortfolio);
router.route("/getPendingPortfolio").put(authMiddleware, putPendingPortfolio);



//fund section
router.route("/getFund_history").get(authMiddleware, getFund_history);
router.route("/getpending").get(authMiddleware, getAdminFund);
router.route("/getFund_history").post(authMiddleware, postFund_history);
router.route("/getpending").put(authMiddleware, putFund_history);
router.route("/getFund_history/:id").delete(authMiddleware, deleteFund_history);
router.route("/getFund_history/:id").put(authMiddleware, editFund_history);

//order section
router.route("/Order").get(authMiddleware, getOrder);
router.route("/Order").put(authMiddleware, putOrder);
router.route("/Order").post(authMiddleware, postOrder);
router.route("/Order/:id").delete(authMiddleware, deleteOrder);

//fund section
router.route("/getTotal_fund").get(authMiddleware, getTotal_fund);
router.route("/getTotal_fund").post(authMiddleware, postTotal_fund);

//logOut
router.route("/logout").post(logBoolean);
module.exports = router;
