import React from 'react';
import { SEARCH_ICON } from 'src/components/material-ui/icons';
import InputField from 'src/components/material-ui/input-base';

function SearchBar() {
  return (
    <div className='search-bar'>
      <div className='search-icon'>
        {SEARCH_ICON}
      </div>
      <InputField ariaLabel='search' className='search-field' placeholder='Search' />
    </div>
  );
}

export default SearchBar;
