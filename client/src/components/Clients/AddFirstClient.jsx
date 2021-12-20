import { UserAddIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';

const AddFirstClient = () => {
  return (
    <Link to='/addclients' className="flex justify-center">
      <div className="flex bg-gray-800 text-3xl sm:text-5xl text-white font-extrabold p-4 rounded-lg transform hover:scale-105 transition-all text-center mt-32">
        <div className="inline-block">
          Add your first client
          <span className="inline-block align-middle">
            <UserAddIcon className="h-10 w-10 lg:h-12 lg:w-12 ml-2 md:ml-4 mb-2" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default AddFirstClient;