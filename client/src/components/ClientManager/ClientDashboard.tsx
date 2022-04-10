import { useContext, useState } from 'react';
import { useRefresh, useSessionStorage, useStatus } from '../../hooks';
import { GroupType, IClientGroup, IFetch, IGroupsResponse } from '../../models';
import { requestBuilder, RotaGroupService } from '../../services';
import { ApplicationContext, endpoints } from '../../utilities';
import { Fetch, FetchError, Modal } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { GroupToolbar } from '../Toolbar';
import { ClientForm, ClientList } from './Clients';

const ClientDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { setGroupId } = useContext(ApplicationContext);

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addClientOpen, setAddClientOpen] = useState(false);
  const toggleAddClientOpen = () => setAddClientOpen(!addClientOpen);

  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService, refresh);

  return (
    <Fetch
      fetchOutput={useSessionStorage(endpoints.groups(GroupType.CLIENT).groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Clients" groupType={GroupType.CLIENT} addClientAction={toggleAddClientOpen} showSelector setGroupId={setGroupId}  />
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