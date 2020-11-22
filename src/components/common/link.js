import React from 'react';
import Link from 'next/link';

function NextLink(props) {
  const { children, href, className, as, onClick } = props;
  return (
    <Link as={as} href={href}>
      <a className={className} onClick={onClick}>{children}</a>
    </Link>
  );
}

export default NextLink;
