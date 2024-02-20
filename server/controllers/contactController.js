const { User, Contact } = require("../models/contactModel");

//contacts function
exports.createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(200).send(newContact);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find({
      createdBy: req.params.id,
    }).exec();
    res.status(200).send(allContacts);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.findContact = async (req, res) => {
  try {
    const searchContact = await Contact.find({
      $or: [
        { firstName: req.params.firstName },
        { surName: req.params.surName },
      ],
    }).exec();
    res.status(200).send(searchContact);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body;
    const contact = await Contact.findByIdAndUpdate(id, updatedContact);
    res.json(contact);
  } catch (error) {
    res.status(500).send(error.massage);
  }
};
exports.deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = req.body;
    const deleteById = await Contact.findByIdAndDelete(id, deleteContact);
    res.json(deleteById);
  } catch (error) {
    res.status(500).send(error.massage);
  }
};
//users
exports.createUserContact = async (req, res) => {
  try {
    const newUserContact = await User.create(req.body);
    res.status(200).send(newUserContact);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};
