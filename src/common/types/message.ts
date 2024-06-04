

export interface Message {
    content: Content
    from: string
    to: string
    status: string
    timeSent: Date
    room: string
}

export interface Content {
    type: string
    text: string,
    imoji?: string,
    files?: string[],

}

export interface User extends SignUp {
    id: string
    chatrooms: ChatRoom[]
    loggedIn:boolean
}

export interface SignUp{
    name: string,
    email: string,
    password: string
}

export interface ChatRoom {
    name: string,
    members: User[],
    type: string,
    messages: Message[]
}