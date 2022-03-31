import { useContext } from 'react';
import { AddRotaForm } from '.';
import { GroupPrompter, Toolbar } from '../..';
import { ToolbarType } from '../../../models';
import { ApplicationContext } from '../../../utilities';

const AddRota = () => {

  const { rotaGroup } = useContext(ApplicationContext);

  return (
    rotaGroup ? (
      <>
        <Toolbar toolbarTypes={[ToolbarType.RotaGroups]}>Add Rota</Toolbar>
        <div className="flex justify-center lg:space-x-4">
          <AddRotaForm />
        </div>
      </>
    ) : (
      <GroupPrompter href="/rotas/creategroup" />
    )
  )
}

export default AddRota;