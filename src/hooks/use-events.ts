'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { EventType } from '@/types/calendar'
import { useAuth } from '@/lib/auth/auth-context'

export function useEvents() {
  const [events, setEvents] = useState<EventType[]>([])
  const { user } = useAuth()
  const supabase = createClient()

  const fetchEvents = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          family_members!inner(family_id)
        `)
        .eq('family_members.user_id', user.id)

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }, [user])

  const createEvent = async (eventData: Partial<EventType>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...eventData, created_by: user.id }])
        .select()
        .single()

      if (error) throw error
      setEvents([...events, data])
      return data
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  const updateEvent = async (id: string, eventData: Partial<EventType>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setEvents(events.map(event => event.id === id ? data : event))
      return data
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) throw error
      setEvents(events.filter(event => event.id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchEvents()

    const channel = supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        () => {
          fetchEvents()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchEvents])

  return {
    events,
    createEvent,
    updateEvent,
    deleteEvent,
  }
}
