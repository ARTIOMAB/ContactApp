const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

//contactControllers
router.route("/create").post(contactController.createContact);
router.route("/findAllContact/:id").get(contactController.findAllContacts);
router.route("/findContact/:firstName").get(contactController.findContact);

router
  .route("/updateContactById/:id")
  .post(contactController.updateContactById);
router
  .route("/deleteContactById/:id")
  .delete(contactController.deleteContactById);
//userControllers
router.route("/createUser").post(contactController.createUserContact);
router.route("/findAllUsers").get(contactController.findAllUsers);

module.exports = router;
