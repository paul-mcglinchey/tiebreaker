import { useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, Toolbar, SpinnerIcon } from '../Common';
import { GroupModal, GroupPrompter } from '../Groups';
import { ClientModal, ClientList } from '.';

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
      <GroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
      <ClientModal isOpen={addClientOpen} close={() => setAddClientOpen(false)} />
    </>
  )
}

export default ClientDashboard;