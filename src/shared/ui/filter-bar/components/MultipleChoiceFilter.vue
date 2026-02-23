<script lang="tsx">
import { computed, defineComponent, ref, type PropType } from 'vue'
import type { MultipleChoiceFilterInterface } from '../types/FilterInterface'
import FilterWrapper from './FilterWrapper.vue'
import type { Choice } from '@/shared/types';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MultipleChoiceFilterInterface>,
      required: true,
    },
  },

  emits: {
    'update:modelValue': (values: Choice[]) => !!values,
  },

  setup(props, { emit }) {
    const modelValue = ref<Choice[]>([])

    const isSelected = (choice: Choice) => computed(
      () => Boolean(modelValue.value.find(({ id }) => id === choice.id))
    )

    const update = (choice: Choice, flag: boolean) => {
      if (flag) modelValue.value = modelValue.value.filter(({ id }) => id !== choice.id)
      else modelValue.value = [...modelValue.value, choice]
      
      emit('update:modelValue', modelValue.value)
    }

    return () => (
      <div class="filter multiple-choice-filter">
        <FilterWrapper name={props.item.name}>
          <div class="multiple-choice-filter__list">
            {props.item.choices.map((choice) => {
              const flag = isSelected(choice).value
              return (
                <label class="multiple-choice-filter__item">
                  <p class="multiple-choice-filter__item-title">{choice.name}</p>

                  <input
                    type='checkbox'
                    value={flag}
                    onChange={() => update(choice, flag)} />
                </label>
              )
            })}
          </div>
        </FilterWrapper>
      </div>
    )
  }
})
</script>

<style lang="scss">
.multiple-choice-filter {
  &__list {
    margin-bottom: 8px;
    margin-left: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    column-gap: 8px;
  }
}
</style>