import { useEffect, useState } from "react";
import { useRefresh, useRequestBuilder, useStateCallback } from "../../hooks";
import { ButtonType, IChanges, IDefaultGrouplistResponse, IGroupList, IGrouplistResponse, IGroupListValue } from "../../models";
import { endpoints } from "../../utilities";
import { Button } from "../Common";
import { Toolbar } from "../Toolbar";
import { AddListItem, ListItem } from "./Common";

const AdminPanel = () => {

  const [defaultGrouplists, setDefaultGrouplists] = useStateCallback<IGrouplistResponse>({} as IGrouplistResponse);
  const [changes, setChanges] = useState<IChanges>({ deletions: 0, edits: 0, additions: 0 })
  const { dependency, refresh } = useRefresh();

  const { requestBuilder } = useRequestBuilder();

  useEffect(() => {
    let componentIsMounted = true;

    const _fetch = () => {
      fetch(endpoints.defaultgrouplists, requestBuilder())
        .then(res => res.json())
        .then((json: IDefaultGrouplistResponse) => {
          componentIsMounted && setDefaultGrouplists(json.defaultLists);
        })
        .catch(err => console.error(err));
    }

    componentIsMounted && _fetch();

    return () => {
      componentIsMounted = false;
    }
  }, [dependency])

  const updateDefaultLists = (lists: IGrouplistResponse) => {
    fetch(endpoints.defaultgrouplists, requestBuilder("PUT", undefined, lists))
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));


    setChanges({ deletions: 0, edits: 0, additions: 0 });
    refresh();
  }

  return (
    <div>
      <Toolbar title="Admin panel" />
      <div>
        <div className="flex flex-col space-y-2 text-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-wide text-blue-400">Default Lists</h3>
            </div>
            <div className="flex space-x-4 items-center">
              <div>
                {changes.deletions > 0 && <span className="text-red-500 text-sm font-semibold tracking-wide">{changes.deletions} deletions</span>}
                {changes.edits > 0 && <span className="text-orange-500 text-sm font-semibold tracking-wide">{changes.edits} edits</span>}
              </div>
              <Button content="Save changes" buttonType={ButtonType.Secondary} type="button" action={() => updateDefaultLists(defaultGrouplists)} />
            </div>
          </div>
          <div className="text-gray-200">
            {defaultGrouplists && (
              defaultGrouplists.lists && defaultGrouplists.lists.length > 0 ? (
                <>
                  {defaultGrouplists.lists.map((list: IGroupList, key: number) => (
                    <div key={key} className="border-2 border-blue-600 bg-gray-900 rounded p-2">
                      <div className="flex justify-between border-b-2 border-blue-600 pb-2 mb-2 items-center">
                        <h5 className="font-bold tracking-wide text-lg px-2">{list.description}</h5>
                        <div className="tracking-wide">
                          Internal list name: {list.name}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4">
                        {list.values.map((value: IGroupListValue, key: number) => (
                          <ListItem value={value} listId={list._id} key={key} setDefaultGrouplists={setDefaultGrouplists} setChanges={setChanges} />
                        ))}
                        <AddListItem setDefaultGrouplists={setDefaultGrouplists} updateDefaultLists={updateDefaultLists} listId={list._id} />
                      </div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div>No lists to show</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel;