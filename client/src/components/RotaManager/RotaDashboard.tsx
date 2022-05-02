import { memo, useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, GroupToolbar } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddRotaModal, RotaList } from './Rotas';

const RotaDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addRotaOpen, setAddRotaOpen] = useState(false);

  const { getCount, isLoading, error, refresh } = useGroupService();

  return (
    <>
      {!error ? (
        getCount() > 0 ? (
          <>
            <GroupToolbar title="Rotas" addRotaAction={() => setAddRotaOpen(true)} showSelector />
            <RotaList />
          </>
        ) : (
          !isLoading && (
            <GroupPrompter action={() => setAddGroupOpen(true)} />
          )
        )
      ) : (
        <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
      )}
      <AddGroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
      <AddRotaModal isOpen={addRotaOpen} close={() => setAddRotaOpen(false)} />
    </>
  )
}

export default memo(RotaDashboard)