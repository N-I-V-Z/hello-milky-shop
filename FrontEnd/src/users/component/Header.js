import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { logout } from "../store/actions/authAction";
import { apiGetOne } from "../apis/userService";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState({});
  const { role } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = document.getElementById("search_suggest-compo-tri").value;
    navigate(`/all-products/${keyword}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      let response = await apiGetOne(token);
      if (response?.data.err === 0) setUserData(response.data?.data);
    };
    token && fetchUser();
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest(".account-menu")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const confirmLogout = () => {
    setShowConfirmation(true);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <header className="header-compo-tri">
      <div className="container-compo-tri">
        <div className="logo-compo-tri">
          {role === 0 || role === 3 ? (
            <Link to="/">
              <img src="/ImageMilkShop/Logo.png" alt="LogoMilky" />
            </Link>
          ) : (
            <img src="/ImageMilkShop/Logo.png" alt="LogoMilky" />
          )}
        </div>
        {(role === 0 || role === 3) && (
          <div className="box_search-compo-tri">
            <form onSubmit={handleSearch} id="fromSearch">
              <input
                type="text"
                name="keyword"
                placeholder="Bố mẹ tìm gì cho bé hôm nay?"
                id="search_suggest-compo-tri"
              />
              <button className="search-button" type="submit" id="btnSearch">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        )}

        <div className="box_right_header-compo-tri">
          {isLoggedIn ? (
             
              <div className="account-menu-Nhan">
                <Link to="/profile"> 
                <span>
                  <i className="fas fa-user"></i> {userData?.UserName}
                </span>
                </Link>
              </div>
            
          ) : (
            <div className="box_user-compo-tri">
              <i className="fa fa-user"></i>
              <Link to="/login">Đăng nhập</Link>
              <span> | </span>
              <Link to="/signup">Đăng ký</Link>
            </div>
          )}
          {role === 3 && (
            <div className="box_cart-compo-tri">
              <Link to="/ShoppingCart">
                <i className="fa fa-shopping-cart"></i>
                <p>Giỏ hàng</p>
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div>
              <div className="dangxuatNhan">
                <span className="logout-link" onClick={confirmLogout}>
                  <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </span>
              </div>

              {showConfirmation && (
                <div className="confirmation-dialog">
                  <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                  <button
                    className="DongY btn btn-success"
                    onClick={() => dispatch(logout())}
                  >
                    Đồng ý
                  </button>
                  <button className="Huy btn btn-danger" onClick={cancelLogout}>
                    Hủy bỏ
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
