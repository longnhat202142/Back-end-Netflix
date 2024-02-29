
import "./Login.scss"

export default function Login() {
 
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">

        <img 
        className="logo"
        src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png" alt="" />

        <button className="loginButton">Đăng nhập</button>
        </div>
      </div>

      <div className="container">
        <form action="">
          <h1>Đăng nhập</h1>
          <input type="email" placeholder="Email hoặc số điện thoại" />
          <input type="password" placeholder="Mật khẩu" />
          <button className="loginButton">Đăng nhập</button>
         

          <div className="login-now">
            Bạn mới tham gia Netflix? <a href="https://www.netflix.com/vn/">Đăng kí ngay</a>
            <p>Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot.  <a href="">Tìm hiểu thêm</a></p>
           
          </div>

        </form>
      </div>
    </div>
  )
}
