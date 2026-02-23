import { inject, toValue, type MaybeRefOrGetter } from "vue"
import type { ModalWindowInterface } from "./ModalWindow.vue"
import { DefaultButton } from "../buttons"

export function useModal(): {
  do: (params: {
    head: string,
    body: string
  }) => Promise<void>
} {
  const injectValue = inject<MaybeRefOrGetter<ModalWindowInterface>>('modal-window')

  return {
    do: (params: {
      head: string,
      body: string
    }) => {
      return new Promise<void>((resolve) => {
        if (!injectValue) throw new Error('Modal window is not defined')
        const modalWindow = toValue(injectValue)

        modalWindow.open({
          head: () => params.head,
          body: () => params.body,
          footer() {
            return <DefaultButton name="Продолжить" onClick={
              () => {
                modalWindow.close()
                resolve()
              }
            } />
          }
        }, () => resolve())
      })
    }
  }
}
