import { useContext, useState } from 'react';
import { useFetch, useRefresh, useStatus } from '../../hooks';
import { GroupType, IClientGroup, IFetch, IGroupsResponse } from '../../models';
import { requestBuilder, RotaGroupService } from '../../services';
import { ApplicationContext, endpoints } from '../../utilities';
import { Fetch, FetchError } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { GroupToolbar } from '../Toolbar';
import { ClientList } from './Clients';

const ClientDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { setClientGroup } = useContext(ApplicationContext);

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups(GroupType.CLIENT).groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Clients" groupType={GroupType.CLIENT} showGroupInfo showSelector setGroup={setClientGroup}  />
                <ClientList />
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
        </>
      )}
    />
  )
}

export default ClientDashboard;