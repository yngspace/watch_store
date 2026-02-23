<script lang="tsx">
import { onClickOutside } from '@vueuse/core'
import { defineComponent, ref } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

export interface ModalSlots {
  head: () => JSX.Element | string
  body: () => JSX.Element | string
  footer: () => JSX.Element | string
}

export interface ModalWindowInterface {
  open: (value: ModalSlots, onClose?: () => void) => void
  close: () => void
}

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  setup(props, { expose, emit }) {
    const isOpen = ref(props.isOpen)
    const modalSlots = ref<ModalSlots | null>(null)

    const modalRef = ref()

    let onClose: (() => void) | undefined

    onClickOutside(modalRef, () => close())

    const open = (value: ModalSlots, onCloseFn?: () => void) => {
      modalSlots.value = value
      isOpen.value = true

      console.log('OPEN FROM COMPONENT')

      onClose = onCloseFn
    }

    const close = () => {
      isOpen.value = false
      modalSlots.value = null
      if (onClose) onClose()

      emit('close')
    }

    const render = (slot: () => JSX.Element | string) => {
      if (typeof slot === 'function') return slot()
      return slot
    }

    expose({
      open,
      close,
    })

    return () => {
      if (!isOpen.value || !modalSlots.value) return ''

      return (
      <div class="modal-window">
        <div class="modal-window__body" ref={modalRef}>
          <div class="modal-window__head">{render(modalSlots.value.head)}</div>
          <div class="modal-window__content">{render(modalSlots.value.body)}</div>
          <div class="modal-window__footer">{render(modalSlots.value.footer)}</div>
        </div>
      </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-window {
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  &__body {
    background-color: #fff;
    box-shadow: $box-shadow-medium;
    padding: 16px;

    border-radius: 6px;
  }

  &__head {
    font-size: 24px;
    font-weight: 500;

    margin-bottom: 16px;
  }

  &__content {
    margin-bottom: 16px;
  }
}
</style>