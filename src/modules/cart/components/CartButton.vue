<script lang="tsx">
import type { Product } from '@/modules/product';
import { defineComponent, type PropType } from 'vue'
import { useCart } from '../composables';
import { DefaultButton } from '@/shared/ui';
import { ICONS } from '@/assets/icons';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  setup(props) {
    const { getState, addToCart, removeFromCart } = useCart()

    const state = getState(props.item)

    return () => (
      <div class="cart-button">
        {state.value.inCart ? (
          <div class="cart-button__plate">
            <div class="cart-button__btn-group">
              <button class="cart-button__btn cart-button__btn--increase icon-xl" onClick={() => removeFromCart(props.item)}>{ ICONS.minus }</button>
              <button class="cart-button__btn cart-button__btn--decrease icon-xl" onClick={() => addToCart(props.item)}>{ ICONS.plus }</button>
            </div>

            <span class="cart-button__count">{ state.value.count }</span>
            <span class="cart-button__count icon-xl">{ ICONS.bucket }</span>
          </div>
        ) : (
            <DefaultButton
              name='Купить'
              icon='bucket'
              onClick={() => addToCart(props.item)}
            />
        )}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.cart-button {
  .default-button {
    width: 100%;
  }

  &__plate {
    display: flex;
    justify-content: space-between;

    padding: 8px 18px;
    border-radius: 6px;

    font-weight: 500;

    transition: .3s;

    display: flex;
    justify-content: space-between;
    align-items: center;

    column-gap: 16px;

    border: 1px solid transparent;

    background-color: #fff;
    border-color: $primary;
    transition: .3s;

    &:hover {
      border-color: $primary-darken;
    }
  }

  &__btn-group {
    display: flex;
    column-gap: 16px;
  }

  &__btn {
    font-size: 20px;
  }
}
</style>