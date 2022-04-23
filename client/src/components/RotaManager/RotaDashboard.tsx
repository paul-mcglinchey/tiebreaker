import { useContext, useState } from 'react';

import { Fetch } from '..';
import { useFetch, useGroupService, useRefresh, useRequestBuilder, useRotaService } from '../../hooks';
import { GroupType, IGroupsResponse, IRotaGroup, IFetch } from '../../models';
import { ApplicationContext, endpoints } from '../../utilities';
import { FetchError, GroupToolbar } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddRotaModal, RotaList } from './Rotas';

const RotaDashboard = () => {

  const { dependency, refresh } = useRefresh();
  const { setGroupId } = useContext(ApplicationContext);
  const { requestBuilder } = useRequestBuilder();

  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addRotaOpen, setAddRotaOpen] = useState(false);
  const toggleAddRotaOpen = () => setAddRotaOpen(!addRotaOpen);

  const groupService = useGroupService(GroupType.ROTA, refresh);
  const rotaService = useRotaService(refresh);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups(GroupType.ROTA).groups, requestBuilder(), [dependency], false)}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <GroupToolbar title="Rotas" addRotaAction={toggleAddRotaOpen} groupType={GroupType.ROTA} showSelector setGroupId={setGroupId} />
                <RotaList dependency={dependency} refresh={refresh} />
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
          <AddRotaModal addRotaOpen={addRotaOpen} toggleAddRotaOpen={toggleAddRotaOpen} rotaService={rotaService} />
        </>
      )}
    />
  )
}

export default RotaDashboard;