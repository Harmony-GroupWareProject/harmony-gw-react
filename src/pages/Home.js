import React, { useState } from "react";
import { Link } from "react-router-dom"
import MenuSidebar from "../components/MenuSidebar";
import './css/Home.css'
import ContentArea from "./ContentArea";

const Home = ({ onLogout }) => {

    const handleLogout = () => {
        onLogout();
    };

    const [activeMenu, setActiveMenu] = useState('');

    return (
        <div className="main-container">
            <MenuSidebar setActiveMenu={setActiveMenu} 
                        handleLogout={handleLogout}/>
            <ContentArea activeMenu={activeMenu}/>
            {/* <button onClick={handleLogout}>Logout</button> */}
            {/* <Link to="/orgChart">조직도 및 사원목록</Link><br />
            <Link to="/fullcalendarf">일정 관리</Link><br />
            <Link to="/hometest">Home Test용</Link><br />
            <Link to="/approval">결재</Link><br /> */}
        </div>
    );
};

export default Home;