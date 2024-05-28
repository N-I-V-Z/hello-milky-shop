const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const User = require("../bo/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDAO = {
  findAllUsers: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Users;`, (err, res) => {
          if (err) reject(err);

          resolve(res.recordset);
        });
      });
    });
  },
  login: (login) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("PhoneNumber", mssql.VarChar, login.PhoneNumber)
          .input("Password", mssql.VarChar, login.Password);
        request.query(
          `SELECT UserID, UserName, RoleID, Password FROM Users WHERE PhoneNumber = @PhoneNumber`,
          (err, res) => {
            if (err) reject(err);

            const user = res.recordset[0];

            if (!user) {
              return resolve({
                err: "Phone number is not exist"
              });
            }

            console.log(login.Password);
            const passwordIsValid = bcrypt.compareSync(
              login.Password,
              user.Password
            );

            if (!passwordIsValid) return resolve({
              err: "Incorrect password"
            });

            const token = jwt.sign(
              {
                id: user.UserID,
                role: user.RoleID,
              },
              "HelloMilkyShop",
              {
                expiresIn: 60, //thời gian(s)
              }
            );

            resolve({
              auth: true,
              token: token,
              user: {
                id: user.UserID,
                name: user.UserName,
                role: user.RoleID,
              },
            });
          }
        );
      });
    });
  },
  register: (register) => {
    const UserID = "a";
    const user = new User(
      UserID,
      register.UserName,
      register.PhoneNumber,
      register.Password
    );
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
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
                err: "Phone number already in use"
              });
            }

            const passwordHash = bcrypt.hashSync(user.Password, 10);

            const insertRequest = new mssql.Request()
              .input("UserID", user.UserID)
              .input("UserName", mssql.NVarChar, user.UserName)
              .input("PhoneNumber", user.PhoneNumber)
              .input("PasswordHash", passwordHash)
              .input("RoleID", mssql.Int, user.RoleID || 3);
            insertRequest.query(
              `INSERT INTO Users (UserID, UserName, PhoneNumber, Password, RoleID) VALUES (@UserID, @UserName, @PhoneNumber, @PasswordHash, @RoleID);`,
              (err, res) => {
                if (err) {
                  console.error("Insert query execution error:", err);
                  return reject({
                    mes: "Internal server error"
                  });
                }

                resolve({
                  mes: "User registered successfully"
                });
              }
            );
          }
        );
      });
    });
  },
  /*
  logout: (token) => {
    
  },
  */
};

module.exports = userDAO;
