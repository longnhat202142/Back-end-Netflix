import React from "react";
import "./Footer.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <section className="contact-area" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="contact-content text-center">
                <Link href="#" className="text-center-img">
                  <img
                    src="https://cdn.tgdd.vn/Files/2016/01/09/769224/netflix-la-gi-7-665x320.jpg"
                    alt="logo"
                  />
                </Link>
                <p>Xây dựng trang Website xem phim trực tuyến của Long Nhật </p>
                <div className="hr"></div>
                <h6> Email : longnhat03082002@gmail.com</h6>
                <h6>SDT : 0329143975</h6>
                <div className="contact-social">
                  <ul>
                    <li>
                      <Link className="hover-target" href="#">
                        <FacebookOutlinedIcon className="hover-target" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover-target"
                        href="https://github.com/longnhat202142/Back-end-Netflix"
                      >
                        <GitHubIcon />
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover-target"
                        href="https://mail.google.com/mail/u/0/#inbox"
                      >
                        <SendOutlinedIcon />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>
          Copyright &copy; 2024{" "}
          <img
            src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
            alt="logo"
          />{" "}
          All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
