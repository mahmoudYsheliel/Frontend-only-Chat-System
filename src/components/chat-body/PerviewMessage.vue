<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  link: string
}>()

const url = computed(() => {
  try {
    return new URL(props.link)
  } catch {
    return null
  }
})

const domain = computed(() => url.value?.hostname.replace(/^www\./, "") ?? "")
const favicon = computed(() => (url.value ? `${url.value.origin}/favicon.ico` : ""))
</script>

<template>
  <div v-if="url" class="link-preview">
    <img v-if="favicon" :src="favicon" class="lp-favicon" alt="favicon" />
    
    <div class="lp-content">
      <div class="lp-domain">{{ domain }}</div>
      <a :href="url.href" target="_blank" rel="noopener noreferrer">
        {{ url.href }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.link-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 6px;
  background: #fafafa;
  max-width: 100%;
  word-break: break-word;
}

.lp-favicon {
  width: 20px;
  height: 20px;
}

.lp-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lp-domain {
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}
</style>
