<script lang="tsx">
import { computed, defineComponent, ref, type PropType } from 'vue'
import type { BooleanChoiceFilterInterface, MultipleChoiceFilterInterface } from '../types/FilterInterface'
import FilterWrapper from './FilterWrapper.vue'
import type { Choice } from '@/shared/types';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<BooleanChoiceFilterInterface>,
      required: true,
    },
  },

  emits: {
    'update:modelValue': (value?: boolean) => true,
  },

  setup(props, { emit }) {
    const modelValue = ref<boolean | undefined>()

    const isSelected = (choice: Choice) => computed(
      () => modelValue.value === choice.id
    )

    const update = (choice: Choice<boolean>) => {
      if (modelValue.value === choice.id) {
        modelValue.value = undefined
      } else modelValue.value = choice.id
      emit('update:modelValue', modelValue.value)
    }

    const choices = [
      {
        id: true,
        name: 'Да',
      },
      {
        id: false,
        name: 'Нет'
      },
    ]

    return () => (
      <div class="filter bolean-choice-filter">
        <FilterWrapper name={props.item.name}>
          <div class="bolean-choice-filter__list">
            {choices.map((choice) => {
              return (
                <label class="bolean-choice-filter__item" key={String(choice.id)}>
                  <p class="bolean-choice-filter__item-title">{choice.name}</p>

                  <input
                    key={String(isSelected(choice).value)}
                    type='radio'
                    value={isSelected(choice).value}
                    
                    onChange={() => update(choice)} />
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
.bolean-choice-filter {
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