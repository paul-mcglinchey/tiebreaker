import { CheckIcon } from "@heroicons/react/solid";
import { SpinnerIcon } from ".."

const StatusHeader = ({ isLoading, success = '', children }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-current font-bold text-2xl sm:text-3xl tracking-wide">
        {children}
      </div>
      <div>
        {isLoading && <SpinnerIcon className="h-6 w-6 text-green-500" />}
        {success && (
          <div className="hidden xl:flex ml-4 space-x-2 font-medium text-green-500 border border-current rounded px-2 py-1">
            <div>{success}</div>
            <CheckIcon className="h-6 w-6"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusHeader;