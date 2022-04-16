import { IRota } from "../../../../models";
import { IRotaService } from "../../../../services";
import { Button, Modal } from "../../../Common";
import { RotaForm } from "..";
import { useContext } from "react";
import { ApplicationContext } from "../../../../utilities";

interface IAddRotaProps {
  addRotaOpen: boolean,
  toggleAddRotaOpen: () => void,
  rotaService: IRotaService
}

const EditRotaModal = ({ addRotaOpen, toggleAddRotaOpen, rotaService }: IAddRotaProps) => {

  const { groupId } = useContext(ApplicationContext);

  return (
    <Modal title="Add rota" modalOpen={addRotaOpen} toggleModalOpen={toggleAddRotaOpen}>
      <RotaForm
        submitButton={<Button content='Add rota' />} 
        handleSubmit={(values: IRota) => {
          rotaService.addRota(values, groupId);
          toggleAddRotaOpen();
        }}/>
    </Modal>
  ) 
}

export default EditRotaModal;