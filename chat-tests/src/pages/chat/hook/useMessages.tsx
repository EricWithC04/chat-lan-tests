// import React from 'react'
import allChats from '../../../data/chat.json'
import allUserChats from '../../../data/user_chat.json'
import allMessages from '../../../data/messages.json'

interface Message {
    msg: string,
    user: string | number
}

interface UserChat {
    idUser: any,
    idChat: number
}

interface Chat {
    id: number,
    users: Array<UserChat>
}

const mappedChats = (): Array<Chat> => {
    const chats: Array<Chat> = []

    allChats.forEach(chat => {
        chats.push({
            id: chat.id,
            users: allUserChats.filter(userChat => userChat.idChat === chat.id)
        })
    })

    return chats
}

export const filterChats = (): Array<Chat> => {
    const chats = mappedChats().filter(chat => chat.users.some(user => user.idUser === localStorage.getItem("userId")))
    return chats
}

export const useMessages = (idChat: string | number) => {
    const chatMessages: Array<Message> = []
    
    const filteredChats: Array<Chat> = filterChats() 
    console.log(filteredChats);
    
    allMessages.filter(message => filteredChats.some(chat => chat.id === message.idChat)).forEach(msg => {
        if (msg.idChat === idChat) {
            chatMessages.push({
                msg: msg.text,
                user: msg.idUser
            })
        }
    })
    if (chatMessages.some(message => message.user === localStorage.getItem("userId"))) return chatMessages
    else return []
}