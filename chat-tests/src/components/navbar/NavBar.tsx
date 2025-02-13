// import React from 'react'
import styles from "./NavBar.module.css"
import exampleImage from "../../assets/profile-example.jpg"
import { useNavigate, useLocation } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";

export const NavBar = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const handleChangePath = (path: string) => {
        if (path !== location.pathname) navigate(path)
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        fetch('http://localhost:3500/logout', { method: 'POST' })
            .then(_res => navigate("/"))
            .catch(err => console.error(err))
    }

    return (
        <div className={styles.container}>
            <img src={exampleImage} alt="foto" />
            <div 
                className={`${styles["icon-container"]} ${location.pathname === "/chat" ? styles['selected'] : ''}`} 
                onClick={() => handleChangePath("/chat")}
            >
                <LuMessageCircleMore size={30} className={styles["icon"]} />
            </div>
            <div 
                className={`${styles["icon-container"]} ${location.pathname === "/config" ? styles['selected'] : ''}`}
                onClick={() => handleChangePath("/config")}
            >
                <GoGear size={30} className={styles["icon"]} />
            </div>
            <div className={`${styles["icon-container"]} ${styles.logout}`} onClick={handleLogout}>
                <IoExitOutline size={30} className={styles["icon"]} />
            </div>
        </div>
    )
}
