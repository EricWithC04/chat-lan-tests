// import React from 'react'
import styles from './profileElement.module.css'
// import imageExample from '../../assets/profile-example.jpg'
import defaultProfile from '../../assets/profile-default.jpg'
import { useNavigate } from 'react-router-dom'

export const ProfileElement = ({ id, name, img }: { id: string, name: string, img: string | null }) => {

    const navigate = useNavigate()

    const handleClick = (userId: string) => {
        localStorage.setItem("userId", userId)
        fetch(`http://localhost:3500/login/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((_res) => navigate("/chat"))
            .catch(err => console.log(err))
    }

    return (
        <div className={styles["profile-element-container"]}>
            <div onClick={() => handleClick(id)} className={styles["profile-element-info"]}>
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