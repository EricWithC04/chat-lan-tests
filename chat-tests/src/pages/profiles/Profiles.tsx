import { useState, useEffect } from 'react'
import { ProfileElement } from '../../components/profileElement/ProfileElement'
import styles from './profiles.module.css'

interface Profile {
    id: string
    name: string
    img: string | null
    createdAt: string
    updatedAt: string
}

export const Profiles = () => {

    const [profiles, setProfiles] = useState<Array<Profile>>([])

    useEffect(() => {
        fetch('http://localhost:3500/profile')
            .then(res => res.json())
            .then(res => setProfiles(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles["profile-container"]}>
                <h4 className={styles.title}>Seleccionar Perfil</h4>
                <div className={styles["profile-list"]}>
                    {
                        profiles.map(profile => (
                            <ProfileElement name={profile.name} img={profile.img} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}