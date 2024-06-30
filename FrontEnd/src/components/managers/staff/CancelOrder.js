import React, { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import { useLocation } from "react-router-dom";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";

function CancelOrder() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const ordersPerPage = 10;  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/order/getOrdersByStatusOrderID/3"
        );
        const data = await response.json();
        setOrders(data.address);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const viewOrderDetails = async (order) => {
    const orderDetails = await fetchOrderDetails(order.OrderID);
    setSelectedOrder({ ...order, details: orderDetails });
    await fetchShippingAddress(order.OrderID);
    setIsDetailModalVisible(true);
  };

  const handleModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
    setShippingAddress(null);
  };

  const fetchOrderDetails = async (orderID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/order/getOrderDetailByOrderID/${orderID}`
      );
      const data = await response.json();
      return data.address; // Assuming 'address' is the array containing order details
    } catch (error) {
      console.error("Error fetching order details:", error);
      return [];
    }
  };

  const fetchShippingAddress = async (orderID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/shippingAddress/getInfoShippingByOrderID/${orderID}`
      );
      const data = await response.json();
      setShippingAddress(data);
    } catch (error) {
      console.error("Error fetching shipping address:", error);
      setShippingAddress(null);
    }
  };

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <div className="confirm-container">
      <table>
        <thead>
          <tr className="row">
            <th className="col-md-2">Mã đơn hàng</th>
            <th className="col-md-4">Ngày đặt hàng</th>
            <th className="col-md-3">Tổng</th>
            <th className="col-md-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="row" key={order.OrderID}>
              <td className="col-md-2">{order.OrderID}</td>
              <td className="col-md-4">
                {new Date(order.OrderDate).toLocaleDateString()}
              </td>
              <td className="col-md-3">
                {formatPrice(parseInt(order.TotalAmount))}
              </td>
              <td className="col-md-3 nut-xndh">
                <button
                  type="button"
                  className="btn btn-primary xndh"
                  onClick={() => viewOrderDetails(order)}
                >
                  Thông tin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container-cf">
        <ThrowPage
          current={currentPage}
          onChange={handlePageChange}
          total={orders.length}
          productsPerPage={ordersPerPage}
        />
      </div>
      {selectedOrder && isDetailModalVisible && (
        <Modal
          visible={isDetailModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}
        >
          <div className="modal-content-scrollable-thinhh">
            <div className="ttdh-thinh">
            <p className="reason-content"><strong>Lý do hủy:</strong> {selectedOrder.ReasonCancelContent}</p>

              <h2>Thông tin đơn hàng</h2>
              <table className="table-info-order">
                <tbody>
                  <tr>
                    <td className="mdh">
                      <strong>Mã đơn hàng:</strong>
                    </td>
                    <td>{selectedOrder.OrderID}</td>
                  </tr>
                  <tr>
                    <td className="mdh">
                      <strong>Ngày đặt hàng:</strong>
                    </td>
                    <td>
                      {new Date(selectedOrder.OrderDate).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="mdh">
                      <strong>Tổng:</strong>
                    </td>
                    <td>{formatPrice(selectedOrder.TotalAmount)}</td>
                  </tr>
                  {shippingAddress && (
                    <>
                      <tr>
                        <td className="mdh">
                          <strong>Người nhận:</strong>
                        </td>
                        <td>{shippingAddress[0].Receiver}</td>
                      </tr>
                      <tr>
                        <td className="mdh">
                          <strong>Số điện thoại:</strong>
                        </td>
                        <td>{shippingAddress[0].PhoneNumber}</td>
                      </tr>
                      <tr>
                        <td className="mdh">
                          <strong>Địa chỉ:</strong>
                        </td>
                        <td>{shippingAddress[0].Address}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <table className="table-products-order">
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.details.map((detail) => (
                    <tr key={detail.ProductID}>
                      <td>{detail.ProductID}</td>
                      <td>{detail.ProductName}</td>
                      <td>
                        <img
                          src={detail.Image}
                          alt={detail.ProductName}
                          width="50"
                        />
                      </td>
                      <td>{detail.Quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CancelOrder;
