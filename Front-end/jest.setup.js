import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  useParams() {
    return {}
  },
}))

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
  useLocale: () => 'en',
}))

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }) => children,
})) 