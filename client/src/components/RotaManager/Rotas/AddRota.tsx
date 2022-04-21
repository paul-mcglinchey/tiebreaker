import { useContext } from 'react';
import { GroupType, IRota } from '../../../models';
import { ApplicationContext } from '../../../utilities';
import { GroupToolbar } from '../../Toolbar';
import { RotaForm } from '.';
import { useRotaService } from '../../../hooks';

interface IAddRotaProps {
  refresh?: () => void
}

const AddRota = ({ refresh }: IAddRotaProps) => {

  const { groupId, setGroupId } = useContext(ApplicationContext);
  const rotaService = useRotaService(refresh);

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