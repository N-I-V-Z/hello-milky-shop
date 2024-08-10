const commentRepository = require("../repository/commentRepository");

const userService = {

  countRatingAndAvgRating: async (ProductID) => {
    return await commentRepository.countRatingAndAvgRating(ProductID);
  },

  getCommentByProductID: async (ProductID) => {
    return await commentRepository.getCommentByProductID(ProductID);
  },

  userComment: async (UserID, ProductID, Rating, Description) => {
    return await commentRepository.userComment(UserID, ProductID, Rating, Description);
  },

  checkUserOrdered: async (UserID, ProductID) => {
    return await commentRepository.checkUserOrdered(UserID, ProductID);
  },
  getUnansweredComments: async () => {
    return await commentRepository.getUnansweredComments();
  },
  getAnsweredComments: async () => {
    return await commentRepository.getAnsweredComments();
  },
  repComment: async (id, rep, UserID) => {
    return await commentRepository.repComment(id, rep, UserID);
  },
};

module.exports = userService;
