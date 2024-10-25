const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const products = await Product.find({ userId });

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching User's products", error });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found in this category" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

const createProduct = async (req, res) => {
  const { title, price, category, description, image, userId } = req.body;

  try {
    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image,
      userId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // 返回更新後的文檔
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByUserId,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
