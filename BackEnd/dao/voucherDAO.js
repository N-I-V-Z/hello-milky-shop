const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Voucher = require("../bo/voucher");

const voucherDAO = {
  findAllVouchers: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Voucher;`, (err, res) => {
          if (err) reject(err);

          resolve(res.recordset);
        });
      });
    });
  },

  deleteVoucher: (VoucherID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) {
          reject(err);
          return;
        }

        var request = new mssql.Request().input("voucherID", VoucherID);
        request.query(
          `IF NOT EXISTS (SELECT 1 FROM UserVoucher WHERE VoucherID = @voucherID)
           BEGIN
             UPDATE Voucher
             SET Status = 0
             WHERE VoucherID = @voucherID;
             SELECT 1 AS success;
           END
           ELSE
           BEGIN
             SELECT 0 AS success;
           END`,
          (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            if (result.recordset[0].success === 1) {
              resolve({
                success: true,
              });
            } else {
              resolve({
                success: false,
              });
            }
          }
        );
      });
    });
  },

  updateVoucherStatusAndRemoveFromUser: (oldStatus, newStatus) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("oldStatus", mssql.Int, oldStatus)
          .input("newStatus", mssql.Int, newStatus);

        const updateQuery = `
                    UPDATE Voucher
                    SET status = @newStatus
                    WHERE expiryDate < GETDATE() AND status = @oldStatus;
    
                `;
        const deleteQuery = `
                    DELETE FROM UserVoucher
                    WHERE VoucherID IN (
                    SELECT VoucherID FROM Voucher WHERE expiryDate < GETDATE() AND status = @oldStatus
                    );
                    `;

        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });

        request.query(deleteQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getVouchersforUser: (UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "UserID",
          mssql.VarChar,
          UserID
        );
        request.query(
          `
                        SELECT Voucher.*
                        FROM Voucher
                        LEFT JOIN UserVoucher ON Voucher.VoucherID = UserVoucher.VoucherID AND UserVoucher.UserID = @UserID
                        WHERE GETDATE() <= Voucher.ExpiryDate AND UserVoucher.UserID IS NULL;
                        `,
          (err, res) => {
            if (err) reject(err);

            resolve(res?.recordset);
          }
        );
      });
    });
  },

  addVoucher: (voucherObject) => {
    const VoucherID = 1;
    const voucher = new Voucher(
      VoucherID,
      voucherObject.quantity,
      voucherObject.discountPercentage,
      voucherObject.maxDiscount,
      voucherObject.minDiscount,
      voucherObject.startDate,
      voucherObject.expiryDate,
      voucherObject.voucherName
    );

    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (new Date(voucher.startDate) > new Date(voucher.expiryDate)) {
          return reject({
            status: 400,
            message: "Start date cannot be later than expiry date",
          });
        }

        //  Thêm dữ liệu voucher vào cơ sở dữ liệu
        const insertRequest = new mssql.Request();
        insertRequest
          .input("quantity", mssql.Int, voucher.quantity)
          .input("discountPercentage", mssql.Float, voucher.discountPercentage)
          .input("maxDiscount", mssql.Int, voucher.maxDiscount)
          .input("minDiscount", mssql.Int, voucher.minDiscount)
          .input("startDate", mssql.Date, voucher.startDate)
          .input("expiryDate", mssql.Date, voucher.expiryDate)
          .input("voucherName", mssql.NVarChar, voucher.voucherName);
        insertRequest.query(
          `
                        INSERT INTO Voucher(Quantity, DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName)
                        VALUES (@quantity, @discountPercentage, @maxDiscount, @minDiscount, @StartDate, @expiryDate, @voucherName)
                    ;`,
          (err, res) => {
            if (err) return reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  updateVoucher: (voucherID, voucherObject) => {
    const voucher = new Voucher(
      voucherID,
      voucherObject.quantity,
      voucherObject.discountPercentage,
      voucherObject.maxDiscount,
      voucherObject.minDiscount,
      voucherObject.startDate,
      voucherObject.expiryDate,
      voucherObject.voucherName
    );
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();

        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (new Date(voucher.startDate) > new Date(voucher.expiryDate)) {
          return reject({
            status: 400,
            message: "Start date cannot be later than expiry date",
          });
        }

        request
          .input("voucherID", voucherID)
          .input("quantity", mssql.Int, voucher.quantity)
          .input("discountPercentage", mssql.Float, voucher.discountPercentage)
          .input("maxDiscount", mssql.Int, voucher.maxDiscount)
          .input("minDiscount", mssql.Int, voucher.minDiscount)
          .input("startDate", mssql.Date, voucher.startDate)
          .input("expiryDate", mssql.Date, voucher.expiryDate)
          .input("voucherName", mssql.NVarChar, voucher.voucherName);

        const updateQuery = `
                    UPDATE Voucher
                    SET 
                        quantity = @quantity,
                        discountPercentage = @discountPercentage,
                        minDiscount = @minDiscount,
                        maxDiscount = @maxDiscount,
                        startDate = @startDate,
                        expiryDate = @expiryDate,
                        voucherName = @voucherName
                    WHERE voucherID = @voucherID
                `;
        request.query(updateQuery, (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
      });
    });
  },

  saveVoucherForUser: (userID, voucherID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("userID", mssql.VarChar, userID)
          .input("voucherID", mssql.Int, voucherID);

        const insertQuery = `
                    INSERT INTO UserVoucher (UserID, VoucherID)
                    VALUES (@userID, @voucherID);
                `;

        request.query(insertQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  removeVoucherFromUser: (userID, voucherID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("userID", mssql.VarChar, userID)
          .input("voucherID", mssql.Int, voucherID);

        const deleteQuery = `
                    DELETE FROM UserVoucher 
                    WHERE UserID = @userID AND VoucherID = @voucherID;
                `;

        request.query(deleteQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getVoucherForUser: (userID, voucherID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("userID", mssql.VarChar, userID)
          .input("voucherID", mssql.Int, voucherID);

        const query = `
                    SELECT * FROM UserVoucher 
                    WHERE UserID = @userID AND VoucherID = @voucherID;
                `;

        request.query(query, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset[0]); // Return the first matching record if exists
        });
      });
    });
  },

  getVouchersByUserID: (userID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("userID", mssql.VarChar, userID);

        const query = `
                    SELECT 
                        uv.UserVoucherID, 
                        uv.UserID, 
                        uv.VoucherID, 
                       
                        v.DiscountPercentage, 
                        v.MaxDiscount, 
                        v.MinDiscount, 
                        v.StartDate, 
                        v.ExpiryDate, 
                        v.VoucherName
                    FROM UserVoucher uv
                    JOIN Voucher v ON uv.VoucherID = v.VoucherID
                    WHERE GETDATE() <= v.ExpiryDate AND GETDATE() >= v.StartDate AND uv.UserID = @userID;
                `;

        request.query(query, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  openVoucher: (VoucherID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) {
          reject(err);
          return;
        }

        var request = new mssql.Request().input("voucherID", VoucherID);
        request.query(
          `UPDATE Voucher
           SET Status = 1
           WHERE VoucherID = @voucherID;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "Open successfully",
            });
          }
        );
      });
    });
  },
};

module.exports = voucherDAO;
