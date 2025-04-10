<template>
  <a-layout>
    <a-layout-sider width="200" style="background: dodgerblue; color: #fff; height: 100vh;">
      <div style="padding: 20px; text-align: center;">
        <h2 style="margin-bottom: 20px; color: #fff;">My App</h2>
      </div>
      <a-menu mode="inline" :style="{ borderRight: 0, background: 'transparent', color: '#fff' }">
        <a-menu-item key="1">
          <template #icon>
            <HomeOutlined style="color: #fff;" />
          </template>
          <router-link to="/home" style="color: inherit;">Home</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <ShoppingOutlined style="color: #fff;" />
          </template>
          <router-link to="/products" style="color: inherit;">Products</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <ShoppingCartOutlined style="color: #fff;" />
          </template>
          <router-link to="/cart" style="color: inherit;">Cart</router-link>
        </a-menu-item>
        <a-menu-item key="4" @click="logout">
          <template #icon>
            <LogoutOutlined />
          </template>
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content style="padding: 24px; background: #fff; ">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { HomeOutlined, ShoppingOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons-vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('user');
  router.push('/');
}
</script>


<style scoped>
/* เพิ่ม styles เพิ่มเติม */
.a-menu-item {
  color: #fff !important;
}

.a-menu-item-selected {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #ffcdd2 !important;
}

.a-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
