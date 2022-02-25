import { AddSessionForm } from ".";
import { IClientProps } from "../../../models";


const AddSession = ({ client }: IClientProps) => {

  return (
    <div>
      <div className="flex space-x-4">
        <div className="lg:basis-3/5">
          <AddSessionForm client={client} />
        </div>
        <div className="basis-2/5 bg-gray-800 rounded p-3">
          <h1 className="text-xl font-semibold text-gray-400">Supplementary sessions content</h1>
        </div>

      </div>
    </div>
  )
}

export default AddSession;