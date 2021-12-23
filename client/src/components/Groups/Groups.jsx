import { Fragment, useState } from 'react';
import { Fetch, GroupCard, GroupPrompter, Toolbar } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';

const Groups = ({ userGroup, setUserGroup }) => {
  const [status, setStatus] = useState({
    isLoading: false,
    success: '',
    error: ''
  });

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"), [status.success])}
      render={({ response, isLoading }) => (
        <Fragment>
          <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} status={status}>
            Group Management
          </Toolbar>
          {response && response.groups && (
            response.groups.length > 0 ? (
              <div className="flex flex-wrap -m-2 mb-2">
                {response.groups.map(g => (
                  <GroupCard g={g} key={g._id} setStatus={setStatus}/>
                ))}
              </div>
            ) : (
              <div>
                <GroupPrompter />
              </div>
            )
          )}
        </Fragment>
      )}
    />
  )
}

export default Groups;