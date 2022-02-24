import { Fragment, useState } from 'react';

import { ClientList, Fetch, Toolbar, GroupPrompter } from '.';
import { useFetch } from '../hooks';
import { IFetch } from '../models/fetch.model';
import { requestBuilder } from '../services';
import { endpoints } from '../utilities';

const Dashboard = () => {

  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(!refresh);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestBuilder(), [refresh])}
      render={({ response, error, isLoading }: IFetch) => (
        <Fragment>
          {!isLoading ? (
            response.totalGroups > 0 && !error ? (
              <>
                <Toolbar>Dashboard</Toolbar>
                <ClientList />
              </>
            ) : (
              error ? (
                <div className="text-2xl font-bold tracking-wider text-white w-3/4 text-center mx-auto my-20 px-6 py-6 border-2 border-red-500 rounded-lg align-middle">
                  <span>It seems we ran into a problem fetching your data, </span>
                  <button onClick={() => toggleRefresh()} className="font-bold text-red-300 hover:text-red-500">
                    try again?
                  </button>
                </div>
              ) : (
                <GroupPrompter />
              )
            )
          ) : (
            <div className="w-96 h-6 bg-gray-300 flex">
              <div className={`w-full h-full bg-blue-500 origin-left translate scale-x-0 transition-transform ${isLoading && "scale-x-50"}`}></div>
            </div>
          )}
        </Fragment>
      )}
    />
  )
}

export default Dashboard;