import { BanIcon, CheckIcon } from "@heroicons/react/solid";

const StatusBar = ({ status = { isLoading: false, success: '', error: '' } }) => {

  const { success, error } = status;

  return (
    <div className="flex lg:hidden mb-4">
      {(success || error) && (
        <div className={`flex flex-1 space-x-2 justify-center items-center ${success && 'text-green-500'} ${error && 'text-red-500'} border-2 border-current rounded py-2`}>
          <div>
            {success || error}
          </div>
          {success && <CheckIcon className="h-6 w-6 text-current" />}
          {error && <BanIcon className="h-6 w-6 text-current" />}
        </div>
      )}
    </div>
  )
}

export default StatusBar;