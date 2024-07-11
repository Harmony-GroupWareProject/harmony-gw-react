import React, { useState } from "react";
import { Link } from "react-router-dom"
import MainMenuSidebar from "../../components/Main/MainMenuSidebar";
import '../css/Home.css'
import MainContentArea from "./MainContentArea";

const Home = ({ onLogout }) => {

    const handleLogout = () => {
        onLogout();
    };

    const [activeMenu, setActiveMenu] = useState('');

    return (
        <div className="main-container">
            <MainMenuSidebar setActiveMenu={setActiveMenu} 
                        handleLogout={handleLogout}/>
            <MainContentArea activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
        </div>
    );
};

export default Home;

