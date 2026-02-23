<script lang="tsx">
import { useLocalStorage } from '@vueuse/core';
import { computed, defineComponent, type PropType } from 'vue'
import type { Product } from '../types/Product';
import { RouterLink } from 'vue-router';
import { ProductDetailPageMeta } from '@/pages/product-detail';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  props: {
    exclude: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  setup(props) {
    const items = computed(() => {
      const result = localStorage.getItem('history')
      if (result) {
        return (JSON.parse(result) as Product[]).filter(({ id }) => !props.exclude.includes(id))
      }
      return []
    })

    return () => {
      if (!items.value.length) return ''

      return (
        <div class="product-history">
          <h3>Вы смотрели</h3>

          <div class="product-history__body">{
            items.value.map((item) => (
              <RouterLink to={{
                name: ProductDetailPageMeta.name,
                params: { id: item.id }
              }}>
                <ProductCard item={item} />
              </RouterLink>
            ))
          }</div>
        </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.product-history {
  padding: 16px;
  box-shadow: $box-shadow-medium;
  margin: 32px 0;

  &__body {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
}
</style>