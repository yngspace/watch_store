import type { Choice } from "@/shared/types"

export interface BaseFilterInterface {
  type: string
  name: string
  filterField: string
}

export interface MultipleChoiceFilterInterface extends BaseFilterInterface {
  type: 'MultipleChoice'
  choices: Array<Choice>
}

export interface BooleanChoiceFilterInterface extends BaseFilterInterface {
  type: 'BooleanChoice'
}

export interface TextFilterInterface extends BaseFilterInterface {
  type: 'Text'
}
