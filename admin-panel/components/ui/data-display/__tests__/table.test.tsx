/**
 * Table Component Test Suite
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../table';

describe('Table Component', () => {
  it('renders the table with all its parts', () => {
    const { getByRole, getByText } = render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    // Check that all elements are rendered
    expect(getByRole('table')).toBeInTheDocument();
    expect(getByText('Test Caption')).toBeInTheDocument();
    
    // Check headers
    expect(getByText('Header 1')).toBeInTheDocument();
    expect(getByText('Header 2')).toBeInTheDocument();
    
    // Check cells
    expect(getByText('Cell 1')).toBeInTheDocument();
    expect(getByText('Cell 2')).toBeInTheDocument();
    expect(getByText('Cell 3')).toBeInTheDocument();
    expect(getByText('Cell 4')).toBeInTheDocument();
    
    // Check footer
    expect(getByText('Footer 1')).toBeInTheDocument();
    expect(getByText('Footer 2')).toBeInTheDocument();
  });

  it('applies custom className to table components', () => {
    const { getByRole, getByText } = render(
      <Table className="custom-table">
        <TableHeader className="custom-header">
          <TableRow className="custom-row">
            <TableHead className="custom-head">Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="custom-body">
          <TableRow className="custom-row">
            <TableCell className="custom-cell">Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="custom-footer">
          <TableRow className="custom-row">
            <TableCell className="custom-cell">Footer</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption className="custom-caption">Caption</TableCaption>
      </Table>
    );

    // Check custom class names are applied
    expect(getByRole('table')).toHaveClass('custom-table');
    expect(getByText('Caption')).toHaveClass('custom-caption');
    
    // Get elements by their text content and check classes
    const header = getByText('Header').closest('th');
    expect(header).toHaveClass('custom-head');
    
    const cell = getByText('Cell').closest('td');
    expect(cell).toHaveClass('custom-cell');
    
    const footer = getByText('Footer').closest('td');
    expect(footer).toHaveClass('custom-cell');
  });

  it('forwards ref to the underlying table element', () => {
    const ref = React.createRef<HTMLTableElement>();
    const { getByTestId } = render(<Table ref={ref} data-testid="table-ref-test" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveAttribute('data-testid', 'table-ref-test');
  });
}); 