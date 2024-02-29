import { useRef, useState } from "react"
import "./Register.scss"

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const emailRef = useRef();
    const passwordRef = useRef();

    const handleStart = () =>{
        setEmail(emailRef.current.value)
    }

    const handleFinish = () =>{
        
        setPassword(passwordRef.current.value)
    }
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">

        <img 
        className="logo"
        src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png" alt="" />

        <button className="loginButton">Đăng nhập</button>
        </div>
      </div>

      <div className="container">
        <h1>Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác</h1>
        <p>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</p>
       <h3>Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</h3>
       {
        !email ?(
            <div className="input">
        
            <input type="text"  placeholder="Địa chỉ Email" ref={emailRef}/>
           <button className="registerButton" onClick={handleStart}>Bắt đầu nào</button>
           
            </div> 
        ) :(
            <div className="input">
        
            <input type="password"  placeholder="Mật khẩu" ref={passwordRef}/>
           <button className="registerButton" onClick={handleFinish}>Bắt đầu</button>
           </div>
        )
       }
       
     
     
      </div>
    </div>
  )
}
