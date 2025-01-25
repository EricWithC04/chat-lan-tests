// import React from 'react'
import styles from './config.module.css'
import inDevelopment from '../../assets/in-development.png'
import { NavBar } from '../../components/navbar/NavBar'

export const Config = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <NavBar />
            </div>
            <div className={styles.info}>
                <img src={inDevelopment} alt="image" />
                <div className={styles["info-text"]}>
                    <h4>Configuración en Desarrollo</h4>
                    <p>Actualmente la funcionalidad de esta sección está en desarrollo, estará disponible pronto!</p>
                </div>
            </div>
        </div>
    )
}