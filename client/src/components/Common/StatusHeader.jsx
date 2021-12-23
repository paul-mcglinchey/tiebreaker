import { BanIcon, CheckIcon } from "@heroicons/react/solid";
import { SpinnerIcon } from ".."

const StatusHeader = ({ status = { isLoading: false, success: '', error: '' }, children }) => {
  
  const { isLoading, success, error } = status;

  return (
    <div className="flex items-center space-x-2">
      <div className="text-current font-bold text-2xl sm:text-3xl tracking-wide">
        {children}
      </div>
      <div>
        {isLoading && <SpinnerIcon className="h-6 w-6 text-green-500" />}
        {(success || error) && (
          <div className={`hidden lg:flex ml-4 space-x-2 font-medium ${success && 'text-green-500'} ${error && 'text-red-500'} border border-current rounded px-2 py-1`}>
            <div>{success || error}</div>
            {success && <CheckIcon className="h-6 w-6"/> }
            {error && <BanIcon className="h-6 w-6"/> }
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusHeader;