<script lang="tsx">
import { computed, defineComponent, ref, type PropType } from 'vue'
import type { TextFilterInterface } from '../types/FilterInterface'
import FilterWrapper from './FilterWrapper.vue'
import DefaultInput from '../../input/DefaultInput.vue';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<TextFilterInterface>,
      required: true,
    },
  },

  emits: {
    'update:modelValue': (value?: string) => true,
  },

  setup(props, { emit }) {
    const modelValue = ref<string | undefined>()

    const update = (value: string) => {
      if (value.trim()) modelValue.value = value
      else modelValue.value = undefined

      emit('update:modelValue', modelValue.value)
    }

    return () => (
      <div class="filter text-choice-filter">
        <FilterWrapper name={props.item.name}>
          <DefaultInput
            placeholder={props.item.name}
            modelValue={modelValue.value}
            onUpdate:modelValue={update}
          />
        </FilterWrapper>
      </div>
    )
  }
})
</script>

<style lang="scss">
.text-choice-filter {

}
</style>