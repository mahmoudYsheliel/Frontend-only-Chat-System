<script lang="ts" setup>

defineProps(['userCard'])

</script>


<template>

    <div class="user-card-container">
        <img :src="userCard.image" class="user-card-img" alt="">
        <div class="user-card-name-last-massage-container">
            <h3 class="user-card-name">{{ userCard.name }}</h3>
        </div>
    </div>

</template>


<style scoped>
.user-card-name {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.user-card-name-last-massage-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
}

.user-card-img {
    display: block;
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.user-card-container {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    display: grid;
    grid-template-columns: 4rem calc(100% - 5rem);
    grid-template-rows: 100%;
    gap: 1rem;
    height: 4rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    background-color: white;
    cursor: pointer;
}

.user-card-container:hover {
    background-color: #ccc;
}
</style>