const articleService = require("../service/articleService");

const getTop5ArticleSameType = async (req, res) => {
    try {
        const { ArticleCategoryID, ArticleID } = req.body;
        if (!ArticleCategoryID || !ArticleID) {
            res.status(400).send({
                err: 1,
                mes: "Missing input"
            });
        }
        const obj = await articleService.getTop5ArticleSameType(ArticleCategoryID, ArticleID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getArticlesByArticleID = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByArticleID(req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllArticles = async (rep, res) => {
    try {
        const obj = await articleService.getAllArticles();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllArticlesforViewer = async (rep, res) => {
    try {
        const obj = await articleService.getAllArticlesforViewer();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server", error);
        res.status(500).send("Internal Server Error");
    }
};
const createArticle = async (req, res) => {
    try {
        const obj = await articleService.createArticle(req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteArticle = async (req, res) => {
    try {
        const obj = await articleService.deleteArticle(req.params.article_id);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateArticle = async (req, res) => {
    try {
        const obj = await articleService.updateArticle(req.params.article_id, req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};


const getCurrentCategoriesInArticles = async (req, res) => {
    try {
        const obj = await articleService.getCurrentCategoriesInArticles();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all current category articles:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getTop4ArticlesforViewer = async (rep, res) => {
    try {
        const obj = await articleService.getTop4ArticlesforViewer();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getAllArticles,
    getAllArticlesforViewer,
    createArticle,
    deleteArticle,
    updateArticle,
    getArticlesByArticleID,
    getTop5ArticleSameType,
    getCurrentCategoriesInArticles,
    getTop4ArticlesforViewer
}