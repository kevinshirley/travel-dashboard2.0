import React from 'react';
import { LOADING_NOW } from 'src/components/common/images';

const Spinner = () => {
  return (
    <div className="spinner">
      <img
        src={LOADING_NOW}
        alt='Loading...'
      />
    </div>
  );
};

export default Spinner;
