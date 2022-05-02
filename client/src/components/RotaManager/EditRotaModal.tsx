import { IRota } from "../../models";
import { Button, Modal } from "../Common";
import { RotaForm } from "..";

interface IEditRotaProps {
  isOpen: boolean,
  close: () => void,
  rota?: IRota
}

const EditRotaModal = ({ isOpen, close, rota }: IEditRotaProps) => {
  return (
    <Modal 
      title="Edit rota" 
      description="This dialog can be used to edit an existing rota" 
      isOpen={isOpen} 
      close={() => close()}
    >
      <RotaForm 
        rota={rota} 
        submitButton={<Button content='Update rota' />} 
        additionalSubmissionActions={[close]}
      />
    </Modal>
  ) 
}

export default EditRotaModal;