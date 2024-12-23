'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryModal } from './category-modal'
import { CategoryType, defaultColors } from '@/types/calendar'
import { useCategories } from '@/hooks/use-categories'

export function CategoryManager() {
  const { categories } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Categories</h3>
        <Button
          size="sm"
          onClick={() => {
            setSelectedCategory(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
            onClick={() => {
              setSelectedCategory(category)
              setIsModalOpen(true)
            }}
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
          </div>
        ))}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCategory(null)
        }}
        category={selectedCategory}
      />
    </div>
  )
}
