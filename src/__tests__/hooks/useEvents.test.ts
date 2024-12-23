import { renderHook, act } from '@testing-library/react'
import { useEvents } from '@/hooks/use-events'

// Mock the Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
    channel: jest.fn(() => ({
      on: jest.fn(() => ({
        subscribe: jest.fn(),
      })),
    })),
    removeChannel: jest.fn(),
  }),
}))

// Mock the auth context
jest.mock('@/lib/auth/auth-context', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
  }),
}))

describe('useEvents Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with empty events array', async () => {
    let hook: any

    await act(async () => {
      hook = renderHook(() => useEvents())
    })

    expect(hook.result.current.events).toEqual([])
  })

  it('handles event creation', async () => {
    const { result } = renderHook(() => useEvents())

    await act(async () => {
      await result.current.createEvent({
        title: 'Test Event',
        description: 'Test Description',
      })
    })

    expect(result.current.events).toEqual([])
  })
})
