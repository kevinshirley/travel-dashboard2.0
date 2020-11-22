import React from 'react';
import PropTypes from 'prop-types';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { TRASH_ICON } from 'src/components/material-ui/icons';

function DeleteButton({ background, className, text }) {
  return (
    <RoundedButton background={background} className={className} text={text}>
      {TRASH_ICON}
    </RoundedButton>
  );
}

DeleteButton.prototypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default DeleteButton;
