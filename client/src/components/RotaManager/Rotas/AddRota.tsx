import { useContext } from 'react';
import { GroupType, IRota } from '../../../models';
import { RotaService, StatusService } from '../../../services';
import { ApplicationContext, StatusContext } from '../../../utilities';
import { GroupToolbar } from '../../Toolbar';
import { RotaForm } from '.';

const AddRota = () => {

  const { rotaGroup, setRotaGroup } = useContext(ApplicationContext);
  const { status, setStatus } = useContext(StatusContext);
  const rotaService = new RotaService(new StatusService(status, setStatus));

  return (
    <>
      <GroupToolbar title="Add rota" groupType={GroupType.ROTA} showSelector setGroup={setRotaGroup} />
      <div className="flex justify-center">
        <RotaForm handleSubmit={(values: IRota) => rotaService.addRota(values, rotaGroup)} />
      </div>
    </>
  )
}

export default AddRota;