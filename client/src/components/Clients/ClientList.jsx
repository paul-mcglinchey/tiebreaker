import { Fetch, ClientEntry, AddFirstClient } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';

const ClientList = (props) => {

  const { userGroup, setClientsLoading } = props;

  // const [addSessionOpen, setAddSessionOpen] = useState(false);
  // const toggleAddSession = () => setAddSessionOpen(!addSessionOpen);

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}?page=${0}&groupname=${userGroup}`, requestHelper.requestBuilder("GET"))}
      render={({ response, error, isLoading }) => (
        <div className="border-2 border-blue-900 rounded-lg px-2 flex flex-col space-y-0 pb-2">
          {setClientsLoading(isLoading)}
          {response && response.clients && (
            response.clients.length > 0 ? (
              response.clients.map((c) => {
                return (
                  <ClientEntry c={c} key={c._id} userGroup={userGroup} />
                )
              })
            ) : (
              <AddFirstClient />
            )
          )}
        </div>
      )}
    />
  )
}

export default ClientList;