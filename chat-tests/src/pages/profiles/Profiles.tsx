// import React from 'react'
import { ProfileElement } from '../../components/profileElement/ProfileElement'
import styles from './profiles.module.css'

export const Profiles = () => {
    return (
        <div className={styles.container}>
            <div className={styles["profile-container"]}>
                <h4 className={styles.title}>Seleccionar Perfil</h4>
                <div className={styles["profile-list"]}>
                    <ProfileElement />
                    <ProfileElement />
                    <ProfileElement />
                    {/* <ProfileElement />
                    <ProfileElement />
                    <ProfileElement /> */}
                </div>
            </div>
        </div>
    )
}