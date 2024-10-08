const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Article = require("../bo/article");

const articleDAO = {
  getTop5ArticleSameType: (id, aid) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request()
          .input("id", mssql.Int, id)
          .input("aid", mssql.Int, aid);
        request.query(
          `SELECT TOP 5 a.*
          FROM Article a
          WHERE ArticleCategoryID = @id AND ArticleID != @aid AND PublishDate <= GETDATE()
          `,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res.recordset[0] !== null ? 0 : 1,
              data: res.recordset ?? null
            });
          }
        );
      });
    });
  },
  findArticlesByArticleID: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM Article
          WHERE ArticleID = @ID
           
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  findAllArticles: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT *
          FROM Article
          ;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },
  findAllArticlesForViewer: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT *
          FROM Article
          WHERE PublishDate <= GETDATE();
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  createArticle: (articleObject) => {
    const ArticleID = '9';
    const article = new Article(ArticleID, articleObject.Title, articleObject.HeaderImage, articleObject.Content, articleObject.PublishDate, articleObject.AuthorID, articleObject.ArticleCategoryID);
    return new Promise((resolve, reject) => {

      mssql.connect(dbConfig, function () {
        var request = new mssql.Request()
          .input("ArticleID", ArticleID)
          .input("Title", mssql.NVarChar, article.Title)
          .input("HeaderImage", article.HeaderImage)
          .input("Content", mssql.NVarChar, article.Content)
          .input("PublishDate", mssql.Date, article.PublishDate)
          .input("AuthorID", mssql.VarChar, article.AuthorID)
          .input("ArticleCategoryID", article.ArticleCategoryID);

        request.query(
          `INSERT INTO Article (Title, HeaderImage, Content, PublishDate, AuthorID, ArticleCategoryID)
          VALUES (@Title, @HeaderImage, @Content, @PublishDate, @AuthorID, @ArticleCategoryID)
          ;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "Create successfully"
            });
          }
        );
      });
    });
  },

  deleteArticle: (param_id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        var request = new mssql.Request()
          .input("ArticleID", param_id);
        request.query(
          `DELETE FROM Article WHERE ArticleID = @ArticleID;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "Delete successfully"
            });
          }
        );
      });
    });
  },


  updateArticle: (param_id, articleObject) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        var request = new mssql.Request()
          .input("ArticleID", param_id)
          .input("Title", mssql.NVarChar, articleObject.Title)
          .input("HeaderImage", mssql.VarChar, articleObject.HeaderImage)
          .input("Content", mssql.NVarChar, articleObject.Content)
          .input("PublishDate", mssql.Date, articleObject.PublishDate)
          .input("AuthorID", mssql.VarChar, articleObject.AuthorID)
          .input("ArticleCategoryID", articleObject.ArticleCategoryID);
        request.query(
          `UPDATE Article SET Title =  @Title, HeaderImage = @HeaderImage, Content = @Content, PublishDate = @PublishDate, AuthorID = @AuthorID, ArticleCategoryID = @ArticleCategoryID WHERE ArticleID = @ArticleID
        ;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "Edit successfully"
            });
          }
        );
      });
    });

  },

  findAuthorName: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT ArticleID, AuthorID, UserName as AuthorName
          FROM Article a
          JOIN Users u ON a.AuthorID = u.UserID
          
          ;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  getCurrentCategoriesInArticles: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) {
          reject(err);
        } else {
          const request = new mssql.Request();
          request.query(
            `SELECT DISTINCT ac.ArticleCategoryID, ac.ArticleCategoryName
            FROM ArticleCategory ac
            JOIN Article a ON ac.ArticleCategoryID = a.ArticleCategoryID;`,
            (err, res) => {
              if (err) reject(err);
              resolve(res.recordset);
            }
          );
        }
      });
    });
  },
  findTop4ArticlesforViewer: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT TOP 4 *
           FROM Article
           WHERE PublishDate <= GETDATE()
           ORDER BY PublishDate DESC;
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },
}
module.exports = articleDAO;