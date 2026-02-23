<script lang="tsx">
import { defineComponent, provide, ref } from 'vue'
import { DefaultLayout } from './layout/default'
import { ModalWindow } from './shared/ui';

export default defineComponent({
  name: 'root',

  setup() {
    const modalRef = ref()
    provide('modal-window', modalRef)

    return () => (
      <div class="root">
        <DefaultLayout>
          <router-view />
        </DefaultLayout>
        <ModalWindow ref={modalRef} />
      </div>
    )
  }
})
</script>

