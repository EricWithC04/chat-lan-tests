// import React from 'react'
// import allChats from '../../../data/chat.json'
import allMessages from '../../../data/messages.json'

interface Message {
    msg: string,
    user: number
}

export const useMessages = (idChat: number) => {
    const chatMessages: Array<Message> = [] 
    allMessages.forEach(msg => {
        if (msg.idChat === idChat) {
            chatMessages.push({
                msg: msg.text,
                user: msg.idUser
            })
        }
    })
    return chatMessages
}