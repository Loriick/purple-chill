import { vi, describe, it } from 'vitest'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({ isLoading: false, data: [] })),
}))

describe('Home', () => {
  it('should render correctyl', () => {})
})
