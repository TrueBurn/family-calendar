import { render, screen } from '@testing-library/react'
import { EventModal } from '@/components/calendar/event-modal'

// Mock the components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div role="dialog">{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}))

jest.mock('@/components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
  FormField: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
  FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormMessage: () => null,
}))

// Mock the hooks
jest.mock('@/hooks/use-events', () => ({
  useEvents: () => ({
    createEvent: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
  }),
}))

jest.mock('@/hooks/use-categories', () => ({
  useCategories: () => ({
    categories: [
      { id: '1', name: 'Work', color: '#ff0000' },
      { id: '2', name: 'Personal', color: '#00ff00' },
    ],
  }),
}))

describe('EventModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    selectedDate: new Date('2023-11-15T10:00:00'),
    event: null,
  }

  it('renders create event form', () => {
    render(<EventModal {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
