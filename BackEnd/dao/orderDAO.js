const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Order = require("../bo/order");

const orderDAO = {
    getAllOrders: () => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err, result) {
                const request = new mssql.Request();
                request.query(`SELECT * FROM Orders 
                                WHERE ORDERS.STATUS=1;`,
                    (err, res) => {
                        if (err) reject(err);

                        resolve(res.recordset);
                    });
            });
        });
    },
    searchOrderByUserName: (userName) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const trimmedUserName = userName.trim().replace(/\s+/g, ' ');

                const request = new mssql.Request();

                request.input('userName', mssql.VarChar, `%${trimmedUserName}%`);


                const selectQuery = `
                    SELECT o.*
                FROM Orders o
                JOIN Users u ON o.UserID = u.UserID
                WHERE u.UserName COLLATE SQL_Latin1_General_CP1_CI_AS LIKE @userName
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },

    createOrder: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID)
                    .input('orderDate', mssql.DateTime, new Date())
                    .input('status', mssql.Int, '0')
                    .input('totalAmount', mssql.Float, 0);

                const insertQuery = `
                    INSERT INTO Orders (orderDate, totalAmount, status, userID)
                    VALUES (@orderDate, @totalAmount, @status, @userID);
                    SELECT SCOPE_IDENTITY() AS orderID;
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    const orderID = result.recordset[0].orderID;
                    resolve(orderID);
                });
            });
        });
    },

    addProductToOrder: (orderID, productID, quantity, price) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID)
                    .input('productID', mssql.VarChar, productID)
                    .input('quantity', mssql.Int, quantity)
                    .input('price', mssql.Float, price);

                const insertQuery = `
                    IF EXISTS (SELECT 1 FROM OrderDetail WHERE OrderID = @orderID AND ProductID = @productID)
                    BEGIN
                        UPDATE OrderDetail
                        SET Quantity = Quantity + @quantity
                        WHERE OrderID = @orderID AND ProductID = @productID;
                    END
                    ELSE
                    BEGIN
                        INSERT INTO OrderDetail (OrderID, ProductID, Quantity, Price)
                        VALUES (@orderID, @productID, @quantity, @price);
                    END
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    },

    getOrder: (orderID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID);

                const selectQuery = `
                    SELECT o.OrderID, o.OrderDate, o.TotalAmount, o.Status, o.UserID, od.ProductID, od.Quantity, od.Price
                    FROM Orders o
                    JOIN OrderDetail od ON o.OrderID = od.OrderID
                    WHERE o.OrderID = @orderID
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },

    checkoutOrder: (orderID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const transaction = new mssql.Transaction();
                transaction.begin(err => {
                    if (err) return reject(err);

                    const request = new mssql.Request(transaction);
                    request.input('orderID', mssql.Int, orderID)


                    const updateOrderQuery = `
                        UPDATE Orders
                        SET status = 1
                        WHERE orderID = @orderID
                    `;

                    request.query(updateOrderQuery, (err, result) => {
                        if (err) {
                            transaction.rollback();
                            return reject(err);
                        }

                        transaction.commit(err => {
                            if (err) {
                                transaction.rollback();
                                return reject(err);
                            }
                            resolve(result);
                        });
                    });
                });
            });
        });
    },

    getOrdersByUserID: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID);

                const selectQuery = `
                    SELECT * FROM Orders 
                    WHERE UserID = @userID
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },

    getOpenOrderForUser: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID);

                const selectQuery = `
                    SELECT * FROM Orders 
                    WHERE UserID = @userID AND status = 0
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset[0]);
                });
            });
        });
    },
    //Chức năng cho phép lấy những voucher đã lưu mà có thể áp dụng cho đơn hàng
    getApplicableVouchers: (userID, orderTotal, currentDate) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID)
                    .input('orderTotal', mssql.Float, orderTotal)
                    .input('currentDate', mssql.DateTime, currentDate);

                const selectQuery = `
                    SELECT v.*
                    FROM Voucher v
                    JOIN UserVoucher uv ON v.VoucherID = uv.VoucherID
                    WHERE uv.UserID = @userID
                    AND v.MinDiscount <= @orderTotal
                    AND v.MaxDiscount >= @orderTotal
                    AND v.Status = 1
                    AND v.StartDate <= @currentDate
                    AND v.ExpiryDate >= @currentDate
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },
    // Áp dụng voucher vào đơn hàng
    applyVoucherToOrder: (orderID, voucherID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID)
                    .input('voucherID', mssql.Int, voucherID);

                const insertQuery = `
                    INSERT INTO VoucherOrder (OrderID, VoucherID)
                    VALUES (@orderID, @voucherID)
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    },

    getPreviousOrderAddress: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID);

                const selectQuery = `
                    SELECT TOP 1 Address
                    FROM Orders
                    WHERE UserID = @userID
                    ORDER BY OrderID DESC
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset.length > 0 ? result.recordset[0].Address : null);
                });
            });
        });
    },
    getOrderDetailByOrderID: (orderID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();

                request.input('orderID', mssql.Int, orderID);

                const selectQuery = `
                    SELECT o.*, od.*
                    FROM Orders o
                    JOIN OrderDetail od ON o.OrderID = od.OrderID
                    WHERE o.OrderID = @orderID
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },

    changeQuantityOfProductInOrder: (orderID, productQuantities) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const transaction = new mssql.Transaction();
                transaction.begin(err => {
                    if (err) return reject(err);

                    const request = new mssql.Request(transaction);

                    const productIDs = productQuantities.map(pq => `'${pq.productID}'`).join(',');

                    const updateQueries = productQuantities.map(pq => {
                        return `
                            UPDATE OrderDetail
                            SET Quantity = ${pq.quantity}
                            WHERE OrderID = ${orderID} AND ProductID = '${pq.productID}'
                        `;
                    }).join('; ');

                    const deleteQuery = `
                        DELETE FROM OrderDetail
                        WHERE OrderID = ${orderID} AND ProductID NOT IN (${productIDs})
                    `;

                    const finalQuery = `
                        ${updateQueries}; ${deleteQuery};
                    `;

                    request.query(finalQuery, (err, result) => {
                        if (err) {
                            transaction.rollback();
                            return reject(err);
                        }

                        transaction.commit(err => {
                            if (err) {
                                transaction.rollback();
                                return reject(err);
                            }
                            resolve(result);
                        });
                    });
                });
            });
        });
    },
    updateStatusOrderID: (orderID, statusOrderID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID)
                    .input('statusOrderID', mssql.Int, statusOrderID);

                const updateQuery = `
                    UPDATE Orders
                    SET StatusOrderID = @statusOrderID
                    WHERE OrderID = @orderID
                `;

                request.query(updateQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    }

}
module.exports = orderDAO;