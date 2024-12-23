'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CategoryType, defaultColors } from '@/types/calendar'
import { useCategories } from '@/hooks/use-categories'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
})

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category: CategoryType | null
}

export function CategoryModal({
  isOpen,
  onClose,
  category,
}: CategoryModalProps) {
  const { createCategory, updateCategory, deleteCategory } = useCategories()
  
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: defaultColors[0].value,
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        color: category.color,
      })
    } else {
      form.reset({
        name: '',
        color: defaultColors[0].value,
      })
    }
  }, [category, form])

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      if (category) {
        await updateCategory(category.id, values)
      } else {
        await createCategory(values)
      }
      onClose()
    } catch (error) {
      console.error('Error saving category:', error)
    }
  }

  const handleDelete = async () => {
    if (category) {
      try {
        await deleteCategory(category.id)
        onClose()
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? 'Edit Category' : 'Create Category'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-8 gap-2"
                    >
                      {defaultColors.map((color) => (
                        <FormItem key={color.value}>
                          <FormControl>
                            <RadioGroupItem
                              value={color.value}
                              id={color.value}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <label
                            htmlFor={color.value}
                            className="block w-6 h-6 rounded-full cursor-pointer ring-offset-background peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-ring peer-data-[state=checked]:ring-offset-2"
                            style={{ backgroundColor: color.value }}
                          />
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="submit">
                {category ? 'Update Category' : 'Create Category'}
              </Button>
              {category && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete Category
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
