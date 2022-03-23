import { Fragment, useContext, useState } from 'react';
import { useFetch } from '../../hooks';
import { IClientGroup, IFetch, IGroupsResponse, ToolbarType } from '../../models';
import { requestBuilder } from '../../services';
import { endpoints, StatusContext } from '../../utilities';
import { Fetch, SpinnerIcon, Toolbar } from '../Common';
import { GroupPrompter } from '../Groups';
import { ClientList } from './Clients';

const ClientDashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(!refresh);

  const { progress, setProgress } = useContext(StatusContext);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder(), [refresh], setProgress)}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
        <Fragment>
          {response && response.count > 0 && !error ? (
            <>
              {progress >= 100 && (
                <>
                  <Toolbar toolbarTypes={[ToolbarType.ClientGroups]}>Clients</Toolbar>
                  <ClientList />
                </>
              )}
            </>
          ) : (
            error ? (
              <div className="text-lg md:text-2xl font-semibold md:font-bold tracking-wider text-white md:w-3/4 text-center mx-auto my-20 p-2 border-2 border-red-500 rounded-lg align-middle">
                <div className="flex-col">
                  <div className="flex justify-between text-left text-base font-normal text-gray-500">
                    <span>
                      {error}
                    </span>
                    {isLoading && (
                      <SpinnerIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="md:px-4 py-4">
                    <span>We ran into a problem fetching your data, </span>
                    <button onClick={() => toggleRefresh()} className="font-bold text-red-300 hover:text-red-500">
                      try again?
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              isLoading ? (
                <SpinnerIcon className="w-6 h-6" />
              ) : (
                <GroupPrompter href="/clients/creategroup" />
              )
            ))}
        </Fragment>
      )}
    />
  )
}

export default ClientDashboard;