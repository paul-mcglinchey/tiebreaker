import { operationsTabs } from "./Common/tabs.config";
import { classNames } from "../../../utilities";
import { SmartLink } from "../..";

const OperationsTabs = () => {

  return (
    <div className="flex my-6">
      <div className="flex flex-shrink space-x-4">
        {operationsTabs.map((o, i) => (
          <SmartLink 
            key={i} 
            to={o.href} 
            className={match => classNames(
              "text-gray-200 px-3 py-1 rounded font-semibold tracking-wider text-lg", 
              "hover:bg-gray-400/20", 
              match && "!text-green-500 bg-gray-800"
            )}
          >
            {o.content}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export default OperationsTabs;