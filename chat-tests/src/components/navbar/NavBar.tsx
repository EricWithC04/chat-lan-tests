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
            <LuMessageCircleMore />
            <GoGear />
            <IoExitOutline />
        </div>
    )
}
