import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import ProductDetailModal from "./ProductDetailModal";
import EditProductModal from "./EditProductModal";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const productsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/product/getInfoProductsDetail")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (categoryFilter !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.ProductCategoryName === categoryFilter
      );
    }

    if (statusFilter !== "All") {
      updatedProducts = updatedProducts.filter((product) => {
        if (statusFilter === "Tạm ẩn") {
          return product.Status === false;
        } else if (statusFilter === "Còn hàng") {
          return product.Status === true && product.StockQuantity > 0;
        } else if (statusFilter === "Hết hàng") {
          return product.Status === true && product.StockQuantity === 0;
        }
        return true;
      });
    }

    if (sortOrder === "asc") {
      updatedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
    } else {
      updatedProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
    }

    setFilteredProducts(updatedProducts);
  }, [products, sortOrder, categoryFilter, statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.getAttribute("data-value"));
    setShowCategoryDropdown(false);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.getAttribute("data-value"));
    setShowStatusDropdown(false);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".category-header") && showCategoryDropdown) {
        setShowCategoryDropdown(false);
      }
      if (!event.target.closest(".status-header") && showStatusDropdown) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategoryDropdown, showStatusDropdown]);

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedProductForEdit(null);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/api/v1/product/deleteProduct/${productToDelete}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message !== "Deleted") {
          message.error("Lỗi khi xóa sản phẩm.");
        } else {
          setProducts(
            products.map((product) =>
              product.ProductID === productToDelete
                ? { ...product, Status: 0 }
                : product
            )
          );
          message.success("Xóa sản phẩm thành công!");
        }
        setShowDeletePopup(false);
      })
      .catch((error) => {
        message.error("Lỗi khi xóa sản phẩm: " + error.message);
        setShowDeletePopup(false);
      });
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setProductToDelete(null);
  };

  const handleEditClick = (product) => {
    setSelectedProductForEdit(product);
  };

  const handleSaveProduct = (updatedProduct) => {
    fetch(
      `http://localhost:5000/api/v1/product/editProduct/${updatedProduct.ProductID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(
          products.map((product) =>
            product.ProductID === updatedProduct.ProductID
              ? updatedProduct
              : product
          )
        );
        message.success("Sản phẩm đã được cập nhật thành công!");
        setSelectedProductForEdit(null);
      })
      .catch((error) => {
        message.error("Lỗi khi cập nhật sản phẩm: " + error.message);
      });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="product-container">
      <div className="main-content-product">
        <div className="d-flex justify-content-end align-items-end">
          <Link to="/addingproduct">
            <button type="button" className="button-add-product">
              <span className="far fa-plus-square btn btn-secondary"></span>
            </button>
          </Link>
        </div>
        <div className="product-list">
          <table>
            <thead>
              <tr>
                <th>Mã</th>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  Tên sản phẩm<FontAwesomeIcon icon={faSort} />
                </th>
                <th className="category-header">
                  Loại sản phẩm{" "}
                  <FontAwesomeIcon
                    icon={faFilter}
                    onClick={toggleCategoryDropdown}
                  />
                  {showCategoryDropdown && (
                    <ul className="dropdown-thinh-staff">
                      <li
                        className="dropdown-li-thinh"
                        data-value="All"
                        onClick={handleCategoryFilter}
                      >
                        Tất cả
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Sữa cho em bé"
                        onClick={handleCategoryFilter}
                      >
                        Sữa cho em bé
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Sữa cho mẹ bầu"
                        onClick={handleCategoryFilter}
                      >
                        Sữa cho mẹ bầu
                      </li>
                    </ul>
                  )}
                </th>
                <th className="status-header">
                  Trạng thái{" "}
                  <FontAwesomeIcon
                    icon={faFilter}
                    onClick={toggleStatusDropdown}
                  />
                  {showStatusDropdown && (
                    <ul className="dropdown-thinh-staff">
                      <li
                        className="dropdown-li-thinh"
                        data-value="All"
                        onClick={handleStatusFilter}
                      >
                        Tất cả
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Tạm ẩn"
                        onClick={handleStatusFilter}
                      >
                        Tạm ẩn
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Còn hàng"
                        onClick={handleStatusFilter}
                      >
                        Còn hàng
                      </li>
                      <li
                        className="dropdown-li-thinh"
                        data-value="Hết hàng"
                        onClick={handleStatusFilter}
                      >
                        Hết hàng
                      </li>
                    </ul>
                  )}
                </th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.ProductID}>
                  <td>{product.ProductID}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.ProductCategoryName}</td>
                  <td>
                    {(product.Status === null) || (product.Status === false)
                      ? "Tạm ẩn"
                      : product.Status === true && parseInt(product.StockQuantity) > 0
                        ? "Còn hàng"
                        : "Hết hàng"}
                  </td>
                  <td className="nut-act">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleDetailClick(product)}
                    >
                      Xem
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(product.ProductID)}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleEditClick(product)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-thinh">
          <ThrowPage
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      {selectedProductForEdit && (
        <EditProductModal
          product={selectedProductForEdit}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      )}
      {showDeletePopup && (
        <DeleteConfirmationPopup
          visible={showDeletePopup}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Products;
