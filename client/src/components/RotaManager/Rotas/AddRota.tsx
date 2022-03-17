import { AddRotaForm } from '.';
import { Toolbar } from '../..';
import { ToolbarType } from '../../../models';

const AddRota = () => {

  return (
    <>
      <Toolbar toolbarTypes={[ToolbarType.Rotas]}>Add Rota</Toolbar>
      <div className="flex justify-center lg:space-x-4">
        <AddRotaForm />
      </div>
    </>
  )
}

export default AddRota;