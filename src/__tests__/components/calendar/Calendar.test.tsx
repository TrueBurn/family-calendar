import { render, screen } from '@testing-library/react'
import { Calendar } from '@/components/calendar/calendar'

// Mock the hooks
jest.mock('@/hooks/use-events', () => ({
  useEvents: () => ({
    events: [
      {
        id: '1',
        title: 'Test Event',
        description: 'Test Description',
        start_time: new Date('2023-11-15T10:00:00').toISOString(),
        end_time: new Date('2023-11-15T11:00:00').toISOString(),
        created_by: 'user1',
        family_id: 'family1',
        category: {
          id: '1',
          name: 'Test Category',
          color: '#ff0000',
        },
      },
    ],
  }),
}))

describe('Calendar Component', () => {
  const defaultProps = {
    view: 'month' as const,
    selectedDate: new Date('2023-11-15'),
    onDateSelect: jest.fn(),
    onEventSelect: jest.fn(),
  }

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('renders calendar with days of the week', () => {
    render(<Calendar {...defaultProps} />)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('displays the test event', () => {
    render(<Calendar {...defaultProps} />)
    expect(screen.getByText('Test Event')).toBeInTheDocument()
  })
})
