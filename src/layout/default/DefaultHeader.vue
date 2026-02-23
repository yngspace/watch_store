<script lang="tsx">
import { ICONS } from '@/assets/icons'
import { useCart } from '@/modules/cart';
import { CartPageMeta } from '@/pages/cart';
import { MainPageMeta } from '@/pages/main';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultHeader',

  setup() {
    const { state } = useCart()

    return () => (
      <header class='header'>
        <div class="container">
          <div class="header__grid">
            <div class="header__btn-catalog">
            </div>
            <router-link to='/'>
              <div class="header__logo center">ЧАСЫ.RU</div>
            </router-link>
            <div class="header__btn-group">
              <div class="icon-xl">{ICONS.search}</div>
              <router-link to={{ name: CartPageMeta.name }}>
                <div class="header__cart-plate">
                  <span class="header__cart-count">{
                    state.value.totalCount
                  }</span>
                  <div class="icon-xl">{ICONS.bucket}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </header>
    )
  }
})
</script>

<style lang="scss">
.header {
  box-shadow: $box-shadow-medium;
  padding: 8px 0;
  height: 80px;
  background-color: #fff;

  position: sticky;
  top: 0;
  z-index: 100;

  &__grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-size: 42px;
    font-weight: 500;
    font-family: $logo-font;
  }

  &__btn-group {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }

  &__cart-plate {
    position: relative;
  }

  &__cart-count {
    position: absolute;
    top: -12px;
    right: -12px;
    font-size: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: $primary-darken;
    color: #fff;
  }
}
</style>