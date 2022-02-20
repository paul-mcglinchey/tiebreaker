import { PathMatch } from 'react-router';
import { IChildrenProps, IProps } from '.';

export interface ISmartLinkProps extends IProps, IChildrenProps {
  to: string,
  className: (match: PathMatch<string> | null) => string
}