import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";
import { useGroupService, useRotaService } from "../../../../hooks";

interface IAddRotaProps {
  addRotaOpen: boolean
  toggleAddRotaOpen: () => void
}

const EditRotaModal = ({ addRotaOpen, toggleAddRotaOpen }: IAddRotaProps) => {

  const { groupId } = useGroupService()
  const { addRota } = useRotaService()

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