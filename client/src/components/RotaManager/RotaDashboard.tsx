import { memo, useState } from 'react';
import { useAuthService } from '../../hooks';
import { Prompter, Toolbar } from '../Common';
import { RotaModal, RotaList } from '.';
import { Application, Permission } from '../../enums';

const RotaDashboard = () => {
  const [addRotaOpen, setAddRotaOpen] = useState(false);

  const { hasPermission } = useAuthService()

  return (
    <>
      <>
        <Toolbar title="Rotas" addRotaAction={hasPermission(Application.RotaManager, Permission.AddEditDeleteRotas) ? () => setAddRotaOpen(true) : undefined} />
        {hasPermission(Application.RotaManager, Permission.ViewRotas) ? (
          <RotaList />
        ) : (
          <Prompter title="You don't have access to view rotas in this group" />
        )}
      </>
      <RotaModal isOpen={addRotaOpen} close={() => setAddRotaOpen(false)} />
    </>
  )
}

export default memo(RotaDashboard)