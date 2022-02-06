import { UserAddIcon } from '@heroicons/react/solid'
import Prompter from '../Common/Prompter'

const ClientPrompter = () => {
  return (
    <Prompter
      Icon={UserAddIcon}
      title="Add your first client"
      route="/addclients"
    />
  )
}

export default ClientPrompter;