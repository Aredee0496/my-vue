<template>
  <div>
    <a-button type="primary" @click="openAddProductModal" style="margin-bottom: 16px;">
      เพิ่มสินค้า
    </a-button>

    <a-table :columns="columns" :data-source="products" row-key="_id" bordered :scroll="{ x: true }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button @click="openEditProductModal(record)">แก้ไข</a-button>
            <a-button type="primary" danger ghost @click="deleteProduct(record._id)">ลบ</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- Modal เพิ่มสินค้า -->
    <ModalComponent v-model:open="isAddModalOpen" title="เพิ่มสินค้า" @ok="addProduct">
      <a-form layout="vertical">
        <!-- ชื่อสินค้า -->
        <a-form-item label="ชื่อสินค้า">
          <a-input v-model:value="newProduct.name" placeholder="ชื่อสินค้า" />
        </a-form-item>

        <!-- ราคา -->
        <a-form-item label="ราคา (บาท)">
          <a-input-number v-model:value="newProduct.price" :min="0" style="width: 100%;" placeholder="ราคา" />
        </a-form-item>

        <!-- จำนวน -->
        <a-form-item label="จำนวน (ชิ้น)">
          <a-input-number v-model:value="newProduct.quantity" :min="1" style="width: 100%;" placeholder="จำนวน" />
        </a-form-item>

        <!-- แสดงรูปภาพ -->
        <a-form-item label="รูปสินค้า">
          <div style="margin-bottom: 8px;">
            <img v-if="ImagePreview" :src="ImagePreview" alt="New Product Preview" width="120"
              style="border-radius: 8px; border: 1px solid #f0f0f0;" />
          </div>
          <input type="file" @change="handleNewProductFileChange" />
        </a-form-item>
      </a-form>
    </ModalComponent>

    <!-- Modal แก้ไขสินค้า -->
    <ModalComponent v-model:open="isEditModalOpen" title="แก้ไขสินค้า" @ok="editProduct">
      <a-form layout="vertical">
        <!-- ชื่อสินค้า -->
        <a-form-item label="ชื่อสินค้า">
          <a-input v-model:value="currentProduct.name" style="width: 50%;" placeholder="ชื่อสินค้า" />
        </a-form-item>

        <!-- ราคา -->
        <a-form-item label="ราคา (บาท)">
          <a-input-number v-model:value="currentProduct.price" :min="0" style="width: 30%;" placeholder="ราคา" />
        </a-form-item>

        <!-- จำนวน -->
        <a-form-item label="จำนวน (ชิ้น)">
          <a-input-number v-model:value="currentProduct.quantity" :min="1" style="width: 15%;" placeholder="จำนวน" />
        </a-form-item>

        <!-- แสดงรูปภาพ -->
        <a-form-item label="รูปสินค้า">
          <div style="margin-bottom: 8px;">
            <img v-if="ImagePreview" :src="ImagePreview" alt="New Product Image Preview" width="120"
              style="border-radius: 8px; border: 1px solid #f0f0f0;" />
            <img v-else-if="currentProduct.image" :src="`http://localhost:3000/images/${currentProduct.image}`"
              alt="Product Image" width="120" style="border-radius: 8px; border: 1px solid #f0f0f0;" />
          </div>
          <input type="file" @change="handleEditProductFileChange" />
        </a-form-item>
      </a-form>
    </ModalComponent>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ModalComponent from '@/components/icons/ModalComponent.vue';
import apiservice from '@/service/apiservice';
import { notification } from 'ant-design-vue';

const products = ref([]);

const newProduct = ref({
  name: '',
  price: 0,
  image: null,
  quantity: 1,
});

const currentProduct = ref({
  _id: '',
  name: '',
  price: 0,
  image: null,
  quantity: 1,
});

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const ImagePreview = ref(null);

const columns = [
  { title: 'ชื่อสินค้า', dataIndex: 'name', key: 'name', width: '40%' },
  { title: 'ราคา (บาท)', dataIndex: 'price', key: 'price', width: '20%' },
  { title: 'จำนวน (ชิ้น)', dataIndex: 'quantity', key: 'quantity', width: '20%' },
  { title: 'การจัดการ', key: 'actions', width: '20%' },
];

const fetchProducts = async () => {
  const response = await apiservice.fetchProducts();
  products.value = response.data;
};
onMounted(fetchProducts);

const handleNewProductFileChange = (event) => {
  const file = event?.target?.files?.[0];
  if (file) {
    newProduct.value.image = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      ImagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    newProduct.value.image = null;
    ImagePreview.value = null;
  }
};

const handleEditProductFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    currentProduct.value.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      ImagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    currentProduct.value.image = null;
    ImagePreview.value = null;
  }
};

const openAddProductModal = () => {
  newProduct.value = { name: '', price: 0, image: null, quantity: 1 };
  ImagePreview.value = null;
  isAddModalOpen.value = true;
};

const addProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('name', newProduct.value.name);
    formData.append('price', newProduct.value.price);
    formData.append('quantity', newProduct.value.quantity);
    formData.append('image', newProduct.value.image);

    await apiservice.addProduct(formData);
    products.value.push({ ...newProduct.value });
    notification.success({ message: 'เพิ่มสินค้าสำเร็จ', placement: 'topRight' });
    isAddModalOpen.value = false;
  } catch (error) {
    notification.error({ message: 'เพิ่มสินค้าไม่สำเร็จ', description: error, placement: 'topRight' });
  }
};

const openEditProductModal = (item) => {
  currentProduct.value = { ...item };
  ImagePreview.value = null;
  isEditModalOpen.value = true;
};

const editProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('name', currentProduct.value.name);
    formData.append('price', currentProduct.value.price);
    formData.append('quantity', currentProduct.value.quantity);

    if (currentProduct.value.image instanceof File) {
      formData.append('image', currentProduct.value.image);
    }

    await apiservice.updateProduct(currentProduct.value._id, formData);

    const index = products.value.findIndex(p => p._id === currentProduct.value._id);
    if (index !== -1) {
      products.value[index] = { ...currentProduct.value };
    }

    notification.success({ message: 'แก้ไขสำเร็จ', placement: 'topRight' });
    isEditModalOpen.value = false;
  } catch (error) {
    notification.error({ message: 'แก้ไขสินค้าไม่สำเร็จ', description: error?.message, placement: 'topRight' });
  }
};

const deleteProduct = async (id) => {
  try {
    await apiservice.deleteProduct(id);
    products.value = products.value.filter(p => p._id !== id);
    notification.success({ message: 'ลบสินค้าสำเร็จ', placement: 'topRight' });
  } catch (error) {
    notification.error({ message: 'ลบสินค้าไม่สำเร็จ', description: error, placement: 'topRight' });
  }
};
</script>
