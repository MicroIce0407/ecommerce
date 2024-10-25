require("dotenv").config();
const multer = require("multer");
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const uploadImageToS3 = require("../middlewares/uploadImageMiddleware");

// 設定 multer 用於處理表單文件上傳
const upload = multer();

const {
  getProducts,
  getProductById,
  getProductsByUserId,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/user/:userId", protect, getProductsByUserId);

router.get("/category/:category", getProductByCategory);

router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImageToS3,
  createProduct
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  uploadImageToS3,
  updateProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;
