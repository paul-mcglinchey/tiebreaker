import { memo, useState } from 'react';
import { useGroupService, useRotaService } from '../../hooks';
import { FetchError, GroupToolbar } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddRotaModal, RotaList } from './Rotas';

const RotaDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const toggleAddGroupOpen = () => setAddGroupOpen(!addGroupOpen);

  const [addRotaOpen, setAddRotaOpen] = useState(false);
  const toggleAddRotaOpen = () => setAddRotaOpen(!addRotaOpen);

  const { getCount, isLoading, error, addGroup } = useGroupService();
  const { addRota, refresh } = useRotaService();

  return (
    <>
      {!error ? (
        getCount() > 0 ? (
          <>
            <GroupToolbar title="Rotas" addRotaAction={toggleAddRotaOpen} showSelector />
            <RotaList />
          </>
        ) : (
          !isLoading && (
            <GroupPrompter action={toggleAddGroupOpen} />
          )
        )
      ) : (
        <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
      )}
      <AddGroupModal addGroupOpen={addGroupOpen} toggleAddGroupOpen={toggleAddGroupOpen} addGroup={addGroup} />
      <AddRotaModal addRotaOpen={addRotaOpen} toggleAddRotaOpen={toggleAddRotaOpen} addRota={addRota} />
    </>
  )
}

export default memo(RotaDashboard)