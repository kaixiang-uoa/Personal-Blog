'use client';

import { useState } from 'react';
// import { useTranslations } from 'next-intl'; // TODO: Add when needed
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  searchParams: URLSearchParams;
  onPageChange: (page: number) => void;
  initialPageSize?: number;
}

/**
 * PaginationControls Component
 * 
 * A component that handles pagination and page size selection
 * 
 * @component
 * @param {PaginationControlsProps} props - Component props
 * @returns {JSX.Element} Pagination controls with page size selector
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  // locale, // TODO: Use when needed
  // searchParams, // TODO: Use when needed
  onPageChange,
  initialPageSize = 10
}: PaginationControlsProps) {
  // const t = useTranslations('common'); // TODO: Add translations when needed
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Page size options
  const pageSizeOptions = [
    { value: 6, label: '6 per page' },
    { value: 8, label: '8 per page' },
    { value: 10, label: '10 per page' },
    { value: 12, label: '12 per page' },
    { value: 15, label: '15 per page' },
  ];

  // Handle page size change
  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize);
    setPageSize(size);
    // Reset to page 1 when changing page size
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      // Adjust if we're near the edges
      if (currentPage <= 3) {
        end = Math.min(totalPages, 5);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  // Always show pagination, but disable if only one page
  if (totalPages <= 1) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show:</span>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Disabled Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                className="pointer-events-none opacity-50 cursor-not-allowed"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={true}
                className="cursor-default"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                href="#"
                className="pointer-events-none opacity-50 cursor-not-allowed"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show:</span>
        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Active Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pageNumbers.map((pageNum) => {
            // Show ellipsis before first page if needed
            if (pageNum === pageNumbers[0] && pageNum > 1) {
              return (
                <div key={`ellipsis-start-${pageNum}`}>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {pageNum > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </div>
              );
            }

            // Show ellipsis after last page if needed
            if (pageNum === pageNumbers[pageNumbers.length - 1] && pageNum < totalPages) {
              return (
                <div key={`ellipsis-end-${pageNum}`}>
                  {pageNum < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(totalPages);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              );
            }

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNum);
                  }}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
} 