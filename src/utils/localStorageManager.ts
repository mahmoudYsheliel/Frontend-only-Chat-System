import type { User,Message } from "./models";


export function saveUsers(user: User) {
    const users = getUsers()
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
}
export function getUsers(): User[] {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
}


export function saveUserMessages(messageList: Message[]) {
    const messages = getMessages()
    messages.push(...messageList)
    localStorage.setItem('messages', JSON.stringify(messages));
}
function getMessages(): Message[] {
    const data = localStorage.getItem('messages');
    return data ? JSON.parse(data) : [];
}
export function getUserMessages(user1Id:number,user2Id:number){
    const messages = getMessages()
    const users = [user1Id, user2Id];
    const _messages = messages.filter((message)=>  users.includes(message.receiverId) && users.includes(message.senderId))
    return _messages
}