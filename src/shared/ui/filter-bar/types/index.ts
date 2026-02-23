import type { BaseFilterInterface, BooleanChoiceFilterInterface, MultipleChoiceFilterInterface, TextFilterInterface } from "./FilterInterface"

export type FilterInterface = MultipleChoiceFilterInterface | BooleanChoiceFilterInterface | TextFilterInterface
