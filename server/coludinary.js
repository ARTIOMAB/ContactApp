const cloudinaryModel = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const cloudinary = cloudinaryModel.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
