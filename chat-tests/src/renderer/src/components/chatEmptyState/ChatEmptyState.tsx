import styles from './ChatEmptyState.module.css'
import MessageIcon from '../../assets/MessageIcon.png'

const ChatEmptyState = () => {
    return (
        <div className={styles.container}>
            <img src={MessageIcon} className={styles.image} alt="icon" />
            <h2 className={styles.text}>Selecciona un chat para empezar!</h2>
        </div>
    )
}

export default ChatEmptyState