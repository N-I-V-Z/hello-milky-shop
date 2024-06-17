const User = require("../bo/user");
const userRepository = require("../repository/userRepository");

const userService = {

  getUserByID: async (id) => {
    return await userRepository.getUserByID(id);
  },

  getOne: async (id) => {
    return await userRepository.getOne(id);
  },

  getAllUsers: async (req, res) => {
    return await userRepository.getAllUsers();
  },
  deleteUser: async (user_id) => {
    return await userRepository.deleteUser(user_id);
  },
  updateUser: async (user_id, user) => {
    return await userRepository.updateUser(user_id, user);
  },
  getUserByRole: async (ID) => {
    return await userRepository.getUserByRole(ID);
  },
  changePointOfUser: async (userID, minusPoint) => {
    return await userRepository.changePointOfUser(userID, minusPoint);
  }
};

module.exports = userService;
