// import React from 'react'
import styles from './ChatElement.module.css'
import exampleImage from '../../assets/profile-example.jpg'

interface ChatElementProps {
    id: string
    name: string 
    msg: string
    selected: boolean
    handleSelectChat: (name: string) => void
}

export const ChatElement = ({ id, name, msg, selected, handleSelectChat }: ChatElementProps) => {
    return (
        <div 
            className={`${styles.container} ${selected ? styles.selected : ''}`}
            onClick={() => handleSelectChat(id)}
        >
            <img src={exampleImage} alt="foto" />
            <div className={styles.info}>
                <h6>{name}</h6>
                <p className={styles.message}>{msg}</p>
            </div>
        </div>
    )
}
