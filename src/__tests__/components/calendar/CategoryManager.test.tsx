import { render, screen } from '@testing-library/react'
import { CategoryManager } from '@/components/calendar/category-manager'

// Mock the components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

// Mock the hooks
jest.mock('@/hooks/use-categories', () => ({
  useCategories: () => ({
    categories: [
      { id: '1', name: 'Work', color: '#ff0000' },
      { id: '2', name: 'Personal', color: '#00ff00' },
    ],
  }),
}))

describe('CategoryManager Component', () => {
  it('renders category list', () => {
    render(<CategoryManager />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Personal')).toBeInTheDocument()
  })

  it('renders add category button', () => {
    render(<CategoryManager />)
    expect(screen.getByText(/Add Category/i)).toBeInTheDocument()
  })
})
