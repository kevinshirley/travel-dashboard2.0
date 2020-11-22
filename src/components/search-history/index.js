import React from 'react';
import SearchHistorySection1 from 'src/components/search-history/search-history-section-1';
import PageHeader from 'src/components/common/page-header';

function SearchHistory() {
  return (
    <>
      <PageHeader title='Search History' />
      <SearchHistorySection1 />
    </>
  );
};

export default SearchHistory;
