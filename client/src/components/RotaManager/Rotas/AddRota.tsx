import { useContext } from 'react';
import { GroupType, IRota } from '../../../models';
import { RotaService } from '../../../services';
import { ApplicationContext } from '../../../utilities';
import { GroupToolbar } from '../../Toolbar';
import { RotaForm } from '.';
import { useStatus } from '../../../hooks';

const AddRota = () => {

  const { groupId, setGroupId } = useContext(ApplicationContext);
  const { statusService } = useStatus();
  const rotaService = new RotaService(statusService);

  return (
    <>
      <GroupToolbar title="Add rota" groupType={GroupType.ROTA} showSelector setGroupId={setGroupId} />
      <div className="flex justify-center">
        <RotaForm handleSubmit={(values: IRota) => rotaService.addRota(values, groupId)} />
      </div>
    </>
  )
}

export default AddRota;