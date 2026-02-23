<script lang="tsx">
import { computed, defineComponent, onMounted, ref, watch, type PropType } from 'vue'
import type { Product } from '../types/Product';
import { DefaultButton } from '@/shared/ui';
import { CartButton } from '@/modules/cart';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  setup(props) {
    const imageIndex = ref(0)
    const isActive = ref(false)

    let interval: null | number = null

    const image = computed(() => {
      return props.item.images[imageIndex.value]
    })

    const onInterval = () => {
      if (imageIndex.value + 1 < props.item.images.length) imageIndex.value++
      else imageIndex.value = 0
    }

    watch(isActive, (value) => {
      if (!props.item.images.length) return

      if (value) {
        interval = setInterval(onInterval, 1_500)
        return
      }

      if (!value && interval) clearInterval(interval)
    })

    return () => (
      <div
        class="product-card"

        onMouseover={() => {
          isActive.value = true
        }}

        onMouseout={() => {
          isActive.value = false
        }}
      >
        <div class="product-card__image center">
          <img src={image.value} alt="Фото не загрузилось" />
        </div>

        <p class="product-card__title">{props.item.name}</p>
        <p class="product-card__price">{props.item.price} Р</p>
        <div class={{
          'product-card__button': true,
          'product-card__button--visible': isActive.value,
        }} onClick={(e) => e.preventDefault()}>
          <CartButton item={props.item} />
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  padding: 16px;
  transition: .3s;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: max-content;

  cursor: pointer;

  &__image {
    height: 320px;
    margin-bottom: 16px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__title {
    text-align: center;
    font-size: 22px;
    font-weight: 500;

    text-overflow: ellipsis;
  }

  &__price {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }

  &:hover {
    transform: scale(105%);
    transform-origin: top;
    box-shadow: $box-shadow-heavy;
  }

  &__button {
    margin-top: 16px;
    opacity: 0;
    transform: scale(0) translateY(50px);
    transition: .3s;
    transform-origin: top;

    &--visible {
      opacity: 1;
      transform: scale(100%);
    }
  }
}
</style>