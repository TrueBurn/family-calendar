'use client'

import { useState } from 'react'
import { Calendar } from '@/components/calendar/calendar'
import { EventModal } from '@/components/calendar/event-modal'
import { CalendarHeader } from '@/components/calendar/calendar-header'
import { EventType } from '@/types/calendar'

export default function DashboardPage() {
  const [view, setView] = useState<'month' | 'week'>('month')
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setIsEventModalOpen(true)
  }

  const handleEventSelect = (event: EventType) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <CalendarHeader
        view={view}
        onViewChange={setView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <Calendar
        view={view}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onEventSelect={handleEventSelect}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        selectedDate={selectedDate}
        event={selectedEvent}
      />
    </div>
  )
}
