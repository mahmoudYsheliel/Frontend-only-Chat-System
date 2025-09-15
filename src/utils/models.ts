export type EventType = 'new_message' | 'new_user' | 'select_chat' | 'user_data'

export interface User {
    id:number
    name: string
    image: string
}
export interface Message {
    senderId: number
    receiverId:number
    content: string
    time: string
    date: string
    hyperLink?: string
}
export interface MessageGroup {
    date: string
    messages: Message[]
}
