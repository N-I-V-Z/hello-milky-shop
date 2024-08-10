const articleRepository = require("../repository/articleRepository");

const articleService = {
  getTop5ArticleSameType: async (id, aid) => {
    return await articleRepository.getTop5ArticleSameType(id, aid);
  },

  getArticlesByID: async (ID) => {
    return await articleRepository.getArticlesByID(ID);
  },
  getArticlesByArticleID: async (ID) => {
    return await articleRepository.getArticlesByArticleID(ID);
  },
  getAllArticles: async () => {
    return await articleRepository.getAllArticles();
  },
  getAllArticlesforViewer: async () => {
    return await articleRepository.getAllArticlesforViewer();
  },

  createArticle: async (article) => {
    return await articleRepository.createArticle(article);
  },

  deleteArticle: async (article_id) => {
    return await articleRepository.deleteArticle(article_id);
  },

  updateArticle: async (article_id, article) => {
    return await articleRepository.updateArticle(article_id, article);
  },
  getCurrentCategoriesInArticles: async () => {
    return await articleRepository.getCurrentCategoriesInArticles();
  },
  getTop4ArticlesforViewer: async () => {
    return await articleRepository.getTop4ArticlesforViewer();
  },
};

module.exports = articleService;
