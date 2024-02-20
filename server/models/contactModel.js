const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  firstName: { type: String, require: true, min: 2, max: 20 },
  surName: { type: String, require: true, min: 2, max: 20 },
  phone: { type: Number, require: true },
  email: { type: String, min: 5, max: 30 },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const userContactSchema = new mongoose.Schema({
  fullName: { type: String, require: true, min: 2, max: 20 },
  date: { type: Date, require: true },
  email: { type: String, require: true, min: 2, max: 20 },
  password: { type: String, require: true, min: 8, max: 16 },
});

const User = mongoose.model("User", userContactSchema);
const Contact = mongoose.model("contact", contactSchema);

module.exports = { Contact, User };
