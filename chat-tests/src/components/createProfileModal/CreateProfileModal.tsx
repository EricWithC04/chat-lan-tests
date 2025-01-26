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

interface ProfileFieldErrors {
    name?: string
    img?: string
}

const urlRegex = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:\d+)?(\/[^\s]*)?$/;

export const CreateProfileModal = ({ handleCloseModal, isVisible }: CreateProfileModalProps) => {

    const [data, setData] = useState<CreateProfileData>({
        name: '',
        img: null
    })
    const [errors, setErrors] = useState<ProfileFieldErrors>({})

    const validateErrors = (): ProfileFieldErrors => {
        let error: ProfileFieldErrors = {}
        if (data.name === '') error.name = 'El nombre es requerido'
        else if (data.name.length <= 1) error.name = 'El nombre debe tener al menos 2 caracteres'
        else if ((data.img !== null && data.img !== '') && !urlRegex.test(data.img)) error.img = 'La URL debe ser válida o dejár el campo en vacío'
        setErrors(error)
        return error
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validatedErrors = validateErrors()

        if (Object.keys(validatedErrors).length === 0) {
            fetch('http://localhost:3500/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    img: data.img === '' ? null : data.img
                })
            })
                .then(res => res.json())
                .then(_res => {
                    handleCloseModal()
                    window.location.reload()
                })
                .catch(err => console.log(err))    
        }
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
            { errors.name ? <p className={styles.error}>{errors.name}</p> : null }
            <label htmlFor="img">{"URL de la imagen (opcional)"}</label>
            <input name ="img" type="text" placeholder="https://ejemplo.com/imagen.jpg" />
            { errors.img ? <p className={styles.error}>{errors.img}</p> : null }
            <button type="submit">Agregar Perfil</button>
        </form>
    )
}
