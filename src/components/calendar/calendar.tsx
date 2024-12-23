'use client'

import { useMemo } from 'react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns'
import { cn } from '@/lib/utils'
import { EventType } from '@/types/calendar'
import { useEvents } from '@/hooks/use-events'

interface CalendarProps {
  view: 'month' | 'week'
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onEventSelect: (event: EventType) => void
}

export function Calendar({
  view,
  selectedDate,
  onDateSelect,
  onEventSelect,
}: CalendarProps) {
  const { events } = useEvents()

  const days = useMemo(() => {
    const start = view === 'month' ? startOfMonth(selectedDate) : startOfWeek(selectedDate)
    const end = view === 'month' ? endOfMonth(selectedDate) : endOfWeek(selectedDate)
    
    return eachDayOfInterval({ start, end })
  }, [selectedDate, view])

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.start_time), date))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-7 gap-px bg-muted p-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium py-2"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-muted p-1">
        {days.map((day) => {
          const dayEvents = getEventsForDate(day)
          return (
            <div
              key={day.toISOString()}
              className={cn(
                'min-h-[100px] bg-background p-2',
                !isSameMonth(day, selectedDate) && 'text-muted-foreground',
                'hover:bg-muted/50 cursor-pointer'
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className="flex justify-between">
                <span className="text-sm">{format(day, 'd')}</span>
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventSelect(event)
                    }}
                    className={cn(
                      'text-xs p-1 rounded truncate',
                      'hover:opacity-80 transition-opacity'
                    )}
                    style={{
                      backgroundColor: event.category?.color || '#94a3b8',
                      color: '#ffffff',
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
