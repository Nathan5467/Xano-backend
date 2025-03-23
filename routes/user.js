const express = require("express");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
  registeragain,
} = require("../controllers/user");
const {
  getTransacton_history,
  getOrder,
  getFund_history,
  postFund_history,
  getTotal_fund,
  postTotal_fund,
  postTransaction_history,
  postOrder,
  deleteOrder,
  getAdminFund,
  putFund_history,
} = require("../controllers/transaction");
const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/registeragain").post(authMiddleware, registeragain);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/getAlluers").get(authMiddleware, getAllUsers);

//portfolio section
router
  .route("/getTransacton_history")
  .get(authMiddleware, getTransacton_history);
router
  .route("/getTransacton_history")
  .post(authMiddleware, postTransaction_history);

//fund section
router.route("/getFund_history").get(authMiddleware, getFund_history);

router.route("/getpending").get(authMiddleware, getAdminFund);

router.route("/getFund_history").post(authMiddleware, postFund_history);
router.route("/getpending").put(authMiddleware, putFund_history);

//order section
router.route("/getOrder").get(authMiddleware, getOrder);
router.route("/getOrder").post(authMiddleware, postOrder);
router.route("/getOrder/:id").delete(authMiddleware, deleteOrder);

//fund section
router.route("/getTotal_fund").get(authMiddleware, getTotal_fund);
router.route("/getTotal_fund").post(authMiddleware, postTotal_fund);

module.exports = router;
