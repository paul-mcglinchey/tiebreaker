import { Fetch, ClientEntry, SpinnerIcon, ClientPrompter } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';

const ClientList = ({ userGroup }) => {

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}?page=${0}&groupname=${userGroup && userGroup.groupname}`, requestHelper.requestBuilder("GET"))}
      render={({ response, error, isLoading }) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2">
          {isLoading && (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          )}
          {response && response.clients && (
            response.clients.length > 0 ? (
              response.clients.map((c) => {
                return (
                  <ClientEntry c={c} key={c._id} userGroup={userGroup} />
                )
              })
            ) : (
              <ClientPrompter />
            )
          )}
        </div>
      )
      }
    />
  )
}

export default ClientList;