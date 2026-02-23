<script lang="tsx">
import { defineComponent, onMounted, type PropType } from 'vue'
import type { Product } from '../types/Product'
import { PhotoGallery } from '@/shared/ui'
import { genderToString } from '../helpers'
import { CartButton } from '@/modules/cart'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  setup(props) {
    const renderCell = (name: string, value?: string | number | boolean) => (
      <div class="product-detail__info-group">
        <div class="product-detail__info-name">{
          name
        }</div>

        <div class="product-detail__info-value">{
          typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : (value || '-')
        }</div>
      </div>
    )

    onMounted(() => {
      let history = JSON.parse((localStorage.getItem('history') || '[]')) as Product[]
      if (history.find(({ id }) => id === props.product.id)) return

      if (history.length === 5) history = history.slice(0, 1)
      history.push(props.product)
      localStorage.history = JSON.stringify(history)
    })

    return () => (
      <div class="product-detail">
        <div class="product-detail__grid">
          <PhotoGallery
            images={props.product.images}
          />

          <div class="product-detail__content">
            <h2 class="product-detail__title">{props.product.name}</h2>

            <div class="product-detail__info">
              {renderCell('Бренд', props.product.brand)}
              {renderCell('Пол', genderToString(props.product.gender))}
              {renderCell('Водозащита', props.product.waterResistance)}
              {renderCell('Новинка', props.product.isNew)}
              {renderCell('Популярная модель', props.product.bestseller)}
              {renderCell('В наличии', props.product.inStock)}
            </div>

            <p class="product-detail__price">{props.product.price} ₽</p>
            <CartButton item={props.product} />
          </div>
        </div>

        <p class="product-detail__description">{
          props.product.description
        }</p>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
$img-height: 78px;
$img-gap: 8px;

.product-detail {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    column-gap: 16px;

    justify-content: space-between;
    column-gap: 32px;
    margin-top: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  &__price {
    font-size: 22px;
    font-weight: 500;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__info-group {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }

  &__description {
    margin: 20px 0;
    box-shadow: $box-shadow-medium;
    padding: 16px;
    border-radius: 4px;

    font-size: 18px;
  }
}
</style>
