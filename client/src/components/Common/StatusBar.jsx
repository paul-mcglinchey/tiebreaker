import { CheckIcon } from "@heroicons/react/solid";

const StatusBar = ({ success = '' }) => {
  return (
    <div className="flex xl:hidden mb-4">
      {success && (
        <div className="flex flex-1 justify-center items-center text-green-500 border-2 border-current rounded py-2">
          <div>
            {success}
          </div>
          <CheckIcon className="h-6 w-6 text-current" />
        </div>
      )}
    </div>
  )
}

export default StatusBar;