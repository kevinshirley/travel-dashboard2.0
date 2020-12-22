import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function ReadMoreText({short, medium = '', long}) {
	const [isShortTextOpened, setIsShortTextOpened] = useState(true);
	const [isMediumTextOpened, setIsMediumTextOpened] = useState(false);
	const [isLongTextOpened, setIsLongTextOpened] = useState(false);

	const afterShortTextOpen = () => {
    if (medium) {
      setIsShortTextOpened(false);
      setIsMediumTextOpened(true);
      setIsLongTextOpened(false);
    } else {
      setIsShortTextOpened(false);
      setIsMediumTextOpened(false);
      setIsLongTextOpened(true);
    }
	}

	const afterMediumTextOpen = () => {
		setIsShortTextOpened(false);
		setIsMediumTextOpened(false);
		setIsLongTextOpened(true);
	}

	const afterLongTextOpen = () => {
		setIsShortTextOpened(true);
		setIsMediumTextOpened(false);
		setIsLongTextOpened(false);
	}

	const shortTextClasses = cx('text-with-read-more', {
    'short-text-displayed': isShortTextOpened,
    'short-text-hidden': !isShortTextOpened,
	});

	const mediumTextClasses = cx('text-with-read-more', {
    'medium-text-displayed': isMediumTextOpened,
    'medium-text-hidden': !isMediumTextOpened,
	});

	const longTextClasses = cx('text-with-read-more', {
    'long-text-displayed': isLongTextOpened,
    'long-text-hidden': !isLongTextOpened,
  });

	return (
		<>
			<span className={shortTextClasses}>
				{short}
				<span className="read-more" onClick={afterShortTextOpen}>Read More</span>
			</span>
			<span className={mediumTextClasses}>
				{medium}
				<span className="read-more" onClick={afterMediumTextOpen}>Read More</span>
			</span>
			<span className={longTextClasses}>
				{long}
				<span className="read-more" onClick={afterLongTextOpen}><br/>Read Less</span>
			</span>
		</>
	)
}

ReadMoreText.proptypes = {
  short: PropTypes.string.isRequired,
  medium: PropTypes.string,
  long: PropTypes.string.isRequired,
};

export default ReadMoreText;