<template>
  <a-card title="รายการคำสั่งซื้อ" bordered>
    <a-table :columns="columns" :data-source="orders" :loading="loading" row-key="_id" :pagination="{ pageSize: 5 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'userId'">
          {{ record.userId?.username || 'ไม่พบข้อมูลผู้ใช้' }}
        </template>

        <template v-if="column.key === 'orderItems'">
          <div v-for="(item, index) in record.orderItems" :key="item._id">
            {{ index + 1 }}. {{ item.productId?.name || 'ไม่พบข้อมูลสินค้า' }} x {{ item.quantity }} = ฿{{ item.totalprice }}
          </div>
        </template>

        <template v-else-if="column.key === 'createdAt'">
          {{ formatDate(record.createdAt) }}
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import apiservice from '../service/apiservice';
import dayjs from 'dayjs';

const orders = ref([]);
const loading = ref(true);

const columns = [
  {
    title: 'Order ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Username',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'รายการสินค้า',
    dataIndex: 'orderItems',
    key: 'orderItems',
  },
  {
    title: 'ราคารวม',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    customRender: ({ text }) => `฿${text}`,
  },
  {
    title: 'วันที่สั่ง',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

const fetchOrders = async () =>{
  try {
    const response = await apiservice.fetchOrders();
    orders.value = response.data;
  } catch (err) {
    message.error('โหลดข้อมูลไม่สำเร็จ');
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  fetchOrders();
});
</script>
