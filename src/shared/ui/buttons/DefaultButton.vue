<script lang="tsx">
import { ICONS, type ICONKEY } from '@/assets/icons';
import { computed, defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'DefaultButton',
  
  props: {
    type: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
    },
    name: {
      type: String,
      default: '',
    },


    icon: {
      type: String as PropType<ICONKEY>,
      default: undefined,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const classes = computed(() => {
      const btn = 'default-button'
      const result: string[] = [btn, `${btn}--${props.type}`]
      return result.join(' ')
    })

    return () => (
      <button class={classes.value} onClick={() => emit('click')}>
        <span class="default-button__name">
          {props.name}
        </span>

        {props.icon && (
          <div class="icon-xl">{ICONS[props.icon]}</div>
        )}
      </button>
    )
  }
})
</script>

<style lang="scss" scoped>
.default-button {
  padding: 8px 18px;
  border-radius: 6px;

  font-weight: 500;

  transition: .3s;

  display: flex;
  justify-content: space-between;
  align-items: center;

  column-gap: 16px;

  border: 1px solid transparent;

  &--primary {
    background-color: $primary;

    &:hover {
      background-color: $primary-darken;
    }
  }

  &--secondary {
    background-color: #fff;
    border-color: $primary-border;

    &:hover {
      border-color: $primary-darken;
    }
  }
}
</style>