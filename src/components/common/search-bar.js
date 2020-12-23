import React from 'react';
import { SEARCH_ICON } from 'src/components/material-ui/icons';
import InputField from 'src/components/material-ui/input-base';

function SearchBar({ placeholder = 'Search' }) {
  return (
    <div className='search-bar'>
      <InputField
        ariaLabel='search'
        className='search-field'
        placeholder={placeholder}
      />
      <div className='search-icon'>
        {SEARCH_ICON}
      </div>
    </div>
  );
}

export default SearchBar;
