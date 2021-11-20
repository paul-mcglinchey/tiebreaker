import { PlusIcon } from '@heroicons/react/solid'

const AddNewButton = (props) => {
    return (
        <div className="relative inline-block text-block">
            <div>
                <button onClick={() => props.toggleNewClientActive()} type="button" className="inline-flex justify-center w-full rounded-md border border-purple-300 shadow-sm sm:px-4 px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <span className="sm:block hidden">Add New Client</span>
                    <PlusIcon className="sm:-mr-1 sm:ml-2 h-5 w-5 text-purple-500" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

export default AddNewButton;