import React, { useState } from 'react'
import styles from './CreateProfileModal.module.css'
import { IoIosClose } from "react-icons/io";

interface CreateProfileModalProps {
    handleCloseModal: () => void
    isVisible: boolean
}

interface CreateProfileData {
    name: string
    img: string | null
}

export const CreateProfileModal = ({ handleCloseModal, isVisible }: CreateProfileModalProps) => {

    const [data, setData] = useState<CreateProfileData>({
        name: '',
        img: null
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch('http://localhost:3500/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(_res => {
                handleCloseModal()
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setData(prev => ({ 
            ...prev, 
            [e.target.name]: e.target.value 
        }))
    }

    return (
        <form 
            className={`${styles.container} ${isVisible ? styles["fade-in"] : styles["fade-out"]}`} 
            onSubmit={handleSubmit} 
            onChange={handleChange}
        >
            <div className={styles.header}>
                <h2>Agregar Nuevo Perfil</h2>
                <IoIosClose size={30} className={styles["close-icon"]} onClick={handleCloseModal}/>
            </div>
            <label htmlFor="name">Nombre</label>
            <input name ="name" type="text" placeholder="Ingrese el nombre" />
            <label htmlFor="img">{"URL de la imagen (opcional)"}</label>
            <input name ="img" type="text" placeholder="https://ejemplo.com/imagen.jpg" />
            <button type="submit">Agregar Perfil</button>
        </form>
    )
}
