<template>
  <div class="container">
    <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" autocomplete="username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" autocomplete="current-password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button"> Log in </a-button>
        Or
        <router-link to="/register">register now!</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { loginApi } from '@/api/loginApi';
import { message } from 'ant-design-vue';
const formState = reactive({
  username: '',
  password: '',
  remember: true
});
const onFinish = (values) => {
  console.log(values, 'values');
  loginApi(values)
    .then((data) => {
      console.log(data);
      if (data.code === 200) {
        message.success(data.message);
      }
    })
    .catch((error) => {
      message.error(error.response.data.message);
      console.log('登录过程中出现错误', error.response.data);
    });
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
}
</style>
