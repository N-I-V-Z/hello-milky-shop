import React, { useState } from "react";
import "./Voucher.css";
import { message } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatPrice } from "../../utils/formatPrice";
import config from "../../config/config";

message.config({
  top: 10,
  duration: 2,
});

function VoucherAdd() {
  const [voucherData, setVoucherData] = useState({
    voucherName: "",
    discountPercentage: "",
    minDiscount: "",
    maxDiscount: "",
    startDate: null,
    expiryDate: null,
    quantity: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "minDiscount") {
      const formattedMinDiscount = formatPrice(value);
      setVoucherData((prevData) => ({
        ...prevData,
        minDiscount: value.replace(/\D/g, ''), // Lưu giá trị số
        formattedMinDiscount // Lưu giá trị đã được định dạng để hiển thị
      }));
    } else if (name === "maxDiscount") {
      const formattedMaxDiscount = formatPrice(value);
      setVoucherData((prevData) => ({
        ...prevData,
        maxDiscount: value.replace(/\D/g, ''), // Lưu giá trị số
        formattedMaxDiscount // Lưu giá trị đã được định dạng để hiển thị
      }));
    } else {
      setVoucherData({
        ...voucherData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date, fieldName) => {
    setVoucherData((prevData) => ({
      ...prevData,
      [fieldName]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      voucherName,
      discountPercentage,
      minDiscount,
      maxDiscount,
      startDate,
      expiryDate,
      quantity,
    } = voucherData;

    if (!voucherName) {
      message.warning("Tên voucher không được bỏ trống.");
      return;
    }
    if (voucherName.length > 30) {
      message.warning("Tên voucher không được quá 30 kí tự.");
      return;
    }
    if (minDiscount === null || minDiscount === "") {
      message.warning("Giảm tối thiểu không được bỏ trống.");
      return;
    }
    if (minDiscount < 0) {
      message.warning("Giảm tối thiểu không được nhỏ hơn 0.");
      return;
    }
    if (minDiscount > 1000000000) {
      message.warning("Giảm tối thiểu không được quá 1 tỷ.");
      return;
    }
    if (quantity === null || quantity === "") {
      message.warning("Số lượng không được bỏ trống.");
      return;
    }
    if (quantity < 0) {
      message.warning("Số lượng không được nhỏ hơn 0.");
      return;
    }
    if (maxDiscount === null || maxDiscount === "") {
      message.warning("Giảm tối đa không được bỏ trống.");
      return;
    }
    if (maxDiscount < 0) {
      message.warning("Giảm tối đa không được nhỏ hơn 0.");
      return;
    }
    if (maxDiscount > 1000000000) {
      message.warning("Giảm tối đa không được quá 1 tỷ");
      return;
    }
    if (!startDate) {
      message.warning("Ngày bắt đầu không được bỏ trống.");
      return;
    }

    if (!expiryDate) {
      message.warning("Ngày kết thúc không được bỏ trống.");
      return;
    }
    if (new Date(expiryDate) < new Date(startDate)) {
      message.warning("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.");
      return;
    }
    if (discountPercentage === null || discountPercentage === "") {
      message.warning("Phần trăm giảm giá không được bỏ trống.");
      return;
    }
    if (discountPercentage < 0) {
      message.warning("Phần trăm giảm giá không được nhỏ hơn 0.");
      return;
    }
    if (discountPercentage > 100) {
      message.warning("Phần trăm giảm giá không được quá 100.");
      return;
    }

    fetch(`${config.API_ROOT}/api/v1/voucher/addVoucher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucherData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        // Hiển thị thông báo thành công
        message.success('Voucher đã được tạo thành công');

        // Đặt lại trạng thái của form và thông báo
        setSuccessMessage("");
        setErrorMessage("");
        setVoucherData({
          voucherName: "",
          discountPercentage: "",
          minDiscount: "",
          maxDiscount: "",
          startDate: null,
          expiryDate: null,
          quantity: "",
        });
      })
      .catch((error) => {
        // Xử lý lỗi khi gọi API
        setErrorMessage("Error creating voucher: " + error.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="voucher-form-thinhvcher">
      {successMessage && (
        <p className="success-message-thinhvcher">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message-thinhvcher">{errorMessage}</p>
      )}
      <h1>Tạo voucher</h1>
      <form onSubmit={handleSubmit}>
        <div className="half-width">
          <label htmlFor="voucherName">Tên Voucher</label>
          <input
            type="text"
            id="voucherName"
            name="voucherName"
            value={voucherData.voucherName}
            onChange={handleChange}
          />

          <label htmlFor="quantity">Số lượng</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={voucherData.quantity}
            onChange={handleChange}
          />

          <label htmlFor="startDate">Ngày bắt đầu</label>
          <DatePicker
            selected={voucherData.startDate}
            onChange={(date) => handleDateChange(date, "startDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
          />

          <label htmlFor="discountPercentage">Phần trăm giảm giá (%)</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={voucherData.discountPercentage}
            onChange={handleChange}
          />
        </div>
        <div className="half-width">
          <label htmlFor="minDiscount">Giảm tối thiểu</label>
          <input
            type="number"
            id="minDiscount"
            name="minDiscount"
            value={voucherData.minDiscount}
            onChange={handleChange}
          />

          <label htmlFor="maxDiscount">Giảm tối đa</label>
          <input
            type="number"
            id="maxDiscount"
            name="maxDiscount"
            value={voucherData.maxDiscount}
            onChange={handleChange}
          />

          <label htmlFor="expiryDate">Ngày kết thúc</label>
          <DatePicker
            selected={voucherData.expiryDate}
            onChange={(date) => handleDateChange(date, "expiryDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
          />

          <button type="submit" className="create-voucher">
            Tạo voucher
          </button>
        </div>
      </form>
    </div>
  );
}

export default VoucherAdd;
