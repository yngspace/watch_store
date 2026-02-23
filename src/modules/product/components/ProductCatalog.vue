<script lang="tsx">
import { FilterBar, DataLoader } from '@/shared/ui'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { getProductCatalogFilters } from '../helpers'
import type { Product, ProductFilters } from '../types/Product'
import ProductCard from './ProductCard.vue'
import { ProductService } from '../services'
import { ProductDetailPageMeta } from '@/pages/product-detail'

export default defineComponent({
  name: 'ProductCatalog',

  setup() {
    const filterRef = ref<HTMLElement | null>(null)
    const productsRef = ref<HTMLElement | null>(null)

    const isLoading = ref(false)
    const isInitialLoading = ref(false)

    const products = ref<Product[]>([])
    const choices = ref<Partial<ProductFilters>>({})
    const filters = ref<Partial<ProductFilters>>({})

    const filterBarChoices = computed(
      () => getProductCatalogFilters(choices),
    )

    const updateFilters = (value: Partial<ProductFilters>) => {
      filters.value = value
    }

    const getProducts = async () => {
      isLoading.value = true
      products.value = await ProductService.getList(filters.value)
      isLoading.value = false
    }

    const getChoices = async () => {
      choices.value = await ProductService.getFilters()
    }

    const initialLoad = () => Promise.all([getProducts(), getChoices()])

    onMounted(() => {
      isInitialLoading.value = true
      initialLoad().finally(() => {
        isInitialLoading.value = false
      })
    })

    watch(filters, getProducts, { deep: true })

    return () => (
      <div class="product-catalog">
        {isInitialLoading.value ? (
          <DataLoader style={{ height: '50vh' }} />
        ) : (
          <div class="product-catalog__grid">
            <div
              ref={filterRef}
              class="product-catalog__filters"
            >
              <FilterBar
                items={filterBarChoices.value}
                onUpdate:modelValue={updateFilters}
              />
            </div>

            {isLoading.value ? (
              <DataLoader style={{ height: '50vh' }} />
            ) : (
              <div
                ref={productsRef}
                class="product-catalog__product-grid"
              >
                {products.value.map((product) => (
                  <router-link to={{
                    name: ProductDetailPageMeta.name,
                    params: { id: product.id },
                  }}>
                    <ProductCard
                      key={product.id}
                      item={product}
                    />
                  </router-link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.product-catalog {
  position: relative;

  &__grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    column-gap: 16px;
  }

  &__product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__filters {
    position: sticky;
    max-height: calc(100vh - 120px);
    top: 0;

    overflow-y: auto;
    padding-right: 20px;
  }
}
</style>