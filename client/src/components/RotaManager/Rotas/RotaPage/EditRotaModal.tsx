import { useContext } from "react";
import { IRota } from "../../../../models";
import { RotaService, StatusService } from "../../../../services";
import { StatusContext } from "../../../../utilities";
import { Modal } from "../../../Common";
import { RotaForm } from "..";

interface IEditRotaProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
}

const EditRotaModal = ({ modalOpen, toggleModalOpen, rota }: IEditRotaProps) => {

  const { status, setStatus } = useContext(StatusContext);
  const rotaService = new RotaService(new StatusService(status, setStatus));

  return (
    <Modal title="Edit rota" modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
      <RotaForm rota={rota} handleSubmit={(values: IRota) => rotaService.updateRota(values, rota)}/>
    </Modal>
  ) 
}

export default EditRotaModal;