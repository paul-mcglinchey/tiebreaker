import { useEffect, useState } from "react";
import { IDefaultGrouplistResponse, IGroupList, IGrouplistResponse, IGroupListValue } from "../../models";
import { requestBuilder } from "../../services";
import { endpoints } from "../../utilities";
import { Toolbar } from "../Common";
import { ListItem } from "./Common";

const AdminPanel = () => {

  const [defaultGrouplists, setDefaultGrouplists] = useState<IGrouplistResponse | undefined>(undefined);
  let componentIsMounted = true;

  useEffect(() => {

    const _fetch = () => {
      fetch(endpoints.defaultgrouplists, requestBuilder("GET"))
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
  }, [])

  const updateDefaultLists = () => {
    fetch(endpoints.defaultgrouplists, requestBuilder("PUT", undefined, defaultGrouplists))
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <Toolbar>Admin Panel</Toolbar>
      <div>
        <div className="flex flex-col space-y-2 text-gray-200">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-2xl font-semibold tracking-wide text-blue-400">Default Lists</h3>
            </div>
            <button onClick={() => updateDefaultLists()} className="uppercase text-sm font-semibold tracking-wide border border-white px-2 py-1/2 rounded hover:text-green-500 hover:border-green-500 transition-all">
              Save Changes
            </button>
          </div>
          <div className="text-gray-200">
            {defaultGrouplists && (
              defaultGrouplists.lists && defaultGrouplists.lists.length > 0 ? (
                <>
                  {defaultGrouplists.lists.map((list: IGroupList, key: number) => (
                    <div key={key} className="border-2 border-blue-600 bg-blue-900 rounded p-2">
                      <div className="flex justify-between border-b-2 border-blue-600 pb-2 mb-2 items-center">
                        <h5 className="font-bold tracking-wide text-lg">{list.description}</h5>
                        <div className="tracking-wide">
                          Internal list name: {list.name}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {list.values.map((value: IGroupListValue, key: number) => (
                          <ListItem value={value} list={list} key={key} defaultGrouplists={defaultGrouplists} setDefaultGrouplists={setDefaultGrouplists} />
                        ))}
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