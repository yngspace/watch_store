<script lang="tsx">
import { ICONS } from '@/assets/icons';
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
  },

  setup(props, { slots }) {
    const isOpen = ref(false)

    return () => (
      <div class="filter-wrapper">
        <div class="filter-wrapper__head" onClick={() => {
            isOpen.value = !isOpen.value
          }}>
          <p class="filter-wrapper__title">{props.name}</p>
          <button
            class={{
              'icon-l': true,
              'filter-wrapper__btn': true,
              'filter-wrapper__btn--open': isOpen.value,
            }}
          >{ICONS.arrowDown}</button>

        </div>
        {isOpen.value && (
          slots.default?.()
        )}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.filter-wrapper {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    column-gap: 8px;

    font-size: 20px;
    font-weight: 500;
    padding: 8px 0;
    margin-bottom: 8px;
    border-bottom: 1px solid $primary;

    cursor: pointer;
  }

  &__btn {
    transition: .3s;
    &--open {
      transform: rotate(180deg);
    }
  }
}
</style>