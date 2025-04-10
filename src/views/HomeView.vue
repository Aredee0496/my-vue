<template>
  <div class="home">
    <h1>Welcome</h1>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Role: {{ user.role }}</p>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>

const user = (JSON.parse(localStorage.getItem('user')) || null);

</script>

<style>
/* เพิ่ม styles หากต้องการ */
</style>
