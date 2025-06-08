"use client";

/**
 * useVirtualizedList - A hook for efficiently rendering large lists by only rendering
 * items that are visible in the viewport
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from '@/lib/utils/performance';

interface VirtualizationOptions {
  itemHeight: number;             // Height of each item in pixels
  overscan?: number;              // Number of items to render outside of view (buffer)
  scrollingDelay?: number;        // Debounce delay for scroll event
  initialIndex?: number;          // Initial scroll position (item index)
  onVisibleItemsChange?: (range: { start: number; end: number }) => void; // Callback when visible items change
}

interface VirtualizedListState {
  start: number;                  // Start index of visible items
  end: number;                    // End index of visible items
  virtualListHeight: number;      // Total height of the virtual list
  scrollTop: number;              // Current scroll position
  containerHeight: number;        // Height of the container element
  isScrolling: boolean;           // Whether the user is currently scrolling
}

interface VirtualizedListResult<T> {
  virtualItems: Array<{ index: number; item: T }>;    // Currently visible items with their indices
  containerProps: {                                    // Props for the container element
    style: React.CSSProperties;
    ref: React.RefObject<HTMLDivElement | null>;      // Fixed type to match useRef's type
    onScroll: (event: React.UIEvent) => void;
  };
  innerProps: {                                        // Props for the inner content container
    style: React.CSSProperties;
  };
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void; // Method to scroll to a specific item
  visibleRange: { start: number; end: number };                      // Current visible range indices
  isScrolling: boolean;                                              // Whether the user is currently scrolling
}

/**
 * Hook for virtualizing large lists to improve performance
 * @param items Array of items to render
 * @param options Virtualization options
 * @returns Object with virtualized items and helper properties
 */
export function useVirtualizedList<T>(
  items: T[],
  options: VirtualizationOptions
): VirtualizedListResult<T> {
  const {
    itemHeight,
    overscan = 3,
    scrollingDelay = 150,
    initialIndex = 0,
    onVisibleItemsChange
  } = options;

  // Container element reference
  const containerRef = useRef<HTMLDivElement>(null);

  // State for virtualization
  const [state, setState] = useState<VirtualizedListState>({
    start: 0,
    end: 10,
    virtualListHeight: items.length * itemHeight,
    scrollTop: initialIndex * itemHeight,
    containerHeight: 0,
    isScrolling: false
  });

  // Calculate visible items based on scroll position and container height
  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.offsetHeight;

    // Calculate visible range with overscan
    let start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    let end = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    setState(prev => ({
      ...prev,
      start,
      end,
      scrollTop,
      containerHeight,
    }));

    // Notify about visible items change if callback provided
    if (onVisibleItemsChange) {
      onVisibleItemsChange({ start, end });
    }
  }, [itemHeight, items.length, overscan, onVisibleItemsChange]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!state.isScrolling) {
      setState(prev => ({ ...prev, isScrolling: true }));
    }

    calculateVisibleRange();
  }, [calculateVisibleRange, state.isScrolling]);

  // Debounced function to mark scrolling as ended
  const debouncedEndScrolling = useCallback(
    debounce(() => {
      setState(prev => ({ ...prev, isScrolling: false }));
    }, scrollingDelay),
    [scrollingDelay]
  );

  // Combined scroll handler
  const scrollHandler = useCallback((event: React.UIEvent) => {
    handleScroll();
    debouncedEndScrolling();
  }, [handleScroll, debouncedEndScrolling]);

  // Scroll to specific index
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'auto') => {
    if (!containerRef.current) return;

    const targetPosition = Math.max(0, index * itemHeight);
    containerRef.current.scrollTo({
      top: targetPosition,
      behavior
    });
  }, [itemHeight]);

  // Initial setup and recalculation when dependencies change
  useEffect(() => {
    setState(prev => ({
      ...prev,
      virtualListHeight: items.length * itemHeight
    }));

    calculateVisibleRange();

    // Scroll to initial position if specified
    if (initialIndex > 0 && containerRef.current) {
      scrollToIndex(initialIndex);
    }
  }, [items.length, itemHeight, calculateVisibleRange, initialIndex, scrollToIndex]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = debounce(() => {
      calculateVisibleRange();
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateVisibleRange]);

  // Calculate the actual items to render
  const virtualItems = [];
  if (items.length > 0) {
    for (let i = state.start; i <= state.end && i < items.length; i++) {
      virtualItems.push({
        index: i,
        item: items[i]
      });
    }
  }

  return {
    virtualItems,
    containerProps: {
      style: {
        overflowY: 'auto',
        position: 'relative',
        height: '100%',
        willChange: 'transform'
      },
      ref: containerRef,
      onScroll: scrollHandler
    },
    innerProps: {
      style: {
        height: state.virtualListHeight,
        position: 'relative',
        width: '100%'
      }
    },
    scrollToIndex,
    visibleRange: { start: state.start, end: state.end },
    isScrolling: state.isScrolling
  };
}

/**
 * Higher-order component for item positioning within a virtualized list
 * @param index Item index
 * @param itemHeight Height of each item
 * @returns Style object for the item
 */
export function getItemStyle(index: number, itemHeight: number): React.CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: itemHeight,
    transform: `translateY(${index * itemHeight}px)`,
    willChange: 'transform'
  };
} 