import { IRota } from "../../../../models";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";

interface IAddRotaProps {
  isOpen: boolean
  close: () => void
  rota?: IRota
}

const EditRotaModal = ({ isOpen, close, rota }: IAddRotaProps) => {
  return (
    <Modal 
      title="Add rota"
      description="This dialog can be used to create a new rota" 
      isOpen={isOpen} 
      close={close}
    >
      <RotaForm
        rota={rota}
        submitButton={<Button content='Add rota' />}
      />
    </Modal>
  ) 
}

export default EditRotaModal;