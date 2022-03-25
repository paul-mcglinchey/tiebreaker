import { Fragment } from 'react';

import { Fetch, Toolbar } from '..';
import { useFetch, useRefresh } from '../../hooks';
import { IGroupsResponse, IRotaGroup, ToolbarType } from '../../models';
import { IFetch } from '../../models/fetch.model';
import { requestBuilder } from '../../services';
import { endpoints } from '../../utilities';
import { FetchError } from '../Common';
import { GroupPrompter } from '../Groups';
import RotaList from './Rotas/RotaList';

const RotaDashboard = () => {

  const { dependency, refresh } = useRefresh();

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups("rota").groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IRotaGroup>>) => (
        <Fragment>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <Toolbar toolbarTypes={[ToolbarType.RotaGroups]}>Rotas</Toolbar>
                <RotaList />
              </>
            ) : (
              !isLoading && (
                <GroupPrompter href="/rotas/creategroup"/>
              )
            )
          ) : (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          )}
        </Fragment>
      )}
    />
  )
}

export default RotaDashboard;