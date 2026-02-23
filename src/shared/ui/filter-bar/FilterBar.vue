<script lang="tsx">
import { defineComponent, ref, type PropType } from 'vue'
import type { FilterInterface } from './types';
import FilterWrapper from './components/FilterWrapper.vue';
import MultipleChoiceFilter from './components/MultipleChoiceFilter.vue';
import BooleanChoiceFilter from './components/BooleanChoiceFilter.vue';
import TextFilter from './components/TextFilter.vue';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<FilterInterface[]>,
      required: true,
    },
  },

  emits: {
    'update:modelValue': (value: Record<string, any>) => !!value,
  },

  setup(props, { emit }) {
    const filters = ref<Record<string, any>>({})

    const update = ({ filterField }: FilterInterface, value: any) => {
      filters.value[filterField] = value
      emit('update:modelValue', filters.value)
    }

    const fabric = (item: FilterInterface) => {
      if (item.type === 'MultipleChoice') return <MultipleChoiceFilter item={item} onUpdate:modelValue={(value) => update(item, value)} />
      if (item.type === 'BooleanChoice') return <BooleanChoiceFilter item={item} onUpdate:modelValue={(value) => update(item, value)} />
      if (item.type === 'Text') return <TextFilter item={item} onUpdate:modelValue={(value) => update(item, value)} />

      throw new Error('Unkown filter type')
    }

    return () => (
      <div class="filter-bar">
        {props.items.map(fabric)}
      </div>
    )
  }
})
</script>
