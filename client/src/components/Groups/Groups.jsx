import { Fragment } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { fetchHooks } from '../../hooks';
import { requestHelper } from '../../helpers';
import endpoints from '../../config/endpoints';
import Fetch from '../Fetch/Fetch';
import GroupCard from "./GroupCard";

const Groups = (props) => {

  const location = useLocation();

  return (
    <Fetch
      fetchOutput={fetchHooks.useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
      render={({ response, error, isLoading }) => (
        <Fragment>
          <div className="text-white">
            {isLoading && <span className="text-6xl font-extrabold tracking-wide">LOADING</span>}
            {response && response.groups && (
              response.groups.length > 0 ? (
                <div className="flex flex-wrap">
                  {response.groups.map(g => (
                    <GroupCard key={g._id} g={g} />
                  ))}
                </div>
              ) : (
                <Navigate to="/creategroup" state={{ from: location }} />
              )
            )}
          </div>
        </Fragment>
      )}
    />
  )
}

export default Groups;