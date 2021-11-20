import { PlusIcon, UsersIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';

const AddNewButton = (props) => {
    return (
        <div className="relative inline-block text-block">
            <div>
                <button onClick={() => props.toggleNewClientActive()} type="button" className="inline-flex justify-center w-full rounded-md border border-purple-300 shadow-sm sm:px-4 px-2 py-2 bg-white text-sm font-medium text-purple-500 hover:bg-purple-500 hover:text-white transition-all focus:outline-none focus:ring-inset focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {props.newClientActive &&
                        <Fragment>
                            <span className="sm:block hidden">
                                {props.newClientActive ? "View Clients" : "Add New Client"}
                            </span>
                            <UsersIcon className="sm:-mr-1 sm:ml-2 h-5 w-5" aria-hidden="true" />
                        </Fragment>
                    }
                    {!props.newClientActive &&
                        <Fragment>
                            <span className="sm:block hidden">
                                {props.newClientActive ? "View Clients" : "Add New Client"}
                            </span>
                            <PlusIcon className="sm:-mr-1 sm:ml-2 h-5 w-5" aria-hidden="true" />
                        </Fragment>
                    }
                </button>
            </div>
        </div>
    )
}

export default AddNewButton;