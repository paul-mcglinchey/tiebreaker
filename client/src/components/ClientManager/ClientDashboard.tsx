import { useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, GroupToolbar, SpinnerIcon } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddClientModal, ClientList } from '.';

const ClientDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const [addClientOpen, setAddClientOpen] = useState(false)

  const { getCount, isLoading, error, refresh } = useGroupService()

  return (
    <>
      {!isLoading && getCount() > 0 ? (
        <>
          <GroupToolbar title="Clients" addClientAction={() => setAddClientOpen(true)} showSelector />
          <ClientList setAddClientOpen={setAddClientOpen} />
        </>
      ) : (
        isLoading ? (
          <SpinnerIcon className="w-6 h-6" />
        ) : (
          error ? (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          ) : (
            <GroupPrompter action={() => setAddGroupOpen(true)} />
          )
        )
      )}
      <AddGroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
      <AddClientModal isOpen={addClientOpen} close={() => setAddClientOpen(false)} />
    </>
  )
}

export default ClientDashboard;