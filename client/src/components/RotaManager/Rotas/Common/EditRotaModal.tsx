import { IRota } from "../../../../models";
import { RotaService } from "../../../../services";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";
import { useStatus } from "../../../../hooks";

interface IEditRotaProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
}

const EditRotaModal = ({ modalOpen, toggleModalOpen, rota }: IEditRotaProps) => {

  const { statusService } = useStatus();
  const rotaService = new RotaService(statusService);

  return (
    <Modal title="Edit rota" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <RotaForm 
        rota={rota} 
        submitButton={<Button content='Update rota' />} 
        handleSubmit={(values: IRota) => {
          rotaService.updateRota(values, rota);
          toggleModalOpen();
        }}/>
    </Modal>
  ) 
}

export default EditRotaModal;