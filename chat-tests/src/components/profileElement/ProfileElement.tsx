// import React from 'react'
import styles from './profileElement.module.css'
// import imageExample from '../../assets/profile-example.jpg'
import defaultProfile from '../../assets/profile-default.jpg'
import { useNavigate } from 'react-router-dom'

export const ProfileElement = ({ name, img }: { name: string, img: string | null }) => {

    const navigate = useNavigate()

    return (
        <div className={styles["profile-element-container"]}>
            <div onClick={() => navigate("/chat")} className={styles["profile-element-info"]}>
                <div className={styles["profile-element-image"]}>
                    <img src={img === null ? defaultProfile : img} alt="foto" />
                    <h6>{name}</h6>
                </div>
                <button className={styles["profile-element-button"]}>...</button>
            </div>
            <hr />
        </div>
    )
}