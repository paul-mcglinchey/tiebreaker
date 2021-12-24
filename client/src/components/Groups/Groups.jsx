import { Fragment } from 'react';
import { Fetch, GroupCard, GroupPrompter, Toolbar } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';

const Groups = ({ userGroup, setUserGroup, status, setStatus }) => {

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"), [status])}
      render={({ response, isLoading }) => (
        <Fragment>
          {status.isFetchLoading = isLoading}
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