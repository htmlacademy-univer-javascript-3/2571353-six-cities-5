import { render, screen } from '@testing-library/react';
import { Rating } from './Rating';
import { ObjectClass } from '../../utils/const';

describe('Rating', () => {
  it('should render correctly with default props', () => {
    render(<Rating rating={4.2} objectType={ObjectClass.Review} />);

    const visuallyHiddenElement = screen.getByText(/Rating/i);
    expect(visuallyHiddenElement).toBeInTheDocument();

    const starsElement = screen.getByText(/Rating/i).previousSibling;
    expect(starsElement).toHaveStyle('width: 80%');
  });

  it('should render in full mode when isFullMode is true', () => {
    render(<Rating rating={3.7} objectType={ObjectClass.Offer} isFullMode />);

    const ratingValueElement = screen.getByText('3.7');
    expect(ratingValueElement).toBeInTheDocument();
  });

  it('should apply correct class based on objectType', () => {
    render(<Rating rating={2.5} objectType={ObjectClass.Offer} />);

    const containerElement = screen.getByText(/Rating/i).parentElement?.parentElement;
    expect(containerElement).toHaveClass('offer__rating rating');
  });
});
