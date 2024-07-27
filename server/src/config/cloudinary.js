const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD || "dfrb7mglo",
  api_key: process.env.CLOUDINARY_API_KEY || "948178121471247",
  api_secret: process.env.CLOUDINARY_SECRET || "5pTBJnhaH6-iaF8V2BSMJX-D-bQ",
});

module.exports = { cloudinary };
