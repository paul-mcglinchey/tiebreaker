import { memo, useState } from 'react';
import { useGroupService } from '../../hooks';
import { FetchError, Toolbar, SpinnerLoader } from '../Common';
import { GroupModal, GroupPrompter } from '../Groups';
import { RotaModal, RotaList } from '.';

const RotaDashboard = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addRotaOpen, setAddRotaOpen] = useState(false);

  const { count, isLoading, error, refresh } = useGroupService();

  return (
    <>
      {!error && !isLoading ? (
        count > 0 ? (
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
      <GroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
      <RotaModal isOpen={addRotaOpen} close={() => setAddRotaOpen(false)} />
    </>
  )
}

export default memo(RotaDashboard)