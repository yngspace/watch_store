<script lang="tsx">
import { computed, defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    size: {
      type: String as PropType<'M' | 'L'>,
      default: 'L',
    }
  },

  setup(props, { attrs }) {
    const classes = computed(() => `data-loader data-loader--${props.size.toLowerCase()} center`)

    return () => (
      <div class={classes.value} { ...attrs }>
        <div class="data-loader__body center">
          <div class="data-loader__loader"/>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
@keyframes l1 {
  0%,10% {
    background-size: 8px 0,8px 4px,8px 4px;
    background-position: 0 50%,0 calc(50% - 2px),0 calc(50% + 2px),50% 50%,50% calc(50% - 2px),50% calc(50% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px);
 }
 90%,100% {
    background-size: 8px 100%,8px 4px, 8px 4px;
    background-position: 0 50%,0 -2px,0 calc(100% + 2px),50% 50%,50% -2px,50% calc(100% + 2px),100% 50%,100% -2px,100% calc(100% + 2px);
 }
}

$color: $primary-darken;

.data-loader {
  box-shadow: $box-shadow-light;
  height: 100%;

  &__body {
    height: 100%;
    padding: 20px;
  }

  &__loader {
    width: 40px;
    aspect-ratio: 1;
    --c: linear-gradient(#{$color} 0 0);
    --r1: radial-gradient(farthest-side at bottom, #{$color} 93%, #{$color});
    --r2: radial-gradient(farthest-side at top, #{$color} 93%, #{$color});
    background: 
      var(--c) ,var(--r1),var(--r2),
      var(--c) ,var(--r1),var(--r2),
      var(--c) ,var(--r1),var(--r2);
    background-repeat: no-repeat;
    animation: l1 1s infinite alternate;
  }
}
</style>