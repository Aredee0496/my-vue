<template>
  <a-card :title="'ตะกร้าสินค้า'" style="width: 100%">
    <div v-if="cartItems.length === 0" style="text-align: center;">
      <a-typography.Text>ไม่มีสินค้าที่เพิ่มในตะกร้า</a-typography.Text>
    </div>

    <a-row v-for="item in cartItems" :key="item.id" style="margin-bottom: 16px;" align="middle">
      <a-col :span="6" style="display: flex; justify-content: flex-start;">
        <img :src="`http://localhost:3000/images/${item.image}`" alt="Product Image" class="cart-image"
          style="width: 100px; height: auto; object-fit: cover;">
      </a-col>
      <a-col :span="12" style="text-align: center;">
        <a-card-meta :title="item.name" :description="`${item.totalPrice} บาท`" />
        <p>จำนวน: {{ item.quantity }} ชิ้น</p>
      </a-col>
      <a-col :span="6" style="text-align: right;">
        <a-button @click="increase(item._id)" type="primary">+</a-button>
        <a-button @click="decrease(item._id)" type="default">-</a-button>
        <a-button @click="removeItem(item._id)" danger>ลบสินค้า</a-button>
      </a-col>
    </a-row>
    <div v-if="cartItems.length > 0" style="margin-top: 20px; text-align: right;">
      <a-typography.Text strong>รวมทั้งหมด: {{ totalPrice }} บาท</a-typography.Text>
      <a-button type="primary" @click="placeOrder" style="margin-left: 10px;">สั่งซื้อ</a-button>
      <ModalComponent v-model:open="isModalOpen" title="รายละเอียดรายการ" okText="ตกลง" cancelText="ยกเลิก">
        <div v-if="orderList?.orderItems?.length > 0">
          <ul>
            <li v-for="(item, index) in orderList.orderItems" :key="index">
              {{ item.productId?.name || 'ไม่ทราบชื่อ' }} -
              จำนวน: {{ item.quantity ?? '-' }} -
              ราคา: {{ item.totalprice ?? '-' }} บาท
            </li>
          </ul>
          <div>
            รวมทั้งหมด: {{ orderList.totalPrice }} บาท
          </div>
        </div>
        <div v-else>
          <p>ยังไม่มีข้อมูลรายการ</p>
        </div>
      </ModalComponent>
    </div>
  </a-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useCartStore } from '@/stores/cart';
import apiservice from '@/service/apiservice';
import ModalComponent from '../components/icons/ModalComponent.vue';

const cartStore = useCartStore()

const totalPrice = computed(() => cartStore.totalPrice);
const cartItems = computed(() => cartStore.items)

const isModalOpen = ref(false);
const orderList = ref([])

const increase = (productId) => {
  cartStore.IncreaseQuantity(productId);
};

const decrease = (productId) => {
  cartStore.DecreaseQuantity(productId);
};

const removeItem = (productId) => {
  cartStore.RemoveFromCart(productId);
};

const placeOrder = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id

    const orderItems = cartItems.value.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      totalprice: item.totalPrice
    }));

    const body = {
      userId,
      orderItems,
      totalPrice: totalPrice.value
    };

    const response = await apiservice.createOrder(body);
    orderList.value = response.data
    console.log('orders ที่สั่ง จาก api ', orderList)
    isModalOpen.value = true;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ:", error.message);
    return null;
  }
};

const closeModal = () => {
  console.log('ลบออเดอร์จ้า')
  isModalOpen.value = false;
  cartStore.clearCart();
};

watch(isModalOpen, (newVal, oldVal) => {
  if (oldVal === true && newVal === false) {
    closeModal()
  }
})

</script>

<style scoped>
.cart-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
