import { useState } from "react";
import { useGroupService } from "../../hooks";
import { IGroup } from "../../models";
import { dashboardLinks } from "../../config";
import { Toolbar, NavMenu, SpinnerIcon } from "../Common";
import { GroupCard, DataPoint, GroupPrompter, AddGroupModal } from ".";

const Groups = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);

  const { getCount, getGroups, isLoading } = useGroupService();

  return (
    <>
      <NavMenu links={dashboardLinks} />
      <div className="px-2 sm:px-6 lg:px-8">
        <Toolbar title="Group management" createGroupAction={() => setAddGroupOpen(true)} />
            {isLoading ? (
              <div className="flex justify-center py-10">
                <SpinnerIcon className="text-white h-12 w-12" />
              </div>
            ) : (
              getCount() > 0 ? (
                <div className="flex grow flex-col md:flex-row flex-wrap -m-2 mb-2">
                  {getGroups().map((g: IGroup) => (
                    <GroupCard
                      g={g}
                      key={g._id}
                      render={isCardFlipped => (
                        <div className="flex flex-col grow md:flex-row space-y-2 md:space-x-8">
                          {isCardFlipped ? (
                            <>
                              <DataPoint value={g.entities?.users?.length || 0} label="user" />
                            </>
                          ) : (
                            <>
                              <DataPoint value={g.entities?.clients?.length} label="client" />
                              <DataPoint value={g.entities?.employees?.length} label="employee" />
                              <DataPoint value={g.entities?.rotas?.length} label="rota" />
                            </>
                          )}
                        </div>
                      )}
                    />
                  ))}
                </div>
              ) : (
                <GroupPrompter action={() => setAddGroupOpen(true)} />
              )
            )}
      </div>
      <AddGroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
    </>
  )
}

export default Groups