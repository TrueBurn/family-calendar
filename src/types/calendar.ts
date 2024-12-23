export interface EventType {
  id: string
  title: string
  description?: string
  start_time: string
  end_time: string
  created_by: string
  family_id: string
  category_id?: string
  created_at: string
  updated_at: string
  category?: CategoryType
}

export interface CategoryType {
  id: string
  name: string
  color: string
  family_id: string
  created_at: string
  updated_at: string
}

export type ColorOption = {
  name: string
  value: string
}

export const defaultColors: ColorOption[] = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#14b8a6' },
]
