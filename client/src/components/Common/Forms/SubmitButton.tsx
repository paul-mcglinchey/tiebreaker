import { SpinnerIcon } from '..';
import { IProps } from '../../../models';
import { combineClassNames } from '../../../services';

const SubmitButton = ({ status = [], content = 'Submit' }: IProps) => {
  return (
    <button className={
      combineClassNames(
        "px-3 py-1 border border-gray-300 text-gray-300 hover:text-gray-900", 
        "bg-transparent hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-900", 
        "transition-all font-bold rounded flex space-x-2 items-center"
      )} 
      type="submit">
      {status && status[status.length - 1]?.isLoading && (
        <SpinnerIcon className="w-5 h-5 text-white" />
      )}
      <div>
        {content}
      </div>
    </button>
  )
}

export default SubmitButton;