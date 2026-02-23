import { BaseApi } from "@/shared/api";
import type { Product, ProductFilters } from "../types/Product";

export class ProductService extends BaseApi {
  static async getList(filters?: Partial<ProductFilters>): Promise<Product[]> {
    const result = await this.request<Product[]>('products')
    if (!filters) return result

    return result.filter((product) => {
      let condition = true
      if (filters.name) condition = condition && product.name.toLowerCase().includes(filters.name.toLowerCase())
      if (filters.brands?.length) condition = condition && Boolean(filters.brands.find(({ id }) => product.brand === id))
      if (filters.gender?.length) condition = condition && Boolean(filters.gender.find(({ id }) => product.gender === id))
      if (filters.movement?.length) condition = condition && Boolean(filters.movement.find(({ id }) => product.movement === id))
      if (filters.strap?.length) condition = condition && Boolean(filters.strap.find(({ id }) => product.strap === id))
      // if (typeof filters.isNew !== undefined) condition = condition && filters.isNew === product.isNew
      // if (typeof filters.inStock !== undefined) condition = condition && filters.inStock === product.inStock
      // if (typeof filters.bestseller !== undefined) condition = condition && filters.bestseller === product.bestseller
      return condition
    })
  }

  static async getOne(id: string): Promise<Product> {
    const list = await this.request<Product[]>('products')
    const result = list.find((product) => product.id.toLowerCase() === id.toLowerCase())
    if (!result) {
      throw new Error('По вашему запросу ничего не найдено')
    }

    return result
  }

  static async getFilters(): Promise<ProductFilters> {
    const result = await this.getList()
    let brands: Set<string> = new Set()

    result.forEach((i) => {
      brands.add(i.brand)
    })

    return {
      brands: Array.from(brands).map((i) => ({ id: i, name: i })),
      movement: [
        {
          id: 'mechanical',
          name: 'Механические'
        },
        {
          id: 'quartz',
          name: 'quartz'
        },
      ],
      gender: [
        {
          id: 'men',
          name: 'Мужские',
        },
        {
          id: 'women',
          name: 'Женские',
        },
        {
          id: 'unisex',
          name: 'Унисекс',
        },
      ],
      strap: [
        {
          id: 'leather',
          name: 'Кожа',
        },
        {
          id: 'nylon',
          name: 'Сталь',
        },
        {
          id: 'rubber',
          name: 'Резина/Силикон',
        },
        {
          id: 'steel',
          name: 'Нейлон (тканевый ремешок)',
        },
      ],
    }
  }
}
