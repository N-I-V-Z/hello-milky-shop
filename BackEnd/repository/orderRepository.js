const orderDAO = require('../dao/orderDAO');

const orderRepository = {

    refundQuantityOfProduct: (orderID) => {
        return orderDAO.refundQuantityOfProduct(orderID);
    },

    checkOrderOfUser: (UserID) => {
        return orderDAO.checkOrderOfUser(UserID);
    },

    transferOrderDetailsToNewOrder: (OrderID) => {
        return orderDAO.transferOrderDetailsToNewOrder(OrderID);
    },
    getInfoToShip: (StatusOrderID) => {
        return orderDAO.getInfoToShip(StatusOrderID);
    },
    getUserIDFromOrderID: (OrderID) => {
        return orderDAO.getUserIDFromOrderID(OrderID);
    },
    countOrdersIn7Days: () => {
        return orderDAO.countOrdersIn7Days();
    },
    countNewOrders: () => {
        return orderDAO.countNewOrders();
    },
    countOrdersByStatusOrderID: (statusOrderID, timePeriod) => {
        return orderDAO.countOrdersByStatusOrderID(statusOrderID, timePeriod);
    },
    removeProductFromOrder: (orderID, productID) => {
        return orderDAO.removeProductFromOrder(orderID, productID);
    },
    countOrdersPayed: () => {
        return orderDAO.countOrdersPayed();
    },
    createOrder: (userID) => {
        return orderDAO.createOrder(userID);
    },
    addProductToOrder: (orderID, productID, quantity, price) => {
        return orderDAO.addProductToOrder(orderID, productID, quantity, price);
    },
    getOrder: (orderID) => {
        return orderDAO.getOrder(orderID);
    },
    getOpenOrderForUser: (userID) => {
        return orderDAO.getOpenOrderForUser(userID);
    },
    checkoutOrder: (orderID) => {
        return orderDAO.checkoutOrder(orderID);
    },
    applyVoucherToOrder: (orderID, voucherID) => {
        return orderDAO.applyVoucherToOrder(orderID, voucherID);
    },
    getOrderDetailByOrderID: (orderID) => {
        return orderDAO.getOrderDetailByOrderID(orderID);
    },
    getOrdersByUserID: (userID) => {
        return orderDAO.getOrdersByUserID(userID);
    },
    changeQuantityOfProductInOrder: (orderID, productQuantities) => {
        return orderDAO.changeQuantityOfProductInOrder(orderID, productQuantities);
    },
    updateStatusOrderID: (orderID, statusOrderID) => {
        return orderDAO.updateStatusOrderID(orderID, statusOrderID);
    },
    updateStatusAfterDays: (days, oldStatus, newStatus) => {
        return orderDAO.updateStatusAfterDays(days, oldStatus, newStatus);
    },

    getOrdersByStatusOrderID: (statusOrderID) => {
        return orderDAO.getOrdersByStatusOrderID(statusOrderID);
    },
    addInfoCusToOrder: (receiver, phoneNumber, address, userID) => {
        return orderDAO.addInfoCusToOrder(receiver, phoneNumber, address, userID);
    },
    getTodayRevenue: () => {
        return orderDAO.getTodayRevenue();
    },
    getRevenueLastSevenMonths: () => {
        return orderDAO.getRevenueLastSevenMonths();
    },
    cancelOrder: (orderId, reasonCancelContent) => {
        return orderDAO.cancelOrder(orderId, reasonCancelContent);
    },
    getOrderByID: (orderId) => {
        return orderDAO.getOrderById(orderId);
    },
    updateTotalAmountOfOrder: (orderID, totalAmount) => {
        return orderDAO.updateTotalAmountOfOrder(orderID, totalAmount);
    },
    updateShippingAddressID: (orderID, shippingAddressID) => {
        return orderDAO.updateShippingAddressID(orderID, shippingAddressID);
    },
};

module.exports = orderRepository;
