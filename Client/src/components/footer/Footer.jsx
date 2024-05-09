import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      {" "}
      <footer>
        <div class="container">
          <div class="footer-content">
            <h3>Liên hệ</h3>
            <p>Tên : Nhật</p>
            <p>SDT : 0329143975</p>
            <p>Địa chỉ : Huế</p>
          </div>
          <div class="footer-content">
            <h3>Thông tin thêm</h3>
            <ul class="list">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div class="footer-content">
            <h3>Theo dõi</h3>
            <ul class="social-icons">
              <li>
                <a href="">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-bar">
          <p>&copy; 2023 your company . All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
