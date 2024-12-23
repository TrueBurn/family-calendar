'use client'

import { format, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CalendarHeaderProps {
  view: 'month' | 'week'
  onViewChange: (view: 'month' | 'week') => void
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function CalendarHeader({
  view,
  onViewChange,
  selectedDate,
  onDateChange,
}: CalendarHeaderProps) {
  const navigateMonth = (direction: 'forward' | 'backward') => {
    const newDate =
      direction === 'forward'
        ? addMonths(selectedDate, 1)
        : subMonths(selectedDate, 1)
    onDateChange(newDate)
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('backward')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('forward')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => onDateChange(new Date())}
        >
          Today
        </Button>
        <Select
          value={view}
          onValueChange={(value: 'month' | 'week') => onViewChange(value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
