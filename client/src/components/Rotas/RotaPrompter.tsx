import { TableIcon } from '@heroicons/react/solid';
import Prompter from '../Common/Prompter';

const RotaPrompter = () => {
  return (
    <Prompter 
      Icon={TableIcon}
      title="Add a rota to get started"
      route="/addrota"
    />
  )
}

export default RotaPrompter;