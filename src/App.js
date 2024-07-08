// App.js 또는 상위 컴포넌트

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Main/Home";
import OrgChart from "./pages/OrganizationChart/OrgChart";
import FullCalendarF from "./pages/Schedule/FullCalendarF";
// import EmpDetail from "./pages/EmpDetail";
import Approval from "./pages/Approval/Approval";
import DocAddPage from "./pages/Approval/DocTemplate/DocAddPage";
import Register from "./pages/Register/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰 유무를 확인하여 로그인 상태를 설정
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    // 토큰을 저장소에 저장
    localStorage.setItem("token", token);
    navigate("/home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    // 로그아웃 시 토큰 삭제
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [selectedDate, setSelectedDate] = useState(null);

  // 날짜 변경 시 호출될 함수
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    console.log('변경');
  };

  return (
      <Routes>
        
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home onLogout={handleLogout} />} />
        <Route path="/orgChart" element={<OrgChart />} />
        <Route path="/fullcalendarf" element={<FullCalendarF />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/register" element={<Register />} />  
        {/* <Route path="/aprtemplate" element={<DocAddPage />} /> */}

        {/* <Route path="/emp-detail/:empNo" element={<EmpDetail />} /> */}
      </Routes>
  );
};

export default App;