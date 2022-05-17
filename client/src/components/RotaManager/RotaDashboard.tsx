import { memo, useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, Toolbar, SpinnerLoader } from '../Common';
import { AddGroupModal, GroupPrompter } from '../Groups';
import { AddRotaModal, RotaList } from '.';

const RotaDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addRotaOpen, setAddRotaOpen] = useState(false);

  const { getCount, isLoading, error, refresh } = useGroupService();

  return (
    <>
      {!error && !isLoading ? (
        getCount() > 0 ? (
          <>
            <Toolbar title="Rotas" addRotaAction={() => setAddRotaOpen(true)} />
            <RotaList />
          </>
        ) : (
          <GroupPrompter action={() => setAddGroupOpen(true)} />
        )
      ) : (
        isLoading ? (
          <SpinnerLoader />
        ) : (
          <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
        )
      )}
      <AddGroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
      <AddRotaModal isOpen={addRotaOpen} close={() => setAddRotaOpen(false)} />
    </>
  )
}

export default memo(RotaDashboard)