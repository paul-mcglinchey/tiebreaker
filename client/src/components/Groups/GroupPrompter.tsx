import { UserGroupIcon } from '@heroicons/react/solid';
import Prompter from '../Common/Prompter';

const GroupPrompter = () => {
  return (
    <Prompter 
      Icon={UserGroupIcon}
      title="Create a group to get started"
      route="/creategroup"
    />
  )
}

export default GroupPrompter;