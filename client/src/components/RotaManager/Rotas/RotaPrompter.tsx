import { TableIcon } from '@heroicons/react/solid';
import Prompter from '../../Common/Prompter';

const RotaPrompter = () => {
  return (
    <Prompter 
      Icon={TableIcon}
      title="Add a rota to get started"
      route="/rotas/addrota"
    />
  )
}

export default RotaPrompter;