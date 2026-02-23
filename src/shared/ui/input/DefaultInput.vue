<script lang="tsx">
import { defineComponent, ref, watch, type PropType } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: {
    'update:modelValue': (value: string) => !!value,
  },

  setup(props, { emit }) {
    const modelValue = ref(props.modelValue)

    watch(modelValue, (value) => {
      emit('update:modelValue', value)
    })

    watch(() => props.modelValue, (value) => {
      modelValue.value = value
    })

    return () => (
      <label class="default-input">
        {props.name && <span class="default-input__name">{props.name}</span>}

        <input
          class="default-input__input"
          placeholder={props.placeholder}
          value={modelValue.value}
          onInput={(e) => {
            modelValue.value = (e.target as HTMLInputElement).value
          }}
        />

        {props.errors.length > 0 && props.errors.map((error) => (
          <p class="default-input__error">{error}</p>
        ))}
      </label>
    )
  }
})
</script>

<style lang="scss" scoped>
.default-input {
  &__name {
    display: block;
    margin-bottom: 8px;
  }

  &__input {
    border: 1px solid $primary;
    border-radius: 6px;
    padding: 8px;
    font-size: 16px;
    color: $font-color;
    transition: .3s;

    width: 100%;

    &:focus {
      border-color: $primary-darken;
    }
  }

  &__error {
    margin-top: 8px;
    font-size: 12px;
    color: red;
  }
}
</style>