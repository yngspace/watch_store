import type { Product } from "../types/Product";

export function genderToString(value: Product['gender']) {
  if (value === 'men') return 'Мужские'
  if (value === 'women') return 'Женские'
  return 'Унисекс'
}