import { useContext } from 'react';
import { GroupPrompter, Toolbar } from '../..';
import { IRota, ToolbarType } from '../../../models';
import { RotaService, StatusService } from '../../../services';
import { ApplicationContext, StatusContext } from '../../../utilities';
import RotaForm from './RotaForm';

const AddRota = () => {

  const { rotaGroup } = useContext(ApplicationContext);
  const { status, setStatus } = useContext(StatusContext);
  const rotaService = new RotaService(new StatusService(status, setStatus));

  return (
    rotaGroup ? (
      <>
        <Toolbar toolbarTypes={[ToolbarType.RotaGroups]}>Add Rota</Toolbar>
        <div className="flex justify-center">
          <RotaForm handleSubmit={(values: IRota) => rotaService.addRota(values, rotaGroup)} />
        </div>
      </>
    ) : (
      <GroupPrompter href="/rotas/creategroup" />
    )
  )
}

export default AddRota;