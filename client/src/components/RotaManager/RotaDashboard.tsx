import { UserGroupIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';

import { Fetch } from '..';
import { useFetch, useRefresh, useStatus } from '../../hooks';
import { GroupType, IGroupsResponse, IRotaGroup, IFetch } from '../../models';
import { requestBuilder, RotaGroupService } from '../../services';
import { ApplicationContext, endpoints } from '../../utilities';
import { FetchError, Prompter } from '../Common';
import { AddGroupModal } from '../Groups';
import { GroupToolbar } from '../Toolbar';
import { RotaList } from './Rotas';

const RotaDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { setRotaGroup } = useContext(ApplicationContext);

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups(GroupType.ROTA).groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Rotas" createGroupAction={toggleAddGroupOpen} groupType={GroupType.ROTA} showSelector setGroup={setRotaGroup} />
                <RotaList />
              </>
            ) : (
              !isLoading && (
                <Prompter title='Create a group to get started' Icon={UserGroupIcon} action={toggleAddGroupOpen} />
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

export default RotaDashboard;