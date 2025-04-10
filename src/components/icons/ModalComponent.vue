<template>
  <div>
    <a-modal
      v-model:open="isModalOpen"
      title="Modal"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="ตกลง"
      cancel-text="ยกเลิก"
    >
      <p>นี่คือเนื้อหา Modal</p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(false);

// const showModal = () => {
//   isModalOpen.value = true;
// };

const handleOk = () => {
  isModalOpen.value = false;
};

const handleCancel = () => {
  isModalOpen.value = false;
};
</script>
