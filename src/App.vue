<script setup lang="ts">
import UserList from "./components/user-list/UserList.vue"
import ChatBody from "./components/chat-body/ChatBody.vue"
import type { User } from "./utils/models"
import { ref, onMounted } from "vue"
import { getUserData } from "./utils/sessionStorageManager"
import { eventBus } from "./utils/eventBus"

const userInfo = ref<User | null>(null)
const activeChat = ref(false)
const isMobile = ref(window.innerWidth <= 768)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    activeChat.value = true
  }
}
window.addEventListener("resize", handleResize)

onMounted(() => {
  eventBus.on('user_data', (data) => {
    const { user } = data
    userInfo.value = user as User
  })
  eventBus.on('select_chat', (data) => {
    activeChat.value = true
  })
  getUserData()
  handleResize()
})
</script>

<template>
  <div>
    <div id="chat-header">
      <span>{{ userInfo?.name }}</span>
      <transition name="fade">
        <span v-if="isMobile && activeChat" class="back-icon" @click="activeChat = false">
          ←
        </span>
      </transition>
    </div>

    <div class="chat-app">
      <transition name="chat-list-trans">
        <UserList v-show="!isMobile || !activeChat" />
      </transition>
      <transition name="chat-body-trans">

        <ChatBody v-show="!isMobile || activeChat" />
      </transition>
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#chat-header {
  font-size: 2rem;
  height: 3rem;
  padding: 1rem 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #d9fdd3 0%, #ffffff 100%);
  color: #2c2c2c;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
}

.back-icon {
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.back-icon:hover {
  transform: translateX(-5px);
}

.chat-app {
  display: grid;
  grid-template-columns: 30% 70%;
  height: calc(100vh - 5rem);
  width: 100%;
  background-color: #EDEDED;
}

@media (max-width: 768px) {
  .chat-app {
    display: block;
    position: relative;
    overflow: hidden; 
  }
}


.chat-list-trans-enter-active,
.chat-list-trans-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}
.chat-list-trans-enter-from,
.chat-list-trans-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.chat-body-trans-enter-active,
.chat-body-trans-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
  position: absolute; 
  width: 100%;
  height: 100%;
}
.chat-body-trans-enter-from,
.chat-body-trans-leave-to {
  transform: translateX(100%);
  opacity: 0;
}


</style>
