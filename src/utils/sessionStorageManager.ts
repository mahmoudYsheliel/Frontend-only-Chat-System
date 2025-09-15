import { getUsers,saveUsers } from "./localStorageManager";
import { eventBus } from "./eventBus";
import { broadcast } from "./broadcast";
import type { User,Message } from "./models";
import image1 from '@/assets/user-image1.png'
import image2 from '@/assets/user-image2.png'
import image3 from '@/assets/user-image3.png'
import image4 from '@/assets/user-image4.png'
import image5 from '@/assets/user-image5.png'

const IMAGES = [image1,image2,image3,image4,image5]

function generateUserId() {
    const users = getUsers()
    let new_user_id = 0
    if (users.length !== 0) {
        new_user_id = users.reduce((maxUser, current) => {
            return current.id > maxUser.id ? current : maxUser;
        }, users[0]).id +1;
    }
    return new_user_id
}
function generateNewUser(){
    const newUserId = generateUserId()
    const newUser:User = {
        id:newUserId,
        name: 'User ' + String(newUserId),
        image: IMAGES[Math.floor(Math.random() * IMAGES.length)]
    }
    return newUser
}
export function getUserData() {
    const data =  sessionStorage.getItem('user') 
    let user:User|null = data ? JSON.parse(data) : null
    if (!user){
        user = generateNewUser()
        broadcast('new_user',{user})
        saveUsers(user)
        sessionStorage.setItem('user',JSON.stringify(user)) 
    }
    eventBus.emit('user_data',{user})
}


