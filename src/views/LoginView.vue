<template>
  <div class="login-container">
    <a-card class="login-card">
      <template #title>
        <div class="login-title">Login</div>
      </template>
      <a-form ref="loginForm" name="login" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off"
        @submit="onSubmit">
        <a-form-item label="Username" name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="username" />
        </a-form-item>

        <a-form-item label="Password" name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-checkbox v-model:checked="remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
          <a-button type="primary" html-type="submit" class="login-button">Login</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const remember = ref(false);

const onSubmit = async () => {
  const response = await userStore.login(username.value, password.value);
  if (response.status === 200) {
    console.log('Response data:', response.data);
    message.success('Login successful');
    router.push('/home');
  } else {
    console.error('Login failed:', response);
    message.error('Login failed');
  }
  return response;
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
}
</style>
