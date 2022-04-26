import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";
import { useGroupService } from "../../../../hooks";

interface IAddRotaProps {
  addRotaOpen: boolean,
  toggleAddRotaOpen: () => void,
  addRota: (values: IRota, groupId: string | undefined) => void
}

const EditRotaModal = ({ addRotaOpen, toggleAddRotaOpen, addRota }: IAddRotaProps) => {

  const { groupId } = useGroupService()

  return (
    <Modal title="Add rota" modalOpen={addRotaOpen} toggleModalOpen={toggleAddRotaOpen}>
      <RotaForm
        submitButton={<Button content='Add rota' />} 
        handleSubmit={(values: IRota) => {
          addRota(values, groupId);
          toggleAddRotaOpen();
        }}/>
    </Modal>
  ) 
}

export default EditRotaModal;