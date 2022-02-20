import { Fragment, useContext } from 'react';
import { Fetch, GroupCard, GroupPrompter, Toolbar } from '..';
import { useFetch } from '../../hooks';
import { IGroup } from '../../models';
import { requestBuilder } from '../../services';
import { endpoints } from '../../utilities';
import { ApplicationContext } from '../../utilities/contexts';

const Groups = () => {

  const { status, setStatus } = useContext(ApplicationContext);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestBuilder(), [status])}
      render={({ response, isLoading }: any) => (
        <Fragment>
          {status.isFetchLoading = isLoading}
          <Toolbar>
            Group Management
          </Toolbar>
          {response && response.groups && (
            response.groups.length > 0 ? (
              <div className="flex flex-wrap -m-2 mb-2">
                {response.groups.map((g: IGroup) => (
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