import { useState, useEffect } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import styles from './ChatPage.module.css'
import exampleImage from '../../assets/profile-example.jpg'
import { MessageElement } from '../../components/messageElement/MessageElement'

interface Message {
    msg: string,
    user: number
}

export const ChatPage = () => {

    const [messages, setMessages] = useState<Array<Message>>([])

    useEffect(() => {
        setMessages(prev => [...prev, { msg: 'hola', user: 1 }])
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.navbar}></div>
            <div className={styles["chat-list"]}></div>
            <div className={styles["chat-container"]}>
                <div className={styles["messages-header"]}>
                    <img src={exampleImage} alt="" />
                    <h6>Juan Perez</h6>
                </div>
                <div className={styles["messages-container"]}>
                    {
                        messages.map((message) => (
                            <MessageElement msg={message.msg} user={message.user} />
                        ))
                    }
                </div>
                <div className={styles["messages-input"]}>
                    <form>
                        <input type="text" placeholder='Escribe un mensaje ...'/>
                        <button type="submit"><FaPaperPlane color='#0979b0'/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
