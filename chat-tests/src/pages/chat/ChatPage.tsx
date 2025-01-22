// import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import styles from './ChatPage.module.css'
import exampleImage from '../../assets/profile-example.jpg'

export const ChatPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbar}></div>
            <div className={styles["chat-list"]}></div>
            <div className={styles["chat-container"]}>
                <div className={styles["messages-header"]}>
                    <img src={exampleImage} alt="" />
                    <h6>Juan Perez</h6>
                </div>
                <div className={styles["messages-container"]}></div>
                <div className={styles["messages-input"]}>
                    <form>
                        <input type="text" placeholder='Escribe un mensaje ...'/>
                        <button type="submit"><FaPaperPlane /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
