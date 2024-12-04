import React, {useState} from 'react';
import {SortName} from '../../utils/const.ts';

type ISortFilterProps = {
  currentFilter: SortName;
  onFilterChange: (filter: SortName) => void;
};

export const SortFilter: React.FC<ISortFilterProps> = ({currentFilter, onFilterChange}) => {

  const [isActive, setActive] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setActive((active) => !active)}
      >
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? 'places__options--opened' : null}`}>
        {Object.values(SortName).map((filter) => (
          <li key={filter}
            className={`places__option ${filter === currentFilter ? 'places__option--active' : null}`}
            tabIndex={0}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </form>
  );
};
