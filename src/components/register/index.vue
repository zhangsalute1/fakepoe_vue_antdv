<template>
  <div class="container">
    <a-form
      :model="formState"
      name="register_form"
      class="register-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="Username" name="username" :rules="usernameRules">
        <a-input v-model:value="formState.username" autocomplete="username">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="passwordRules">
        <a-input-password v-model:value="formState.password" autocomplete="current-password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item label="Confirm Password" name="confirmPassword" :rules="confirmPasswordRules">
        <a-input-password v-model:value="formState.confirmPassword" autocomplete="current-password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-button :disabled="disabled" type="primary" html-type="submit" class="register-form-button">Register</a-button>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { registerApi } from '@/api/register.js';
const labelCol = {
  style: {
    width: '130px'
  }
};
const wrapperCol = {
  span: 20
};
const validatePasswordConfirmation = (_, value) => {
  if (value !== formState.password) {
    return Promise.reject(new Error('The two passwords do not match!'));
  }
  return Promise.resolve();
};

const formState = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const usernameRules = [
  { required: true, message: 'Please input your username!', trigger: 'blur' },
  { min: 3, message: 'Username must be at least 3 characters long', trigger: 'blur' }
];

const passwordRules = [
  { required: true, message: 'Please input your password!', trigger: 'blur' },
  { min: 6, message: 'Password must be at least 6 characters long', trigger: 'blur' }
];

const confirmPasswordRules = [
  { required: true, message: 'Please confirm your password!', trigger: 'blur' },
  { validator: validatePasswordConfirmation, trigger: 'blur' }
];

const onFinish = (values) => {
  registerApi(values)
    .then((res) => {
      console.log(res, 'res');
    })
    .catch((error) => {
      console.log('注册过程中出现错误', error);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const disabled = computed(() => {
  return !(formState.username && formState.password && formState.confirmPassword && formState.password === formState.confirmPassword);
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .register-form {
    max-width: 400px;
  }
  .register-form-button {
    width: 100%;
  }
}
</style>
