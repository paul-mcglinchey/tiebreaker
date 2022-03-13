import { Fetch, GroupCard, GroupPrompter, SpinnerIcon } from '..';
import { useFetch } from '../../hooks';
import { IGroup, IListResponse } from '../../models';
import { IFetch } from '../../models/fetch.model';
import { requestBuilder } from '../../services';
import { endpoints } from '../../utilities';

const Groups = () => {

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestBuilder())}
      render={({ response, isLoading }: IFetch<IListResponse<IGroup>>) => (
        isLoading ? (
          <div className="flex justify-center py-10">
            <SpinnerIcon className="text-white h-12 w-12" />
          </div>
        ) : (
          response && response.count > 0 ? (
            <div className="flex flex-wrap -m-2 mb-2">
              {response.list.map((g: IGroup) => (
                <GroupCard g={g} key={g._id} />
              ))}
            </div>
          ) : (
            setTimeout(() => {
              return (
                <GroupPrompter />
              )
            }, 500)
          )
        )
      )}
    />
  )
}

export default Groups;