import { computed } from "vue"
import type { Cart } from "../types"
import type { Product } from "@/modules/product"
import { useLocalStorage } from "@vueuse/core"


export function useCart() {
  const items = useLocalStorage<Cart['items']>('cart', [])

  const state = computed<Cart>(() => ({
    items: items.value,
    totalCount: items.value.reduce((result, { count }) => result + count, 0),
    totalPrice: items.value.reduce((result, { totalPrice }) => result + totalPrice, 0),
  }))

  const addToCart = (product: Product) => {
    const existingProduct = items.value.find(({ item }) => product.id === item.id)

    if (existingProduct) {
      existingProduct.count++
      existingProduct.totalPrice += product.price
    } else {
      items.value.push({
        item: product,
        count: 1,
        totalPrice: product.price,
      })
    }
  }

  const removeFromCart = (product: Product) => {
    const currentProduct = items.value.find(({ item }) => product.id === item.id)
    if (!currentProduct) return

    if (currentProduct.count === 1) {
      items.value = items.value.filter(({ item }) => item.id !== product.id)
    } else {
      currentProduct.count -= 1
      currentProduct.totalPrice -= product.price
    }
  }

  const clear = () => {
    items.value = []
  }

  const getState = (product: Product) => computed(() => {
    const productState = state.value.items.find(({ item }) => item.id === product.id)

    return {
      inCart: Boolean(productState),
      ...productState,
    }
  })

  return {
    state,
    getState,

    addToCart,
    removeFromCart,
    clear,
  }
}
