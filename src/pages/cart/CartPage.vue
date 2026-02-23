<script lang="tsx">
import { useCart } from '@/modules/cart'
import CartForm from '@/modules/cart/components/CartForm.vue'
import { HistoryList, ProductCard } from '@/modules/product'
import { PageHeader } from '@/shared/ui'
import { defineComponent } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ProductDetailPageMeta } from '../product-detail'

export default defineComponent({
  name: 'CartPage',

  setup() {
    const router = useRouter()
    const { state } = useCart()

    return () => {
      if (!state.value.totalCount) {
        router.push('/')
      }

      return (
        <div class="cart-page">
          <div class="container">
            <PageHeader
              name='Корзина'
              backRoute={'/'}
              breadcrumbs={[
                {
                  name: 'Главная',
                  to: '/',
                },
                {
                  name: 'Корзина',
                  to: '/cart',
                },
              ]}
            />

            {state.value.totalCount ? (
              <div class="cart-page__grid">
                <div class="cart-page__products">
                  <h3>Товары в корзине</h3>

                  <div class="cart-page__products-body">
                    {state.value.items.map(({ item }) => (
                      <RouterLink to={{
                        name: ProductDetailPageMeta.name,
                        params: { id: item.id },
                      }}>
                        <ProductCard item={item} />
                      </RouterLink>
                    ))}
                  </div>

                  <p class="cart-page__products-total">Всего: {state.value.totalPrice} ₽</p>
                </div>
                <div class="cart-page__form">
                  <CartForm />
                </div>

                <HistoryList exclude={state.value.items.map(({ item }) => item.id)} />
              </div>
              ) : (
                <div>
                  <p>Корзина пуста</p>
                </div>
              )}
          </div>
        </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.cart-page {

  &__grid {
    column-gap: 16px;
  }

  &__products {
    box-shadow: $box-shadow-medium;
    padding: 16px;

    h3 {
      font-size: 22px;
      font-weight: 500;
      padding-bottom: 16px;
      border-bottom: 1px solid $primary;
    }
  }

  &__products-total {
    border-top: 1px solid $primary;
    font-size: 18px;
    font-weight: 500;
    padding-top: 16px;
  }

  &__products-body {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 16px;
  }

  &__total {
    box-shadow: $box-shadow-medium;
    padding: 16px;

    font-size: 18px;
  }

  &__form {
    margin-bottom: 16px;
  }
}
</style>