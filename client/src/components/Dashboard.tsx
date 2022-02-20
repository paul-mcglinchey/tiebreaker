import { Fragment, useContext } from 'react';

import { ClientList, Fetch, Toolbar, GroupPrompter } from '.';
import { useFetch } from '../hooks';
import { requestBuilder } from '../services';
import { endpoints } from '../utilities';
import { ApplicationContext } from '../utilities/contexts';

const Dashboard = () => {

  const { userGroup, status } = useContext(ApplicationContext);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groupcount, requestBuilder(), [])}
      render={({ response, isLoading }: any) => (
        <Fragment>
          {Number.isInteger(response.count) && (
            response.count > 0 ? (
              <>
                {status.isFetchLoading = isLoading}
                <Toolbar>Dashboard</Toolbar>
                <ClientList
                  userGroup={userGroup}
                />
              </>
            ) : (
              <GroupPrompter />
            )
          )}
        </Fragment>
      )}
    />
  )
}

export default Dashboard;