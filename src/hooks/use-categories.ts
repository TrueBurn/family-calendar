'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CategoryType } from '@/types/calendar'
import { useAuth } from '@/lib/auth/auth-context'

export function useCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const { user } = useAuth()
  const supabase = createClient()

  const fetchCategories = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('event_categories')
        .select(`
          *,
          family_members!inner(family_id)
        `)
        .eq('family_members.user_id', user.id)

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [user])

  const createCategory = async (categoryData: Partial<CategoryType>) => {
    try {
      const { data, error } = await supabase
        .from('event_categories')
        .insert([categoryData])
        .select()
        .single()

      if (error) throw error
      setCategories([...categories, data])
      return data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  }

  const updateCategory = async (id: string, categoryData: Partial<CategoryType>) => {
    try {
      const { data, error } = await supabase
        .from('event_categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setCategories(categories.map(category => 
        category.id === id ? data : category
      ))
      return data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('event_categories')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCategories(categories.filter(category => category.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchCategories()

    const channel = supabase
      .channel('categories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'event_categories'
        },
        () => {
          fetchCategories()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchCategories])

  return {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
