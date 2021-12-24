import { SpinnerIcon } from '..';

const SubmitButton = ({ status = { isLoading: false, success: '', error: '' }, content = 'Submit' }) => {
  return (
    <button className="px-3 py-1 border border-gray-200 text-white hover:text-gray-900 bg-transparent hover:bg-white transition-all font-bold rounded flex space-x-2 items-center" type="submit">
      {status.isLoading && (
        <SpinnerIcon className="w-5 h-5 text-white" />
      )}
      <div>
        {content}
      </div>
    </button>
  )
}

export default SubmitButton;