const userRepository = require("../repository/userRepository");

const userService = {
  getUserByEmail: async (Email) => {
    return await userRepository.getUserByEmail(Email);
  },
  getUserByPhoneNumber: async (PhoneNumber) => {
    return await userRepository.getUserByPhoneNumber(PhoneNumber);
  },

  updateInforUser: async (UserID, UserName, Email, PhoneNumber) => {
    return await userRepository.updateInforUser(UserID, UserName, Email, PhoneNumber);
  },
  updateUserEmail: async (UserID, Email) => {
    return await userRepository.updateUserEmail(UserID, Email);
  },
  updateUserName: async (UserID, UserName) => {
    return await userRepository.updateUserName(UserID, UserName);
  },
  updateUserPhoneNumber: async (UserID, PhoneNumber) => {
    return await userRepository.updateUserPhoneNumber(UserID, PhoneNumber);
  },


  usePoint: async (UserID) => {
    return await userRepository.usePoint(UserID);
  },

  countUserByRole: async (RoleID) => {
    return await userRepository.countUserByRole(RoleID);
  },

  getUserByID: async (id) => {
    return await userRepository.getUserByID(id);
  },

  getOne: async (id) => {
    return await userRepository.getOne(id);
  },

  getAllUsers: async () => {
    return await userRepository.getAllUsers();
  },
  deleteUser: async (user_id, status) => {
    return await userRepository.deleteUser(user_id, status);
  },
  updateUser: async (user_id, user) => {
    return await userRepository.updateUser(user_id, user);
  },
  getUserByRole: async (ID) => {
    return await userRepository.getUserByRole(ID);
  },
  changePointOfUser: async (userID, minusPoint) => {
    return await userRepository.changePointOfUser(userID, minusPoint);
  },
};

module.exports = userService;
