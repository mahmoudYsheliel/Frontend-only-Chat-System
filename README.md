
#  Vue Chat Application

<img width="1918" height="926" alt="image" src="https://github.com/user-attachments/assets/006dcf12-04ea-4ba4-9803-208c1310e44b" />

A simple, responsive **chat UI** built with **Vue 3 + TypeScript**.  
It supports:
- Responsive design (chat list + chat body toggle on mobile)  
- User list with user cards  
- Chat body with messages  
- Link detection + preview (WhatsApp-style)  
- Smooth animations when switching views  

---

##  Features
-  **Responsive Layout**  
  - Desktop → chat list & chat body side-by-side  
  - Mobile → toggle between chat list & chat body with back button + animations  
-  **User List**  
  - `UserList.vue` displays all users  
  - `UserCard.vue` shows each user with avatar, name, last message, and timestamp  
-  **Chat Body**  
  - Shows messages for selected user  
  - Detects links in messages  
  - Displays a **link preview** (domain, favicon, clickable URL)  
-  **Animations**  
  - Smooth transitions when switching between chat list and chat body  
-  **Pure Frontend**  
  - No backend required  
  - All link previews are generated **natively in JavaScript**  

---


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
