import { toValue, type MaybeRefOrGetter } from "vue";
import type { ProductFilters } from "../types/Product";
import type { FilterInterface } from "@/shared/ui/filter-bar";

export function getProductCatalogFilters(
  choices: MaybeRefOrGetter<Partial<ProductFilters>>
): FilterInterface[] {
  const value = toValue(choices)

  return [
    {
      name: 'Название',
      type: 'Text',
      filterField: 'name',
    },
    {
      name: 'Бренд',
      type: 'MultipleChoice',
      choices: value.brands || [],
      filterField: 'brands',
    },
    {
      name: 'Механизм',
      type: 'MultipleChoice',
      choices: value.movement || [],
      filterField: 'movement',
    },
    {
      name: 'Материал ремешка',
      type: 'MultipleChoice',
      choices: value.strap || [],
      filterField: 'strap',
    },
    {
      name: 'Пол',
      type: 'MultipleChoice',
      choices: value.gender || [],
      filterField: 'gender',
    },
    {
      name: 'Новинки',
      type: 'BooleanChoice',
      filterField: 'isActive',
    },
  ]
}