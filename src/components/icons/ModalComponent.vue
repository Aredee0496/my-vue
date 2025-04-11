<template>
  <a-modal
    v-model:open="isModalOpen"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
    :ok-text="okText"
    :cancel-text="cancelText"
  >
    <slot />
  </a-modal>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  open: Boolean,
  title: String,
  okText: { type: String, default: 'ตกลง' },
  cancelText: { type: String, default: 'ยกเลิก' }
});

const emit = defineEmits(['update:open', 'ok', 'cancel']);
const isModalOpen = ref(props.open);

watch(() => props.open, val => isModalOpen.value = val);

const handleOk = () => {
  emit('ok');
  isModalOpen.value = false;
  emit('update:open', false);
};

const handleCancel = () => {
  emit('cancel');
  isModalOpen.value = false;
  emit('update:open', false);
};
</script>
