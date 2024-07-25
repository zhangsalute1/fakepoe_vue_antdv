<template>
  <div class="container">
    <a-list size="large" :data-source="messages" :split="false">
      <template #header>
        <div>输入问题并点击“发送”按钮,即可与ChatGPT进行互动,快来体验吧!</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
      <template #empty> 123 </template>
    </a-list>
  </div>

  <div class="inputArea">
    <a-input v-model:value="inputValue" placeholder="在此输入您的问题" @keyup.enter="sendMessage" />
    <a-button @click="sendMessage">发送</a-button>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const messages = ref([]);
const inputValue = ref('');

const sendMessage = () => {
  if (inputValue.value.trim()) {
    messages.value.push(inputValue.value);
    inputValue.value = '';
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 96vh;
  overflow-y: auto;
}

.inputArea {
  display: flex;
}
:deep(.ant-list-empty-text) {
  display: none !important;
}
</style>
