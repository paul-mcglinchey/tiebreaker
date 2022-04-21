import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";
import { useRotaService } from "../../../../hooks";
import { useContext } from "react";
import { ApplicationContext } from "../../../../utilities";

interface IEditRotaProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
  refresh?: () => void
}

const EditRotaModal = ({ modalOpen, toggleModalOpen, rota, refresh }: IEditRotaProps) => {

  const rotaService = useRotaService(refresh)
  const { groupId } = useContext(ApplicationContext)

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