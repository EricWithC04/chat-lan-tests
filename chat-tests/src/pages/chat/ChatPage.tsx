import { useState, useEffect } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { io } from 'socket.io-client'
import styles from './ChatPage.module.css'
import exampleImage from '../../assets/profile-example.jpg'
import { MessageElement } from '../../components/messageElement/MessageElement'
import { ChatElement } from '../../components/chatElement/ChatElement'
import { useMessages } from './hook/useMessages'
import { NavBar } from '../../components/navbar/NavBar'

interface Message {
    msg: string
    user: string
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

    const [socket, setSocket] = useState<any>()
    
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

    const [selectedChat, setSelectedChat] = useState<ChatProfile | null>(null)

    const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newMessage.length > 0) {

            // fetch(`http://localhost:3500/message/${localStorage.getItem("userId")}/${selectedChat!.id}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ text: newMessage })
            // })

            // const messageToInclude = { msg: newMessage, user: localStorage.getItem("userId")! }

            // setMessages(prev => [...prev, messageToInclude])
            socket.emit("chat-message", { senderId: localStorage.getItem("userId")!, receiverId: selectedChat!.profileInfo.id, message: newMessage })
            setNewMessage('')
            // socket.emit("message", messageToInclude)

            const newChatsProfile: Array<ChatProfile> = [...chatsProfiles]
            newChatsProfile.find(chat => chat.id === selectedChat!.id)!.messages.push({ id: '', text: newMessage, profileId: localStorage.getItem("userId")! })
            setChatsProfiles(newChatsProfile)
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
                setSelectedChat(chat)
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
        (async () => {
            const info = await useMessages()
            setChatsProfiles(info)
        })()
    }, [])

    useEffect(() => {
        const socketConnection = io('http://localhost:3500')
        setSocket(socketConnection)

        socketConnection.on("message", (message: Message) => {
            setMessages(prev => [...prev, message])

            const newChatsProfile: Array<ChatProfile> = [...chatsProfiles]
            newChatsProfile.find(chat => chat.id === selectedChat!.id)!.messages.push({ id: '', text: message.msg, profileId: message.user })
            console.log(newChatsProfile);
            setChatsProfiles(newChatsProfile)
        })

        socketConnection.on("profile-disconnected", (profileId: string) => {
            alert(`El usuario no se encuentra conectado, intentalo más tarde \n ${profileId}`)
        })

        return () => {
            socketConnection.off("message");
            socketConnection.off("disconnect");
            socketConnection.disconnect()
        };
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
            {
                selectedChat !== null ? (
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
                ) : (
                    <div className={styles['chat-container']}>
                        <p>Seleccione un chat</p>
                    </div>
                )
            }
        </div>
    )
}
