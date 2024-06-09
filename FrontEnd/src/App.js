import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./managers/staff/Navbar";
import Dashboard from "./managers/staff/Dashboard";
import Voucher from "./managers/staff/Voucher";
import Report from "./managers/staff/Report";
import Posts from "./managers/staff/Posts";
import Confirm from "./managers/staff/Confirm";
import Products from "./managers/staff/Products";
import "./App.css";
import Sidebar from "./managers/staff/Slidebar";
import Footer from "./users/component/Footer";
import VoucherAdd from "./managers/staff/VoucherAdd";
import ProductAdd from "./managers/staff/ProductAdd";
import PostsAdd from "./managers/staff/PostsAdd";
import AdminSlidebar from "./managers/admin/AdminSlidebar";
import MainDash from "./managers/admin/MainDash";
import MangageAdmin from "./managers/admin/ManageAdmin";
import ManageStaff from "./managers/admin/ManageStaff";
import Signup from "./users/component/Signup";
import SignupSt from "./managers/admin/SignupSt";
import ManageMember from "./managers/admin/ManageMember";
import SignupMem from "./managers/admin/SignupMem";
import ProductContentMom from "./users/ui-product-mom/ProductContentMom";

import ProductDetail from "./users/ui-product-mom/ProductDetailMom";
import NavCate from "./users/ui-product-mom/NavCate";
import RelatedProducts from "./users/ui-product-mom/RelatedProductMom";
// import Footer from './users/component/Footer';
import Header from "./users/component/Header";
import Login from "./users/component/Login";
import Menu from "./users/component/Menu";
import News from "./users/component/News";
import Product1 from "./users/component/Product1";
import ListProductMom from "./users/ui-list-product-mom/ListProductMom";
import SliderMoney from "./users/ui-list-product-mom/SliderMoney";
import ScrollToTopButton from "./users/ui-product-mom/ScrollToTopButton";
import ThrowPage from "./users/ui-list-product-mom/ThrowPage";
import Termofuse from "./users/component/Termofuse";
import VoucherStore from "./users/component/VoucherStore";
import ShoppingCart from "./users/component/ShoppingCart";
import Bigsales from "./users/component/Bigsales";
import Dealsoc from "./users/component/Dealsoc";
import LoginEmail from "./users/component/LoginEmail";
import ListProductMomScreen from "./users/ui-list-product-mom/ListProductMomScreen";
import ListProductBbScreen from "./users/ui-list-product-mom/ListProductBbScreen";
import AllProductScreen from "./users/ui-list-product-mom/AllProductScreen";
import StaffScreen from "./managers/staff/StaffScreen";
import Signup2 from "./users/component/Signup2";
import LoginSuccess from "./users/component/LoginSuccess";
import { useSelector } from "react-redux";

import ProductScreen from "./users/ui-product-mom/ProductScreen";
import ResetPassword from './users/component/ResetPassword';

import RichTextEditor from "./users/component/RichTextEditor"; // Đảm bảo đường dẫn đúng

function App() {
  const { role } = useSelector((state) => state.auth);
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path="/RichTextEditor" element={<RichTextEditor />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-email/:email" element={<LoginEmail />} />
          <Route path="/LoginSuccess/:token" element={<LoginSuccess />} />
          <Route path="/signup" element={<Signup />} />
          {role === 2 && <Route path="/dashboard" element={<Dashboard />} />}
          {role === 2 && <Route path="/sidebar" element={<Sidebar />} />}
          {role === 2 && <Route path="/voucher-staff" element={<Voucher />} />}
          {role === 2 && <Route path="/report" element={<Report />} />}
          {role === 2 && <Route path="/posts" element={<Posts />} />}
          {role === 2 && <Route path="/confirm" element={<Confirm />} />}
          {role === 2 && <Route path="/products" element={<Products />} />}
          {role === 2 && <Route path="/addingvoucher" element={<VoucherAdd />} />}
          {role === 2 && <Route path="/addingproduct" element={<ProductAdd />} />}
          {role === 2 && <Route path="/addingpost" element={<PostsAdd />} />}
          {role === 2 && <Route path="/addingpost" element={<PostsAdd />} />}

          <Route path="/all-products/:keyword" element={<AllProductScreen />} />
          <Route path="/sua-cho-be" element={<ListProductBbScreen />} />
          <Route path="/sua-cho-me" element={<ListProductMomScreen />} />
          <Route path="/product/:productId" element={<ProductScreen />} />
          <Route path="/" element={<Product1 />} />

          <Route path="/Termofuse" element={<Termofuse />} />
          <Route path="/voucher" element={<VoucherStore />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/Bigsales" element={<Bigsales />} />
          <Route path="/News" element={<News />} />
          <Route path="/Dealsoc" element={<Dealsoc />} />
        </Routes>
        {(role === 0 || role === 3) && <Footer />}
      </Router>
    </div>
  );
}

export default App;
