import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from '@/components/features/home/SearchBar'

// Mock the router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}))

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input', () => {
    render(<SearchBar locale="en" />)
    
    const searchInput = screen.getByPlaceholderText('Search articles...')
    expect(searchInput).toBeInTheDocument()
  })

  it('displays initial search value', () => {
    render(<SearchBar locale="en" initialSearch="test search" />)
    
    const searchInput = screen.getByDisplayValue('test search')
    expect(searchInput).toBeInTheDocument()
  })

  it('debounces search input', async () => {
    render(<SearchBar locale="en" />)
    
    const searchInput = screen.getByPlaceholderText('Search articles...')
    
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    // Should not immediately call router.push
    expect(mockPush).not.toHaveBeenCalled()
    
    // Wait for debounce
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/en?search=test')
    }, { timeout: 500 })
  })

  it('clears search when input is empty', async () => {
    render(<SearchBar locale="en" initialSearch="test" />)
    
    const searchInput = screen.getByDisplayValue('test')
    
    fireEvent.change(searchInput, { target: { value: '' } })
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/en?')
    }, { timeout: 500 })
  })
}) 