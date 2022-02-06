import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Fetch } from "..";
import { endpoints, requestHelper, useFetch } from "../../utilities";
import { AddNewSessionForm } from ".";
import { SquareIconButton } from '../Common';
import { ArrowLeftIcon } from '@heroicons/react/outline';


const NewSession = ({ status, setStatus }) => {

  const { id } = useParams();

  return (
    <div>
      <div className="inline-flex items-center space-x-2 text-white text-2xl font-semibold tracking-wider">
        <Link to="/dashboard">
          <SquareIconButton Icon={ArrowLeftIcon} additionalClasses="h-5 w-5 transform hover:scale-105 transition-all" />
        </Link>
        <Link to="/dashboard">
          <span className="rounded-lg bg-gray-800 px-2 py-1">Clients</span>
        </Link>
        <span> / </span>
        <Fetch
          fetchOutput={useFetch(`${endpoints.clients}/${id}`, requestHelper.requestBuilder("GET"), [])}
          render={({ response, isLoading, errors }) => (
            <span className="text-green-500">
              {response && response.clientName && (
                <span>{response.clientName.firstName} {response.clientName.lastName}</span>
              )}
            </span>
          )}
        />
        <span> / </span>
        <span> Add a session </span>
      </div>
      <AddNewSessionForm client={id} status={status} setStatus={setStatus} />
    </div>
  )
}

export default NewSession;