<script lang="tsx">
import { DefaultButton, DefaultInput } from '@/shared/ui'
import { defineComponent, ref } from 'vue'
import { useCart } from '../composables';
import DataLoader from '@/shared/ui/data-loader/DataLoader.vue'
import { useModal } from '@/shared/ui/modal-window/show-info-modal'

export default defineComponent({
  setup() {
    const { clear } = useCart()
    const modal = useModal()

    const isPending = ref(false)

    const model = ref({
      name: '',
      mail: '',
      phone: '',
      city: '',
      address: '',
    })

    const errors = ref<Record<string, string[]>>({})

    const setError = (key: keyof typeof model.value, value: string) => {
      if (!errors.value[key]) errors.value[key] = []
      errors.value[key].push(value)
    }

    const validate = () => {
      Object.entries(model.value).forEach(([key, value]) => {
        if (!value.trim()) setError(key as any, 'Поле обязательно для заполнения')
      })

      if (!model.value.mail.includes('@')) setError('mail', 'Проверьте адрес электронной почты')
    }

    const submit = async () => {
      if (isPending.value) return
      errors.value = {}
      validate()
      if (Object.keys(errors.value).length) return

      isPending.value = true

      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, Math.random() * 300)
      }).finally(() => {
        modal.do({
          head: 'Заказ оформлен',
          body: 'Спасибо за заказ! Мы свяжемся с вами в ближайшее время'
        }).finally(() => {
          isPending.value = false
          clear()
        })
      })

    }

    return () => (
      <div class="cart-form">
        {isPending.value ? (
          <DataLoader />
        ) : (
          <div class="cart-form__body">
            <h3 class="cart-form__title">Контактные данные</h3>
            <div class="cart-form__input-list">
              <DefaultInput
                name='Имя'
                placeholder='Введите имя'
                modelValue={model.value.name}
                onUpdate:modelValue={(value) => { model.value.name = value }}
                errors={errors.value.name}
              />
              <DefaultInput
                name='Телефон'
                placeholder='Введите номер телефона'
                modelValue={model.value.phone}
                onUpdate:modelValue={(value) => { model.value.phone = value }}
                errors={errors.value.phone}
              />
              <DefaultInput
                name='Почта'
                placeholder='Введите почту'
                modelValue={model.value.mail}
                onUpdate:modelValue={(value) => { model.value.mail = value }}
                errors={errors.value.mail}
              />
              <DefaultInput
                name='Город'
                placeholder='Введите город'
                modelValue={model.value.city}
                onUpdate:modelValue={(value) => { model.value.city = value }}
                errors={errors.value.city}
              />
              <DefaultInput
                name='Адрес'
                placeholder='Введите адрес'
                modelValue={model.value.address}
                onUpdate:modelValue={(value) => { model.value.address = value }}
                errors={errors.value.address}
              />
              <div />
              <DefaultButton name='Оформить заказ' onClick={submit} />
            </div>
          </div>
        )}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.cart-form {
  box-shadow: $box-shadow-medium;
  padding: 16px;

  &__title {
    margin-bottom: 12px;
  }

  &__input-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;

    .default-input {
      width: 100%;
    }
  }

  .default-button {

  }
}
</style>