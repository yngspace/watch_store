<script lang="tsx">
import { ICONS } from '@/assets/icons'
import { defineComponent, type PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },

    backRoute: {
      type: [String, Object] as PropType<RouteLocationRaw>
    },
    breadcrumbs: {
      type: Array as PropType<Array<{ name: string, to: RouteLocationRaw }>>,
      default: () => [],
    },
  },

  setup(props) {
    return () => (
      <div class="page-header">
        <div class="page-header__block">
          {props.backRoute && (
            <RouterLink to={props.backRoute} class="page-header__back">
              <button class="page-header__back-btn icon-xl">{
                ICONS.arrowLeft
              }</button>
            </RouterLink>
          )}

          <h1 class="page-header__title">{props.name}</h1>
        </div>

        {props.breadcrumbs.length > 0 && (
          <div class="page-header__breadcrumbs-list">{
            props.breadcrumbs.map(({ name, to }, index) => (
              <>
                <RouterLink key={to.toString()} class="page-header__breadcrumbs-item" to={to}>{name}</RouterLink>
                {(index + 1) !== props.breadcrumbs.length && <span>/</span>}
              </>
            ))
          }</div>
        )}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.page-header {
  margin: 32px 0;

  &__block {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }

  &__breadcrumbs-list {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }

  &__breadcrumbs-item {
    font-size: 16px;
    color: $font-color;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
