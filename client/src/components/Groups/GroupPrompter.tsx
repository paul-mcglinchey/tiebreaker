import { UserGroupIcon } from '@heroicons/react/solid';
import { IProps } from '../../models';
import Prompter from '../Common/Prompter';

const GroupPrompter = ({ href }: IProps) => {
  return (
    <Prompter 
      Icon={UserGroupIcon}
      title="Create a group to get started"
      route={href}
    />
  )
}

export default GroupPrompter;