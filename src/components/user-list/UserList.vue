<script lang="ts" setup>
import UserCard from './UserCard.vue';
import { ref, onMounted } from 'vue';
import { eventBus } from '@/utils/eventBus';
import type { User } from '@/utils/models';
import { getUserData } from '@/utils/sessionStorageManager';
import { getUsers } from '@/utils/localStorageManager';




const searchUser = ref('')
const userInfo = ref<User | null>(null)
const users = ref<User[]>([])


function containsSubtext(text: string, sub: string) {
    return text.toLowerCase().includes(sub.toLowerCase());
}
function selectUser(user:User){
    eventBus.emit('select_chat',{user})
}

onMounted(() => {
    eventBus.on('new_user', (data) => {
        const { user } = data
        users.value.push(user)
    })
    eventBus.on('user_data', (data) => {
        const { user } = data
        userInfo.value = user as User
    })
    getUserData()
    const allUsers = getUsers()
    users.value = allUsers.filter(user => user.id !== userInfo.value?.id)
})
</script>


<template>
    <div id="user-list-container">
        <input placeholder="Search for Chat" id="user-list-search" type="text" v-model="searchUser" />
        <TransitionGroup id="user-list-user-cards-wrapper" name="list" tag="div">
            <div class="user-card" v-for="userCard in users" :key="userCard.id" @click="selectUser(userCard)">
                <UserCard v-if="containsSubtext(userCard.name, searchUser)" :userCard="userCard" />
            </div>
        </TransitionGroup>
    </div>
</template>


<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}

#user-list-search {
    align-self: center;
    background: #fff;
    width: calc(100% - 6rem);
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 2rem;
    outline: none;
}

#user-list-user-cards-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    height: 100%;
    overflow-y: auto;
    padding: 0.25rem;
}

#user-list-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: calc(100vh - 8rem);
    padding-block: 1rem;
}
</style>