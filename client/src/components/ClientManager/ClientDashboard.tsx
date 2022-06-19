import { useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, Toolbar, SpinnerIcon } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddClientModal, ClientList } from '.';

const ClientDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const [addClientOpen, setAddClientOpen] = useState(false)

  const { count, isLoading, error, refresh } = useGroupService()

  return (
    <>
      {!isLoading && count > 0 ? (
        <>
          <Toolbar title="Clients" addClientAction={() => setAddClientOpen(true)} />
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