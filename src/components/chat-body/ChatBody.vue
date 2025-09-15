<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { eventBus } from '@/utils/eventBus';
import { getUserData } from '@/utils/sessionStorageManager';
import { saveUserMessages, getUserMessages } from '@/utils/localStorageManager';
import type { Message, MessageGroup, User } from '@/utils/models';
import { broadcast } from '@/utils/broadcast';
import PerviewMessage from './PerviewMessage.vue';
import { getDateTimeFormated,extractFirstLink,groupMessagesByDate } from '@/utils/helpingFunctions';

const secondUser = ref<User | null>(null)
const userInfo = ref<User | null>(null)
const message = ref('')
const groupedMessages = ref<MessageGroup[]>([])

function addMessage(date: string, message: Message) {
    if (!groupedMessages)
        return
    const group = groupedMessages.value.find(g => g.date === date);

    if (group) {
        group.messages.push(message);
    } else {
        groupedMessages.value.push({
            date,
            messages: [message],
        });
    }
}

function sendMessage() {
    if (!userInfo.value || !secondUser.value)
        return
    const { currentDate, currentTime } = getDateTimeFormated()
    const _message: Message = {
        senderId: userInfo.value?.id,
        receiverId: secondUser.value.id,
        content: message.value,
        time: currentTime,
        date: currentDate,
        hyperLink:extractFirstLink( message.value)
    }
    broadcast('new_message', { message: _message })
    saveUserMessages([_message])
    addMessage(currentDate, _message)
    message.value = ''
}
onMounted(() => {
    eventBus.on('user_data', (data) => {
        const { user } = data
        userInfo.value = user as User
    })
    eventBus.on('select_chat', (data) => {
        const { user } = data
        secondUser.value = user as User
        if (!userInfo.value || !secondUser.value)
            return
        const messages = getUserMessages(userInfo.value?.id, secondUser.value?.id)
        groupedMessages.value = groupMessagesByDate(messages)

    })
    eventBus.on('new_message', (data) => {
        const _message = data?.message as Message
        if (_message.receiverId === userInfo.value?.id && _message.senderId === secondUser.value?.id) {
            saveUserMessages([_message])
            addMessage(_message.date, _message)
        }
    })
    getUserData()
})
</script>

<template>
    <div id="chat-body-container" v-if="secondUser">
        <div id="second-user-name">{{ secondUser?.name }}</div>
        <div id="chat-body-messages">
            <div class="chat-body-date-group-container" v-for="dateGroup in groupedMessages">
                <p class="date-viewer"> {{ dateGroup.date }}</p>
                <div class="message-wrapper" v-for="message in dateGroup.messages" :class="{ main_user_message: (userInfo?.id === message.senderId), secondary_user_message: (userInfo?.id !== message.senderId) }">
                    <div class="message">
                        <PerviewMessage v-if="message.hyperLink" :link="message.hyperLink" />
                        <p class="message-body">{{ message.content }}</p>
                        <p class="message-time">{{ message.time }}</p>
                    </div>
                </div>

            </div>
        </div>

        <div id="send-message-container">
            <input id="message-input" placeholder="Type a message" type="text" v-model="message">
            <button id="send-button" @click="sendMessage"> Send </button>
        </div>
    </div>
</template>

<style scoped>
#send-message-container {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-top: 1px solid #ddd;
    background-color: #f0f0f0;
    width: calc(100% - 2rem);
    bottom: 1rem;
    z-index: 5;
}

#message-input {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

#send-button {
    margin-left: 0.5rem;
    padding: 0.6rem 0.9rem;
    border: none;
    border-radius: 2rem;
    background-color: #25d366;
    color: white;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease-in-out;
}

#send-button:hover {
    background-color: #1da851;
}



.message-time,
.message-body {
    margin: 0;
    padding: 0;
}

.message-time {
    opacity: 0.5;
    align-self: flex-end;
    font-size: 0.75rem;
    margin-left: 2rem;

}

.main_user_message .message {
    background-color: #dcf8c6;
    border-bottom-right-radius: 0.2rem;
}

.secondary_user_message .message {
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-left-radius: 0.2rem;
}

.main_user_message {
    justify-content: flex-end;
}

.secondary_user_message {
    justify-content: flex-start;
}

.message-wrapper {
    display: flex;
    gap: 2rem;
}

.message {
    max-width: 60%;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    position: relative;
    font-size: 14px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.date-viewer {
    position: sticky;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    background-color: #F5F5F5;
    padding: 0.5rem 1.5rem;
    border-radius: 1rem;
    width: fit-content;
    z-index: 2;
}

.chat-body-date-group-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

#chat-body-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 2rem;
}

#second-user-name {
    background-color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
}

#chat-body-container {
    height: calc(100vh - 6rem);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>