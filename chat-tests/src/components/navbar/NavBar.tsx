// import React from 'react'
import styles from "./NavBar.module.css"
import exampleImage from "../../assets/profile-example.jpg"
import { LuMessageCircleMore } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";

export const NavBar = () => {
    return (
        <div className={styles.container}>
            <img src={exampleImage} alt="foto" />
            <div className={styles["icon-container"]}>
                <LuMessageCircleMore size={30} className={styles["icon"]} />
            </div>
            <div className={styles["icon-container"]}>
                <GoGear size={30} className={styles["icon"]} />
            </div>
            <div className={`${styles["icon-container"]} ${styles.logout}`}>
                <IoExitOutline size={30} className={styles["icon"]} />
            </div>
        </div>
    )
}
