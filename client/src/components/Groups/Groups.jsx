import { Fragment } from 'react';

import { Fetch, GroupCard, GroupPrompter, SpinnerIcon } from '..';

import { endpoints, useFetch, requestHelper } from '../../utilities';

const Groups = () => {
  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
      render={({ response, isLoading }) => (
        <Fragment>
          {isLoading && <SpinnerIcon className="w-10 h-10 text-white" />}
          {response && Array.isArray(response) && (
            response.length > 0 ? (
              <div className="flex flex-wrap">
                {response.map(g => (
                  <GroupCard g={g} key={g._id} />
                ))}
              </div>
            ) : (
              <GroupPrompter />
            )
          )}
        </Fragment>
      )}
    />
  )
}

export default Groups;