const path = require("node:path");
const fs = require("node:fs");
const Product = require("../product/product.model");
const { cloudinary } = require("../../config/cloudinary");

const Billboard = require("./billboard.model");

const createBillboard = async (req, res) => {
  const { title, description, season, gender } = req.body;

  console.log(req.file);
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
      folder: "billboards",
      format,
    });

    const newBillboard = await Billboard.create({
      title,
      description,
      season,
      gender,
      image: uploadResult.secure_url,
    });

    await fs.promises.unlink(filePath);
    return res.status(201).json({ id: newBillboard._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

const getProductAndBillboard = async (req, res) => {
  const { season, gender } = req.query;

  let query = {};
  if (season) query.season = season;
  if (gender) query.gender = gender;

  try {
    const billboard = await Billboard.findOne(query);
    const products = await Product.find(query).populate("category");
    return res.status(200).json({ products, billboard });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while fetching data." });
  }
};

module.exports = { createBillboard, getProductAndBillboard };
