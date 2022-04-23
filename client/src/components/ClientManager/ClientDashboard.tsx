import { useContext, useState } from 'react';
import { useFetch, useGroupService, useRefresh, useRequestBuilder } from '../../hooks';
import { IFetch, IGroupsResponse } from '../../models';
import { ApplicationContext, endpoints } from '../../utilities';
import { Fetch, FetchError, Modal, GroupToolbar } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { ClientForm, ClientList } from './Clients';

const ClientDashboard = () => {

  const { dependency, refresh } = useRefresh()
  const { setGroupId } = useContext(ApplicationContext)
  const { requestBuilder } = useRequestBuilder()

  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen)

  const [addClientOpen, setAddClientOpen] = useState(false)
  const toggleAddClientOpen = () => setAddClientOpen(!addClientOpen)

  const groupService = useGroupService(refresh)

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Clients" addClientAction={toggleAddClientOpen} showSelector setGroupId={setGroupId} />
                <ClientList toggleAddClientOpen={toggleAddClientOpen} dependency={dependency} />
              </>
            ) : (
              !isLoading && (
                <GroupPrompter action={toggleAddGroupOpen} />
              )
            )
          ) : (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          )}
          <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} groupService={groupService} />
          <Modal title="Add client" modalOpen={addClientOpen} toggleModalOpen={toggleAddClientOpen}>
            <ClientForm refresh={refresh} />
          </Modal>
        </>
      )}
    />
  )
}

export default ClientDashboard;