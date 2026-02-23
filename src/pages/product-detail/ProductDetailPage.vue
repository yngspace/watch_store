<script lang="tsx">
import { HistoryList, ProductDetail, ProductService, type Product } from '@/modules/product'
import { DataLoader } from '@/shared/ui';
import PageHeader from '@/shared/ui/page-header/PageHeader.vue';
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    const isLoading = ref(false)
    const product = ref<Product | null>(null)

    const load = async () => {
      if (!route.params.id) {
        throw new Error('This page must have `id` in route.params')
      }

      isLoading.value = true
      try {
        product.value = await ProductService.getOne(route.params.id.toString())
      } catch (e) {
        if (e instanceof Error) alert(e.message)
      }

      isLoading.value = false
    }

    onMounted(load)

    watch(() => route.params.id, load)

    return () => {
      return (
      <div class="product-detail-page">
        <div class="container">
          {isLoading.value || !product.value ? (
            <DataLoader style={{ height: '50vh' }} />
          ) : (
            <>
              <PageHeader
                name={product.value.name}
                backRoute={'/'}
                breadcrumbs={[
                  {
                    name: 'Главная',
                    to: '/',
                  },
                  {
                    name: product.value.name,
                    to: route.fullPath,
                  },
                ]}
              />

              <ProductDetail product={product.value} />

              <HistoryList exclude={[product.value.id]} />
            </>
          )}
        </div>
      </div>
    )}
  }
})
</script>
