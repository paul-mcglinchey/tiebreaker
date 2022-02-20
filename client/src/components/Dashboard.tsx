import { useContext } from 'react';

import { ClientList, Fetch, Toolbar, GroupPrompter } from '.';
import { useFetch } from '../hooks';
import { requestBuilder } from '../services';
import { endpoints } from '../utilities';
import { ApplicationContext } from '../utilities/contexts';

const Dashboard = () => {

  const { userGroup, setUserGroup, status } = useContext(ApplicationContext);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groupcount, requestBuilder())}
      render={({ response, isLoading }) => (
        <>
          {Number.isInteger(response.count) && (
            response.count > 0 ? (
              <>
                {status.isFetchLoading = isLoading}
                <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} status={status}>Dashboard</Toolbar>
                <ClientList
                  userGroup={userGroup}
                />
              </>
            ) : (
              <GroupPrompter />
            )
          )}
        </>
      )}
    />
  )
}

export default Dashboard;