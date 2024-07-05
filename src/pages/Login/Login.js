import axios from "axios";
import React, { useState } from "react";
import "../css/Login.css";

const Login = ({ onLogin }) => {
  const [empNo, setEmpNo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/login', {
        empNo,
        password
      });
      
      if (response.status === 200) {
        const token = response.headers.authorization.replace('Bearer ', ''); // 서버에서 토큰을 response로 받아와 사용
        console.log('login ',token);
        onLogin(token); // 로그인 성공 시 토큰을 상위 컴포넌트로 전달
      } else {
        alert("사원번호와 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("로그인 요청에 실패했습니다. 다시 시도해 주세요.");
    }
    // if (empNo == "user" && password == "user") {
    //   onLogin("user");
    // } else {
    //   alert("id와 비밀번호를 확인하세요.");
    // }
  };

  return (
    <div id="container">
      <img id="harlogo" src="./adaptive-icon.png"/>
      <div id="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="아이디"
                  value={empNo}
                  onChange={(e) => setEmpNo(e.target.value)}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" 
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="로그인" />
          </form>
      </div>
    </div>
  );
};

export default Login;
