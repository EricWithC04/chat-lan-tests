// import React from 'react'
import styles from './MessageElement.module.css'

export const MessageElement = ({ msg, user }: { msg: string, user: number | string }) => {

    const userID = localStorage.getItem("userId")

    return (
        <div className={`${styles.container} ${ user === userID ? styles.right : styles.left }`}>
            <p className={styles.message}>{msg}</p>
        </div>
    )
}
