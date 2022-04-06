import { UserAddIcon } from '@heroicons/react/solid'
import Prompter from '../../../Common/Prompter'

const ClientPrompter = ({ action }: { action: () => void }) => {

  return (
    <Prompter
      Icon={UserAddIcon}
      title="Add your first client"
      action={action}
    />
  )
}

export default ClientPrompter;