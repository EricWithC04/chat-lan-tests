import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import styles from './ChatPage.module.css'
import exampleImage from '../../assets/profile-example.jpg'
import { MessageElement } from '../../components/messageElement/MessageElement'
import { ChatElement } from '../../components/chatElement/ChatElement'

interface Message {
    msg: string,
    user: number
}

interface UserProfile {
    name: string
    msg: string
    selected: boolean
} 

export const ChatPage = () => {

    const [chatsProfiles, setChatsProfiles] = useState<Array<UserProfile>>([
        { name: 'Alejandro', msg: 'Hola', selected: false },
        { name: 'Miguel', msg: 'Hola', selected: true },
        { name: 'Sara', msg: 'Hola', selected: false },
        { name: 'Juán', msg: 'Hola', selected: false },
    ])

    const [messages, setMessages] = useState<Array<Message>>([
        { msg: 'hola', user: 1 }, 
        { msg: 'hola', user: 2 },
    ])
    const [newMessage, setNewMessage] = useState('')

    const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newMessage.length > 0) {
            setMessages(prev => [...prev, { msg: newMessage, user: 1 }])
            setNewMessage('')
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }

    const handleSelectChat = (name: string) => {
        const newChatsProfile: Array<UserProfile> = []
        chatsProfiles.forEach(chat => {
            if (chat.name === name) {
                newChatsProfile.push({ ...chat, selected: true })
            } else {
                newChatsProfile.push({ ...chat, selected: false })
            }
        })
        setChatsProfiles(newChatsProfile)
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}></div>
            <div className={styles["chat-list"]}>
                {
                    chatsProfiles.map(chat => (
                        <ChatElement 
                            name={chat.name} 
                            msg={chat.msg} 
                            selected={chat.selected} 
                            handleSelectChat={handleSelectChat}
                        />
                    ))
                }
            </div>
            <div className={styles["chat-container"]}>
                <div className={styles["messages-header"]}>
                    <img src={exampleImage} alt="" />
                    <h6>{chatsProfiles.find(chat => chat.selected)?.name}</h6>
                </div>
                <div className={styles["messages-container"]}>
                    {
                        messages.map((message) => (
                            <MessageElement msg={message.msg} user={message.user} />
                        ))
                    }
                </div>
                <div className={styles["messages-input"]}>
                    <form onSubmit={handleSubmitMessage}>
                        <input 
                            type="text" 
                            placeholder='Escribe un mensaje ...' 
                            onChange={handleInputChange} 
                            value={newMessage}
                        />
                        <button type="submit"><FaPaperPlane color='#0979b0'/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
