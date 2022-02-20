import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import { ISmartLinkProps } from '../../../models';

const SmartLink = ({ className, children, to, ...props }: ISmartLinkProps) => {

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