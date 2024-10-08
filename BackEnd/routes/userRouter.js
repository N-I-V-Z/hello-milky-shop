const router = require("express").Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/getAllUsers", userController.getAllUsers);

router.put("/disableUser/:user_id", userController.deleteUser);

router.post("/getOne", verifyToken, userController.getOne);

router.get("/getUserByID", userController.getUserByID);

router.get("/countUserByRole/:role", userController.countUserByRole);

router.put("/usePoint", userController.usePoint);

router.put("/updateUserName", userController.updateUserName);

router.put("/updateUserEmail", userController.updateUserEmail);

router.put("/updateUserPhoneNumber", userController.updateUserPhoneNumber);

router.put("/updateInforUser", userController.updateInforUser);

router.post("/getUserByPhoneNumber", userController.getUserByPhoneNumber);

router.post("/getUserByEmail", userController.getUserByEmail);

module.exports = router;
