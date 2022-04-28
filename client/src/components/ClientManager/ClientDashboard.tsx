import { useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, GroupToolbar, SpinnerIcon } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddClientModal, ClientList } from './Clients';

const ClientDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen)

  const [addClientOpen, setAddClientOpen] = useState(false)
  const toggleAddClientOpen = () => setAddClientOpen(!addClientOpen)

  const { getCount, isLoading, error, refresh } = useGroupService()

  return (
    <>
      {!isLoading && getCount() > 0 ? (
        <>
          <GroupToolbar title="Clients" addClientAction={toggleAddClientOpen} showSelector />
          <ClientList toggleAddClientOpen={toggleAddClientOpen} />
        </>
      ) : (
        isLoading ? (
          <SpinnerIcon className="w-6 h-6" />
        ) : (
          error ? (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          ) : (
            <GroupPrompter action={toggleAddGroupOpen} />
          )
        )
      )}
      <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} />
      <AddClientModal addClientOpen={addClientOpen} toggleAddClientOpen={toggleAddClientOpen} />
    </>
  )
}

export default ClientDashboard;