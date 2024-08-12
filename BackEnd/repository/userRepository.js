const userDAO = require("../dao/userDAO");

const userRepository = {
  getUserByEmail: async (Email) => {
    return await userDAO.getUserByEmail(Email);
  },
  getUserByPhoneNumber: async (PhoneNumber) => {
    return await userDAO.getUserByPhoneNumber(PhoneNumber);
  },
  updateInforUser: async (UserID, UserName, Email, PhoneNumber) => {
    return await userDAO.updateInforUser(UserID, UserName, Email, PhoneNumber);
  },
  updateUserEmail: async (UserID, Email) => {
    return await userDAO.updateUserEmail(UserID, Email);
  },
  updateUserName: async (UserID, UserName) => {
    return await userDAO.updateUserName(UserID, UserName);
  },
  updateUserPhoneNumber: async (UserID, PhoneNumber) => {
    return await userDAO.updateUserPhoneNumber(UserID, PhoneNumber);
  },

  usePoint: async (UserID) => {
    return await userDAO.usePoint(UserID);
  },

  countUserByRole: async (RoleID) => {
    return await userDAO.countUserByRole(RoleID);
  },

  getUserByID: async (id) => {
    return await userDAO.getUserByID(id);
  },

  getOne: async (id) => {
    return await userDAO.getOne(id);
  },

  getAllUsers: async () => {
    return await userDAO.findAllUsers();
  },

  deleteUser: async (user_id, status) => {
    return await userDAO.deleteUser(user_id, status);
  },
};

module.exports = userRepository;
