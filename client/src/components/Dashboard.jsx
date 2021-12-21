import { Fragment, React } from 'react';

import { ClientList, Fetch, Toolbar, SpinnerIcon, GroupPrompter } from '.';
import { useFetch, endpoints, requestHelper } from '../utilities';

const Dashboard = ({ userGroup, setUserGroup }) => {

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groupcount, requestHelper.requestBuilder("GET"))}
      render={({ response, isLoading }) => (
        <div>
          {isLoading && <SpinnerIcon className="h-8 w-8 text-white" />}
          {Number.isInteger(response.count) && (
            response.count > 0 ? (
              <Fragment>
                <Toolbar
                  userGroup={userGroup}
                  setUserGroup={setUserGroup}
                >
                  Dashboard
                </Toolbar>
                <ClientList
                  userGroup={userGroup}
                />
              </Fragment>
            ) : (
                <GroupPrompter />
            )
          )}
        </div>
      )}
    />
  )
}

export default Dashboard;