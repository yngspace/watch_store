<script lang="tsx">
import { defineComponent } from 'vue'
import DefaultHeader from './DefaultHeader.vue'

export default defineComponent({
  name: 'DefaultLayout',

  setup(_, { slots }) {
    return () => <div class="layout">
      <DefaultHeader />
      <div class="content">
        {slots.default?.()}
      </div>
    </div>
  },
})
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 32px;
}
</style>