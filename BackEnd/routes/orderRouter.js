const router = require('express').Router();
require('dotenv').config();

const orderController = require("../controller/orderController");

// Tạo một đơn hàng mới cho user
router.post('/createOrder', orderController.createOrder);

// Thêm sản phẩm vào đơn hàng hiện tại của user
router.post('/addProductToOrder', orderController.addProductToOrder);

// Lấy thông tin chi tiết của một đơn hàng theo orderID
router.get('/getOrder/:orderID', orderController.getOrder);

// Thanh toán đơn hàng hiện tại của user
router.post('/checkoutOrder', orderController.checkoutOrder);

// Lấy tất cả các đơn hàng của một user theo userID
router.get('/getOrdersByUserID/:userID', orderController.getOrdersByUserID);

router.get('/getOrderDetailByOrderID/:orderID', orderController.getOrderDetailByOrderID);

// Thay đổi số lượng sản phẩm trong đơn hàng
router.post('/changeQuantityOfProductInOrder', orderController.changeQuantityOfProductInOrder);

// Cập nhật trạng thái đơn hàng
router.post('/updateStatusOrderID/:OrderID', orderController.updateStatusOrderID);

router.get('/getOpenOrderForUser/:id', orderController.getOpenOrderForUser);
//Thêm thông tin cus vào đơn hàng
router.post('/addInfoCusToOrder', orderController.addInfoCusToOrder);

router.get('/countOrdersByStatusOrderID/:id', orderController.countOrdersByStatusOrderID);

router.get('/countOrdersPayed', orderController.countOrdersPayed);

router.get('/countNewOrders', orderController.countNewOrders);

router.get('/countOrdersIn7Days', orderController.countOrdersIn7Days);

router.post('/removeProductFromOrder', orderController.removeProductFromOrder);

router.get('/getOrdersByStatusOrderID/:statusOrderID', orderController.getOrdersByStatusOrderID);

router.get('/getTodayRevenue', orderController.getTodayRevenue);

router.get('/getRevenueLastSevenMonths', orderController.getRevenueLastSevenMonths);

router.post('/cancelOrder', orderController.cancelOrder);

router.post('/updateTotalAmountOfOrder', orderController.updateTotalAmountOfOrder);

router.post('/updateShippingAddressID', orderController.updateShippingAddressID);

router.post('/getInfoToShip', orderController.getInfoToShip);

router.post('/transferOrderDetailsToNewOrder', orderController.transferOrderDetailsToNewOrder);

router.post('/checkOrderOfUser', orderController.checkOrderOfUser);

module.exports = router