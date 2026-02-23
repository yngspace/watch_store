import type { Product } from "@/modules/product"

export interface CartItem {
  item: Product
  count: number
  totalPrice: number
}

export interface Cart {
  items: Array<CartItem>
  totalPrice: number
  totalCount: number
}
