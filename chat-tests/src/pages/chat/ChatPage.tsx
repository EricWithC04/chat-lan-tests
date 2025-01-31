import { useState, useEffect } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import styles from './ChatPage.module.css'
import exampleImage from '../../assets/profile-example.jpg'
import { MessageElement } from '../../components/messageElement/MessageElement'
import { ChatElement } from '../../components/chatElement/ChatElement'
import { filterChats, useMessages, useNewMessages } from './hook/useMessages'
import { NavBar } from '../../components/navbar/NavBar'

interface Message {
    msg: string
    user: string
}

interface UserProfile {
    id: string
    name: string
    msg: string
    selected: boolean
} 

interface ChatProfile {
    id: string
    selected: boolean
    profileInfo: {
        id: string
        name: string
        img: string | null
    }
    messages: Array<{ id: string, text: string, profileId: string }>
}

export const ChatPage = () => {

    const [chatsProfiles, setChatsProfiles] = useState<Array<ChatProfile>>([
        // { id: '1', name: 'Alejandro', msg: 'Hola', selected: false },
        // { id: '2', name: 'Miguel', msg: 'Hola', selected: true },
        // { id: '3', name: 'Sara', msg: 'Hola', selected: false },
        // { id: '4', name: 'Juán', msg: 'Hola', selected: false },
    ])

    const [messages, setMessages] = useState<Array<Message>>([
        // { msg: 'hola', user: 1 }, 
        // { msg: 'hola', user: 2 },
    ])
    const [newMessage, setNewMessage] = useState('')

    const [selectedChat, setSelectedChat] = useState<string>('')

    const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newMessage.length > 0) {
            setMessages(prev => [...prev, { msg: newMessage, user: localStorage.getItem("userId")! }])
            setNewMessage('')
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }

    const handleSelectChat = (id: string) => {
        const newChatsProfile: Array<ChatProfile> = []
        chatsProfiles.forEach(chat => {
            if (chat.id === id) {
                newChatsProfile.push({ ...chat, selected: true })
                // setSelectedChat(chat.id)
            } else {
                newChatsProfile.push({ ...chat, selected: false })
            }
        })
        setChatsProfiles(newChatsProfile)
        const selectedChatMessages: Array<Message> = []
        chatsProfiles.find(chat => chat.id === id)?.messages
            .forEach(message => {
                selectedChatMessages.push({ 
                    msg: message.text, 
                    user: message.profileId 
                })
            })
        setMessages(selectedChatMessages)
    }

    useEffect(() => {
        // const chatMessages = useMessages(selectedChat)
        // setMessages(chatMessages)
        // const chats: Array<UserProfile> = []
        // filterChats().forEach(chat => {
        //     chats.push({
        //         id: chat.id,
        //         name: "Alejandro",
        //         msg: 'Hola',
        //         selected: false
        //     })
        // })
        // setChatsProfiles(chats)
    }, [])

    useEffect(() => {
        (async () => {
            const info = await useNewMessages()
            setChatsProfiles(info)
        })()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <NavBar />
            </div>
            <div className={styles["chat-list"]}>
                {
                    chatsProfiles.map(chat => (
                        <ChatElement 
                            id={chat.id}
                            name={chat.profileInfo.name} 
                            msg={chat.profileInfo.name} 
                            selected={chat.selected} 
                            handleSelectChat={handleSelectChat}
                        />
                    ))
                }
            </div>
            <div className={styles["chat-container"]}>
                <div className={styles["messages-header"]}>
                    <img src={exampleImage} alt="" />
                    <h6>{chatsProfiles.find(chat => chat.selected)?.profileInfo.name}</h6>
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
