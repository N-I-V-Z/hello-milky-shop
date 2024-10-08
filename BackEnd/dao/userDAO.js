const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const User = require("../bo/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserID = "a";

const userDAO = {
  getUserByEmail: (Email) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request().input(
          "Email",
          mssql.VarChar,
          Email
        );
        request.query(
          `SELECT * FROM Users WHERE Email = @Email;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.recordset[0] !== null ? 0 : 1,
              data: res.recordset[0] ?? null,
            });
          }
        );
      });
    });
  },
  getUserByPhoneNumber: (PhoneNumber) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request().input(
          "PhoneNumber",
          mssql.VarChar,
          PhoneNumber
        );
        request.query(
          `SELECT * FROM Users WHERE PhoneNumber = @PhoneNumber;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.recordset[0] !== null ? 0 : 1,
              data: res.recordset[0] ?? null,
            });
          }
        );
      });
    });
  },
  updateInforUser: (UserID, UserName, Email, PhoneNumber) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID)
          .input("Email", mssql.VarChar, Email)
          .input("PhoneNumber", mssql.VarChar, PhoneNumber)
          .input("UserName", mssql.NVarChar, UserName);
        request.query(
          `UPDATE Users SET Email = @Email, PhoneNumber = @PhoneNumber, UserName = @UserName WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },
  updateUserEmail: (UserID, Email) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID)
          .input("Email", mssql.VarChar, Email);
        request.query(
          `UPDATE Users SET Email = @Email WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },
  updateUserName: (UserID, UserName) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID)
          .input("UserName", mssql.NVarChar, UserName);
        request.query(
          `UPDATE Users SET UserName = @UserName WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },
  updateUserPhoneNumber: (UserID, PhoneNumber) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID)
          .input("PhoneNumber", mssql.VarChar, PhoneNumber);
        request.query(
          `UPDATE Users SET PhoneNumber = @PhoneNumber WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },
  changePassword: (Password, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("Password", mssql.VarChar, Password)
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `UPDATE Users SET Password = @Password WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },

  checkOldPassword: (OldPass, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("OldPass", mssql.VarChar, OldPass)
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `SELECT Password FROM Users WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);

            const passwordIsValid = bcrypt.compareSync(
              OldPass,
              res.recordset[0].Password
            );
            resolve({
              err: passwordIsValid ? 0 : 1
            });
          }
        );
      });
    });
  },

  usePoint: (UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request().input(
          "UserID",
          mssql.VarChar,
          UserID
        );
        request.query(
          `UPDATE Users SET Point = 0 WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected > 0 ? 0 : 1,
            });
          }
        );
      });
    });
  },

  countUserByRole: (RoleID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request().input("RoleID", mssql.Int, RoleID);
        request.query(
          `SELECT COUNT(UserID) AS count FROM Users WHERE RoleID = @RoleID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.recordset[0] !== null ? 0 : 1,
              count: res?.recordset[0].count,
            });
            mssql.close();
          }
        );
      });
    });
  },

  forgetPassword: (Password, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request()
          .input("Password", mssql.VarChar, Password)
          .input("UserID", mssql.VarChar, UserID);
        request.query(
          `UPDATE Users SET Password = @Password WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.rowsAffected[0] > 0 ? 0 : 1,
              mes:
                res.rowsAffected[0] > 0
                  ? "Change password successfully"
                  : "Error in forgetPassword",
            });
            mssql.close();
          }
        );
      });
    });
  },

  checkPhoneNumber: (PhoneNumber) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request().input(
          "PhoneNumber",
          mssql.VarChar,
          PhoneNumber
        );
        request.query(
          `SELECT UserID FROM Users WHERE PhoneNumber = @PhoneNumber;`,
          (err, res) => {
            if (err) return reject(err);
            resolve({
              err: res.recordset.length > 0 ? 0 : 1,
              mes: res?.recordset?.length > 0 ? "Exist" : "Not found",
              data: res.recordset.length > 0 ? res.recordset.UserID : null,
            });
          }
        );
      });
    });
  },

  getUserByID: (id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input("UserID", id);
        request.query(
          `
        SELECT UserName, PhoneNumber, Email, Point
        FROM Users u
        WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) reject(err);
            if (res.recordset[0])
              resolve({
                err: 0,
                mes: "OK",
                data: res.recordset[0],
              });
            else {
              resolve({
                err: 1,
                mes: "Not found",
              });
            }
          }
        );
      });
    });
  },

  getOne: (id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input("UserID", id);
        request.query(
          `
        SELECT UserName, u.RoleID, RoleName, Point
        FROM Users u
        JOIN Role r ON u.RoleID = r.RoleID
        WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              err: res.recordset.length > 0 ? 0 : 1,
              mes: res.recordset.length > 0 ? "OK" : "Not found",
              data: res.recordset[0] ?? null,
            });
          }
        );
      });
    });
  },
  findAllUsers: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Users;`, (err, res) => {
          if (err) reject(err);
          resolve(res.recordset);
        });
      });
    });
  },
  deleteUser: (param_id, status) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        var request = new mssql.Request()
          .input("UserID", param_id)
          .input("Status", status);
        request.query(
          `UPDATE Users SET Status = @Status WHERE UserID = @UserID;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "0",
            });
          }
        );
      });
    });
  },
  findUserByRoleID: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM Users
          WHERE RoleID = @ID
           
          `,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      });
    });
  },
  login: (login) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request()
          .input("PhoneNumber", mssql.VarChar, login.PhoneNumber)
          .input("Password", mssql.VarChar, login.Password);
        request.query(
          `SELECT UserID, UserName, RoleID, Password
          FROM Users
          WHERE PhoneNumber = @PhoneNumber`,
          (err, res) => {
            if (err) reject(err);

            const user = res.recordset[0];

            if (!user) {
              return resolve({
                err: 1,
                mes: login.PhoneNumber + " is not exist",
              });
            }

            const passwordIsValid = bcrypt.compareSync(
              login.Password,
              user.Password
            );

            if (!passwordIsValid)
              return resolve({
                err: 2,
                mes: "Incorrect password",
              });

            const token = jwt.sign(
              {
                id: user.UserID,
                role: user.RoleID,
                userName: user.UserName,
              },
              "HelloMilkyShop",
              {
                expiresIn: 60 * 30, //thời gian(s)
              }
            );

            resolve({
              err: 0,
              auth: true,
              token: token,
            });
          }
        );
      });
    });
  },
  register: (name, phone, password, role) => {
    const user = new User(
      UserID,
      name,
      phone,
      null,
      password,
      1000,
      null,
      1,
      role
    );
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "PhoneNumber",
          user.PhoneNumber
        );

        request.query(
          `SELECT UserID FROM Users WHERE PhoneNumber = @PhoneNumber;`,
          (err, res) => {
            if (err) {
              return reject("Internal server error");
            }

            if (res.recordset.length > 0) {
              return resolve({
                err: 2,
                mes: "Phone number already in use",
              });
            }

            const insertRequest = new mssql.Request()
              .input("UserID", user.UserID)
              .input("UserName", mssql.NVarChar, user.UserName)
              .input("PhoneNumber", user.PhoneNumber)
              .input("PasswordHash", user.Password)
              .input("Point", mssql.Int, user.Point)
              .input("RoleID", mssql.Int, user.RoleID || 3);
            insertRequest.query(
              `INSERT INTO Users (UserID, UserName, PhoneNumber, Password, Point, RoleID) VALUES (@UserID, @UserName, @PhoneNumber, @PasswordHash, @Point, @RoleID);`,
              (err) => {
                if (err) {
                  console.error("Insert query execution error:", err);
                  return reject({
                    err: 1,
                    mes: "Internal server error",
                  });
                }

                resolve({
                  err: 0,
                  mes: "User registered successfully",
                });
              }
            );
          }
        );
      });
    });
  },
  loginEmail: (email) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "Email",
          mssql.VarChar,
          email
        );
        request.query(
          `SELECT UserID, UserName, RoleID 
          FROM Users
          WHERE Email = @Email`,
          (err, res) => {
            if (err) reject(err);

            const user = res.recordset[0];

            if (!user) {
              return resolve({
                err: 1,
                message: email + " is not exist",
              });
            }

            const token = jwt.sign(
              {
                id: user.UserID,
                role: user.RoleID,
                userName: user.UserName,
              },
              "HelloMilkyShop",
              {
                expiresIn: 60 * 30, //thời gian(s)
              }
            );

            resolve({
              err: 0,
              auth: true,
              token: token,
            });
          }
        );
      });
    });
  },
};

module.exports = userDAO;
