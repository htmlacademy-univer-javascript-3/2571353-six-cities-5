import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SortFilter } from './SortFilter';
import { SortName } from '../../utils/const';

describe('SortFilter', () => {
  it('should render correctly with current filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<SortFilter currentFilter={SortName.Popular} onFilterChange={mockOnFilterChange} />);

    const currentFilter = screen.getByText(SortName.Popular, { selector: '.places__sorting-type' });
    expect(currentFilter).toBeInTheDocument();

    const filterOptions = screen.getByRole('list', { hidden: true });
    expect(filterOptions).toHaveClass('places__options');
    expect(filterOptions).not.toHaveClass('places__options--opened');
  });

  it('should toggle dropdown visibility when clicked', () => {
    const mockOnFilterChange = vi.fn();

    render(<SortFilter currentFilter={SortName.Popular} onFilterChange={mockOnFilterChange} />);

    const dropdownToggle = screen.getByText(SortName.Popular, { selector: '.places__sorting-type' });
    fireEvent.click(dropdownToggle);

    const filterOptions = screen.getByRole('list');
    expect(filterOptions).toHaveClass('places__options--opened');

    fireEvent.click(dropdownToggle);

    expect(filterOptions).not.toHaveClass('places__options--opened');
  });

  it('should call onFilterChange with the selected filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<SortFilter currentFilter={SortName.Popular} onFilterChange={mockOnFilterChange} />);

    const dropdownToggle = screen.getByText(SortName.Popular, { selector: '.places__sorting-type' });
    fireEvent.click(dropdownToggle);

    const highToLowOption = screen.getByText(SortName.HighToLow, { selector: '.places__option' });
    fireEvent.click(highToLowOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith(SortName.HighToLow);
  });

  it('should highlight the active filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<SortFilter currentFilter={SortName.HighToLow} onFilterChange={mockOnFilterChange} />);

    const activeFilter = screen.getByText(SortName.HighToLow, { selector: '.places__option--active' });
    expect(activeFilter).toBeInTheDocument();
  });
});
