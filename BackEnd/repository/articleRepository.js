
const articleDAO = require("../dao/articleDAO");

const articleRepository = {
  getTop5ArticleSameType: async (id, aid) => {
    return await articleDAO.getTop5ArticleSameType(id, aid);
  },
  getArticlesByArticleID: async (ID) => {
    return await articleDAO.findArticlesByArticleID(ID);
  },
  getAllArticles: async () => {
    return await articleDAO.findAllArticles();
  },
  getAllArticlesforViewer: async () => {
    return await articleDAO.findAllArticlesForViewer();
  },
  createArticle: async (article) => {
    return await articleDAO.createArticle(article);
  },
  deleteArticle: async (article_id) => {
    return await articleDAO.deleteArticle(article_id);
  },
  updateArticle: async (article_id, article) => {
    return await articleDAO.updateArticle(article_id, article);
  },
  getCurrentCategoriesInArticles: async () => {
    return await articleDAO.getCurrentCategoriesInArticles();
  },
  getTop4ArticlesforViewer: async () => {
    return await articleDAO.findTop4ArticlesforViewer();
  },
}

module.exports = articleRepository;