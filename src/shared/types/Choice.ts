export interface Choice<T extends string | number | boolean = string | number | boolean> {
  id: T
  name: string
}
