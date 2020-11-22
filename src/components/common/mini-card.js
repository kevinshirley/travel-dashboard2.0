import React from 'react';
import Link from 'src/components/common/link';

function MiniCard({ content, subtitle, url }) {
  return (
    <div className='mini-card'>
      <small className='subtitle'>
        {subtitle}
      </small>
      <div className='card-content'>
        <h2>{content}</h2>
      </div>
      <small className='cta'>
        <Link href={url}>Learn More</Link>
      </small>
    </div>
  );
};

export default MiniCard;
