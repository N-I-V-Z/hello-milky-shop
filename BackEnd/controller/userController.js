const userService = require("../service/userService");

const updateInforUser = async (req, res) => {
  try {
    const { UserID, UserName, Email, PhoneNumber } = req.body;
    if (!UserID)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });

    const obj = await userService.updateInforUser(UserID, UserName, Email, PhoneNumber);

    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateUserName = async (req, res) => {
  try {
    const { UserID, UserName } = req.body;
    if (!UserID || !UserName)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await userService.updateUserName(UserID, UserName);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const updateUserEmail = async (req, res) => {
  try {
    const { UserID, Email } = req.body;
    if (!UserID || !Email)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });

    const obj = await userService.updateUserEmail(UserID, Email);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const updateUserPhoneNumber = async (req, res) => {
  try {
    const { UserID, PhoneNumber } = req.body;
    if (!UserID || !PhoneNumber)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await userService.updateUserPhoneNumber(UserID, PhoneNumber);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const usePoint = async (req, res) => {
  try {
    const { UserID } = req.body;
    if (!UserID)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await userService.usePoint(UserID);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const countUserByRole = async (req, res) => {
  try {
    const RoleID = req.params.role;
    if (!RoleID)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await userService.countUserByRole(RoleID);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getUserByID = async (req, res) => {
  try {
    const UserID = req.query.UserID;
    if (!UserID)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await userService.getUserByID(UserID);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const { currentUser } = req;
    if (!currentUser)
      res.status(400).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await userService.getOne(currentUser.id);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const obj = await userService.getAllUsers();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const obj = await userService.deleteUser(
      req.params.user_id,
      req.body.Status
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { Email } = req.body;
    const obj = await userService.getUserByEmail(Email);
    res.send(obj);
  } catch (error) {
    console.error("Error in changePointOfUser controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserByPhoneNumber = async (req, res) => {
  try {
    const { PhoneNumber } = req.body;
    const obj = await userService.getUserByPhoneNumber(PhoneNumber);
    res.send(obj);
  } catch (error) {
    console.error("Error in changePointOfUser controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getOne,
  getUserByID,
  countUserByRole,
  usePoint,
  updateUserName,
  updateUserEmail,
  updateUserPhoneNumber,
  updateInforUser,
  getUserByPhoneNumber,
  getUserByEmail,
};
