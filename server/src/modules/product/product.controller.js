const path = require("node:path");
const fs = require("node:fs");
const Product = require("./product.model");
const { cloudinary } = require("../../config/cloudinary");
const Feedback = require("../feedback/feedback.model");

const createProduct = async (req, res) => {
  const { name, description, color, price, size, category, stock, gender } =
    req.body;

  const file = req.file;
  const format = file.mimetype.split("/").at(-1);
  const fileName = file.filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "products-image",
      format,
    });

    const newProduct = await Product.create({
      name,
      description,
      color,
      price,
      size,
      gender,
      stock,
      category,
      image: uploadResult.secure_url,
    });

    await fs.promises.unlink(filePath);
    return res.status(201).json({ id: newProduct._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    const feedbacks = await Feedback.find({ product: req.params.id }).populate(
      "customer"
    );
    return res.status(200).json({ product, feedbacks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

const editProduct = async (req, res) => {
  const { name, description, gender, category, price, stock } = req.body;
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name, description, gender, category, price, stock },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while updating product." });
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while deleting product." });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
};
