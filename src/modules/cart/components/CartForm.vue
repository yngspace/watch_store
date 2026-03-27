<script lang="tsx">
import { DefaultButton, DefaultInput } from '@/shared/ui'
import { defineComponent, ref } from 'vue'
import { useCart } from '../composables';
import DataLoader from '@/shared/ui/data-loader/DataLoader.vue'
import { useModal } from '@/shared/ui/modal-window/show-info-modal'

type FormModel = {
  name: string
  mail: string
  phone: string
  city: string
  address: string
}

export default defineComponent({
  setup() {
    const { clear } = useCart()
    const modal = useModal()

    const isPending = ref(false)

    const model = ref<FormModel>({
      name: '',
      mail: '',
      phone: '',
      city: '',
      address: '',
    })

    const errors = ref<Partial<Record<keyof FormModel, string[]>>>({})

    const setError = (key: keyof FormModel, value: string) => {
      if (!errors.value[key]) errors.value[key] = []
      errors.value[key].push(value)
    }

    const clearFieldError = (key: keyof FormModel) => {
      if (!errors.value[key]) return
      delete errors.value[key]
    }

    const updateField = (key: keyof FormModel, value: string) => {
      model.value[key] = value
      clearFieldError(key)
    }

    const formatphone = (value: string) => {
      const rawDigits = value.replace(/\D/g, '')
      if (!rawDigits) return ''

      let digits = rawDigits
      if (digits[0] === '8') digits = `7${digits.slice(1)}`
      else if (digits[0] !== '7') digits = `7${digits}`
      digits = digits.slice(0, 11)

      const country = digits[0] ?? '7'
      const part1 = digits.slice(1, 4)
      const part2 = digits.slice(4, 7)
      const part3 = digits.slice(7, 9)
      const part4 = digits.slice(9, 11)

      let result = `+${country}`
      if (part1) result += ` (${part1}`
      if (part1.length === 3) result += ')'
      if (part2) result += ` ${part2}`
      if (part3) result += `-${part3}`
      if (part4) result += `-${part4}`

      return result
    }

    const updatePhone = (value: string) => {
      model.value.phone = formatphone(value)
      clearFieldError('phone')
    }

    const trimModel = () => {
      model.value = {
        ...model.value,
        name: model.value.name.trim(),
        mail: model.value.mail.trim().toLowerCase(),
        phone: model.value.phone.trim(),
        city: model.value.city.trim(),
        address: model.value.address.trim(),
      }
    }

    const validate = () => {
      Object.entries(model.value).forEach(([key, value]) => {
        if (!value.trim()) setError(key as keyof FormModel, 'Поле обязательно для заполнения')
      })

      if (model.value.name && model.value.name.length < 2) {
        setError('name', 'Имя должно быть не короче 2 символов')
      }

      const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (model.value.mail && !mailPattern.test(model.value.mail)) {
        setError('mail', 'Проверьте адрес электронной почты')
      }

      const phoneDigits = model.value.phone.replace(/\D/g, '')
      const isRussianPhone = /^7\d{10}$/.test(phoneDigits)
      if (model.value.phone && !isRussianPhone) {
        setError('phone', 'Введите российский номер в формате +7 (999) 123-45-67')
      }

      if (model.value.city && model.value.city.length < 2) {
        setError('city', 'Название города должно быть не короче 2 символов')
      }

      if (model.value.address && model.value.address.length < 5) {
        setError('address', 'Адрес должен быть не короче 5 символов')
      }
    }

    const submit = async () => {
      if (isPending.value) return
      errors.value = {}
      trimModel()
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
                onUpdate:modelValue={(value) => { updateField('name', value) }}
                errors={errors.value.name}
              />
              <DefaultInput
                name='Телефон'
                placeholder='+7 (___) ___-__-__'
                modelValue={model.value.phone}
                onUpdate:modelValue={(value) => { updatePhone(value) }}
                errors={errors.value.phone}
              />
              <DefaultInput
                name='Почта'
                placeholder='Введите почту'
                modelValue={model.value.mail}
                onUpdate:modelValue={(value) => { updateField('mail', value) }}
                errors={errors.value.mail}
              />
              <DefaultInput
                name='Город'
                placeholder='Введите город'
                modelValue={model.value.city}
                onUpdate:modelValue={(value) => { updateField('city', value) }}
                errors={errors.value.city}
              />
              <DefaultInput
                name='Адрес'
                placeholder='Введите адрес'
                modelValue={model.value.address}
                onUpdate:modelValue={(value) => { updateField('address', value) }}
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
}
</style>