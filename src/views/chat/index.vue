<template>
  <div class="container" ref="container">
    <a-list size="large" :data-source="messages" :split="false">
      <!-- <template #header>
        <div>输入问题并点击“发送”按钮,即可与ChatGPT进行互动,快来体验吧!</div>
      </template> -->
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
    </a-list>
  </div>

  <div class="inputArea">
    <a-input v-model:value="inputValue" placeholder="在此输入您的问题" @keyup.enter="sendMessage" />
    <a-button @click="sendMessage">发送</a-button>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue';
import { chatApi } from '@/api/chatApi';
const messages = ref([]);
const inputValue = ref('');
const container = ref(null);

const sendMessage = () => {
  if (inputValue.value.trim()) {
    //chatapi请求参数
    const parameter = {
      messages: [{ role: 'system', content: inputValue.value }],
      model: 'gpt-4o',
      stream: true
    };
    chatApi(parameter).then((response) => {
      console.log(response.respones);
    });
    messages.value.push(inputValue.value);

    //清空输入框内容，滚动条到最底下
    inputValue.value = '';
    nextTick(() => {
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight;
      }
    });
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
