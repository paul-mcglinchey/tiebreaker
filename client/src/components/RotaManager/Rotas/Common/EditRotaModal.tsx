import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";
import { useGroupService, useRotaService } from "../../../../hooks";

interface IEditRotaProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
}

const EditRotaModal = ({ modalOpen, toggleModalOpen, rota }: IEditRotaProps) => {

  const rotaService = useRotaService()
  const { groupId } = useGroupService()

  return (
    <Modal title="Edit rota" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <RotaForm 
        rota={rota} 
        submitButton={<Button content='Update rota' />} 
        handleSubmit={(values: IRota) => {
          rotaService.updateRota(values, rota?._id, groupId);
          toggleModalOpen();
        }}/>
    </Modal>
  ) 
}

export default EditRotaModal;