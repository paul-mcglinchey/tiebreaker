import { UserGroupIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';

import { Fetch } from '..';
import { useFetch, useRefresh, useStatus } from '../../hooks';
import { GroupType, IGroupsResponse, IRotaGroup, IFetch } from '../../models';
import { requestBuilder, RotaGroupService, RotaService } from '../../services';
import { ApplicationContext, endpoints } from '../../utilities';
import { FetchError, Prompter } from '../Common';
import { AddGroupModal } from '../Groups';
import { GroupToolbar } from '../Toolbar';
import { AddRotaModal, RotaList } from './Rotas';

const RotaDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { setGroupId } = useContext(ApplicationContext);

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addRotaOpen, setAddRotaOpen] = useState(false);
  const toggleAddRotaOpen = () => setAddRotaOpen(!addRotaOpen);

  const { statusService } = useStatus();
  const groupService = new RotaGroupService(statusService, refresh);
  const rotaService = new RotaService(statusService, refresh);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups(GroupType.ROTA).groups, requestBuilder(), [dependency], false)}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Rotas" addRotaAction={toggleAddRotaOpen} groupType={GroupType.ROTA} showSelector setGroupId={setGroupId} />
                <RotaList dependency={dependency} />
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
          <AddRotaModal addRotaOpen={addRotaOpen} toggleAddRotaOpen={toggleAddRotaOpen} rotaService={rotaService} />
        </>
      )}
    />
  )
}

export default RotaDashboard;