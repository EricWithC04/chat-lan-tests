// import React from 'react'
import styles from './MessageElement.module.css'

export const MessageElement = ({ msg, user }: { msg: string, user: number }) => {
    return (
        <div className={`${styles.container} ${ user === 1 ? styles.right : styles.left }`}>
            <p className={styles.message}>{msg}</p>
        </div>
    )
}
