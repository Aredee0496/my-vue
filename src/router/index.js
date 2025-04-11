import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import SidebarComponent from '../components/icons/SidebarComponent.vue'
import ProductsView from '../views/ProductsView.vue'
import CartView from '@/views/CartView.vue'
import OrdersView from '@/views/OrdersView.vue'
import ManageProductsView from '@/views/ManageProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/',
      component: SidebarComponent,
      children: [
        { path: '/home', component: HomeView },
        { path: '/products', component: ProductsView },
        { path: '/cart', component: CartView },
        { path: '/orders', component: OrdersView },
        { path: '/manage-products', component: ManageProductsView },
        { path: '/', component: LoginView },
      ],
    },
  ],
})

export default router
