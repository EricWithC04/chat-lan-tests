// import React from 'react'

interface UserProfile {
    id: string
    name: string
    img: string | null
}

interface UserMessage {
    id: string
    text: string
    profileId: string
}

interface ChatProfile {
    id: string
    selected: boolean
    profileInfo: UserProfile
    messages: Array<UserMessage>
}

export const useMessages = async () => {
    const chats: Array<ChatProfile> = []
    const chatsWithMessages = await fetch(`http://localhost:3500/chat/${localStorage.getItem("userId")}`)
        .then(res => res.json())
        // .then(res => {console.log(res); return res})
        .catch(err => console.log(err))
    chatsWithMessages.forEach((chat: any) => {
        const userProfile = chat.Profiles.find((profile: any) => profile.id !== localStorage.getItem("userId"))
        chats.push({
            id: chat.id,
            selected: false,
            profileInfo: {
                id: userProfile.id,
                name: userProfile.name,
                img: userProfile.img
            },
            messages: chat.Messages
        })})
    return chats
}