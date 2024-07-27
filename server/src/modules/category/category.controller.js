const path = require("node:path");
const fs = require("node:fs");

const { cloudinary } = require("../../config/cloudinary");
const Category = require("./category.model");

const createCategory = async (req, res) => {
  const { name, description } = req.body;

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
      folder: "categories",
      format,
    });

    await Category.create({
      name,
      description,
      coverImage: uploadResult.secure_url,
    });

    await fs.promises.unlink(filePath);
    return res.status(201).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

module.exports = { createCategory, getCategories };
