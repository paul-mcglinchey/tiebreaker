import { useFetch, useRefresh } from '../../hooks';
import { IClientGroup, IFetch, IGroupsResponse, ToolbarType } from '../../models';
import { requestBuilder } from '../../services';
import { endpoints } from '../../utilities';
import { Fetch, FetchError, Toolbar } from '../Common';
import { GroupPrompter } from '../Groups';
import { ClientList } from './Clients';

const ClientDashboard = () => {

  const { dependency, refresh } = useRefresh();

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups("client").groups, requestBuilder(), [dependency])}
      render={({ response, error, isLoading }: IFetch<IGroupsResponse<IClientGroup>>) => (
        <>
          {!error ? (
            response && response.count > 0 ? (
              <>
                <Toolbar toolbarTypes={[ToolbarType.ClientGroups]}>Clients</Toolbar>
                <ClientList />
              </>
            ) : (
              !isLoading && (
                <GroupPrompter href="/clients/creategroup" />
              )
            )
          ) : (
            <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
          )}
        </>
      )}
    />
  )
}

export default ClientDashboard;