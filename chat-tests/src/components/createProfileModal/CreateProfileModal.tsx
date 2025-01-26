import React from 'react'
import styles from './CreateProfileModal.module.css'
import { IoIosClose } from "react-icons/io";

interface CreateProfileModalProps {
    handleCloseModal: () => void
}

export const CreateProfileModal = ({ handleCloseModal }: CreateProfileModalProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleCloseModal()
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
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
