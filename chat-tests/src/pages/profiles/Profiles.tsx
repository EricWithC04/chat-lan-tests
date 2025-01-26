import { useState, useEffect } from 'react'
import { ProfileElement } from '../../components/profileElement/ProfileElement'
import { FiPlusCircle } from "react-icons/fi";
import styles from './profiles.module.css'
import { CreateProfileModal } from '../../components/createProfileModal/CreateProfileModal';

interface Profile {
    id: string
    name: string
    img: string | null
    createdAt: string
    updatedAt: string
}

export const Profiles = () => {

    const [profiles, setProfiles] = useState<Array<Profile>>([])
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        fetch('http://localhost:3500/profile')
            .then(res => res.json())
            .then(res => setProfiles(res))
            .catch(err => console.log(err))
    }, [])

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div className={styles.container}>
            {
                showModal ? (
                    <div className={styles["modal-container"]}>
                        <CreateProfileModal handleCloseModal={handleCloseModal} />
                    </div>
                ) : null
            }
            <div className={styles["profile-container"]}>
                <div className={styles.header}>
                    <h4 className={styles.title}>Seleccionar Perfil</h4>
                    <FiPlusCircle size={30} className={styles["add-profile"]} onClick={() => setShowModal(true)}/>
                </div>
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