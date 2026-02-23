import type { Choice } from "@/shared/types"

// types/watch.types.ts
export interface Product {
  id: string
  name: string
  description: string

  brand: string
  price: number

  movement: 'mechanical' | 'quartz' // Механизм 
  gender: 'men' | 'women' | 'unisex';

  /**
   * Материал ремешка
   * leather — Кожа
   * steel — Сталь
   * rubber — Резина/Силикон
   * nylon — Нейлон (тканевый ремешок)
   */
  strap: 'leather' | 'steel' | 'rubber' | 'nylon'

  waterResistance?: number; // meters
  isNew?: boolean;
  bestseller?: boolean;
  inStock?: boolean;

  images: string[]
}

export interface ProductFilters {
  name?: string
  brands?: Choice[]
  movement?: Choice<Product['movement']>[]
  gender?: Choice<Product['gender']>[]
  strap?: Choice<Product['strap']>[]
  isNew?: boolean
  bestseller?: boolean;
  inStock?: boolean;
}