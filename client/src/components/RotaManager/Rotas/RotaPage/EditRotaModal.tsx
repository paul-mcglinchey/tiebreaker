import { ButtonType, IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import AddRotaForm from "../AddRotaForm";

interface IEditRotaProps {
  modalOpen: boolean,
  toggleModalOpen: () => void,
  rota?: IRota
}

const EditRotaModal = ({ modalOpen, toggleModalOpen, rota }: IEditRotaProps) => {
  return (
    <Modal modalOpen={modalOpen}>
      <AddRotaForm rota={rota} />
      <Button buttonType={ButtonType.Cancel} action={() => toggleModalOpen()}/>
    </Modal>
  ) 
}

export default EditRotaModal;