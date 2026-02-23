import { CartPage, CartPageMeta } from '@/pages/cart'
import { MainPage, MainPageMeta } from '@/pages/main'
import { ProductDetailPage, ProductDetailPageMeta } from '@/pages/product-detail'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: MainPage,
      path: MainPageMeta.path,
      name: MainPageMeta.path,
    },
    {
      component: ProductDetailPage,
      name: ProductDetailPageMeta.name,
      path: ProductDetailPageMeta.path,
    },
    {
      component: CartPage,
      name: CartPageMeta.name,
      path: CartPageMeta.path,
    },
  ],
})

export default router
