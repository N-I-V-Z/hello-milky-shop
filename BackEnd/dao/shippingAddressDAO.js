const mssql = require("mssql");
const dbConfig = require("../config/db.config");

const shippingAddressDAO = {
  findInfoShippingByUserID: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM ShippingAddress
          WHERE UserID = @ID AND IsDeleted = 0
           
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  findInfoShippingByOrderID: (orderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input("orderID", orderID);
        request.query(
          `SELECT Receiver, PhoneNumber, Address
          FROM ShippingAddress sa
          JOIN Orders o ON o.ShippingAddressID = sa.ShippingAddressID
          WHERE OrderID = @orderID
           
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },
  updateIsDeleted: (param_id) => {
    return new Promise((resolve, reject) => {
      const IsDeleted = 1;
      mssql.connect(dbConfig, function () {
        var request = new mssql.Request()
          .input("ShippingAddressID", param_id)
          .input("IsDeleted", IsDeleted);
        request.query(
          `UPDATE ShippingAddress SET IsDeleted = @IsDeleted WHERE ShippingAddressID = @ShippingAddressID;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "Update IsDeleted Sucessfully !!!",
            });
          }
        );
      });
    });
  },

  findInfoAddressWithOrderNearest: (UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "UserID",
          mssql.VarChar,
          UserID
        );
        request.query(
          `SELECT TOP 1 OrderID, Address, sa.PhoneNumber, sa.Receiver, sa.ShippingAddressID
          FROM ShippingAddress sa
          JOIN Orders o ON sa.ShippingAddressID = o.ShippingAddressID
		      JOIN Users u ON u.UserID = o.UserID
          WHERE o.UserID = @UserID AND sa.IsDeleted = 0
		      ORDER BY o.OrderID DESC
          ;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res.recordset.length === 0 ? 1 : 0,
              data: res.recordset[0] ?? null,
            });
          }
        );
      });
    });
  },

editShippingAddress: (param_id, shippingAddressObject) => {
    return new Promise((resolve, reject) => {
        mssql.connect(dbConfig, function () {
            var request = new mssql.Request()
                .input("ShippingAddressID", param_id)
                .input("Receiver", mssql.NVarChar, shippingAddressObject.Receiver)
                .input("PhoneNumber", mssql.VarChar, shippingAddressObject.PhoneNumber)
                .input("Address", mssql.NVarChar, shippingAddressObject.Address)
                .input("IsDeleted", mssql.Bit, shippingAddressObject.IsDeleted)
                .input("UserID", mssql.VarChar, shippingAddressObject.UserID);
            request.query(
                `UPDATE ShippingAddress SET Receiver = @Receiver, PhoneNumber = @PhoneNumber, Address = @Address, IsDeleted = @IsDeleted, UserID = @UserID WHERE ShippingAddressID = @ShippingAddressID;`,
                (err) => {
                    if (err) return reject(err);
                    resolve({
                        message: "Edit successfully"
                    });
                }
            );
        });
    });
},

};
module.exports = shippingAddressDAO;
