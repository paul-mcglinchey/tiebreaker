import { useState } from 'react';
import { useResolvedPath, useMatch, Link } from 'react-router-dom';

const SmartLink = ({ className, children, to, ...props }) => {

  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      {...props}
      className={className(match)}
    >
      {children}
    </Link>
  )
}

export default SmartLink;