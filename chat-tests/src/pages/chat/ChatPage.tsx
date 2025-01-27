import { useState, useEffect } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import styles from './ChatPage.module.css'
import exampleImage from '../../assets/profile-example.jpg'
import { MessageElement } from '../../components/messageElement/MessageElement'
import { ChatElement } from '../../components/chatElement/ChatElement'
import { useMessages } from './hook/useMessages'
import { NavBar } from '../../components/navbar/NavBar'

interface Message {
    msg: string,
    user: number | string
}

interface UserProfile {
    id: number
    name: string
    msg: string
    selected: boolean
} 

export const ChatPage = () => {

    const [chatsProfiles, setChatsProfiles] = useState<Array<UserProfile>>([
        { id: 1, name: 'Alejandro', msg: 'Hola', selected: false },
        { id: 2, name: 'Miguel', msg: 'Hola', selected: true },
        { id: 3, name: 'Sara', msg: 'Hola', selected: false },
        { id: 4, name: 'Juán', msg: 'Hola', selected: false },
    ])

    const [messages, setMessages] = useState<Array<Message>>([
        // { msg: 'hola', user: 1 }, 
        // { msg: 'hola', user: 2 },
    ])
    const [newMessage, setNewMessage] = useState('')

    const [selectedChat, setSelectedChat] = useState<number>(2)

    const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newMessage.length > 0) {
            setMessages(prev => [...prev, { msg: newMessage, user: '4a6d0e08-1724-4aa5-985c-4edae66a3531' }])
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
                setSelectedChat(chat.id)
            } else {
                newChatsProfile.push({ ...chat, selected: false })
            }
        })
        setChatsProfiles(newChatsProfile)
    }

    useEffect(() => {
        const chatMessages = useMessages(selectedChat)
        setMessages(chatMessages)
    }, [selectedChat])

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <NavBar />
            </div>
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
