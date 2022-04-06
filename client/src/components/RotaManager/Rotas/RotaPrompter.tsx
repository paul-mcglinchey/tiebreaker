import { TableIcon } from '@heroicons/react/solid';
import Prompter from '../../Common/Prompter';

const RotaPrompter = ({ action }: { action: () => void }) => {
  return (
    <Prompter 
      Icon={TableIcon}
      title="Add a rota to get started"
      action={action}
    />
  )
}

export default RotaPrompter;