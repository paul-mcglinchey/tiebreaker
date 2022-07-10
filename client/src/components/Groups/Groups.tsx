import { useState } from "react";
import { useGroupService } from "../../hooks";
import { IGroup } from "../../models";
import { dashboardLinks } from "../../config";
import { Toolbar, NavMenu, SpinnerIcon } from "../Common";
import { GroupCard, GroupPrompter, GroupModal } from ".";

const Groups = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false)

  const { groups = [], isLoading } = useGroupService()

  return (
    <>
      <NavMenu links={dashboardLinks} hideGroupSelector />
      <div className="px-2 sm:px-6 lg:px-8">
        <Toolbar title="Group management" createGroupAction={() => setAddGroupOpen(true)} />
        {isLoading ? (
          <div className="flex justify-center py-10">
            <SpinnerIcon className="text-white h-12 w-12" />
          </div>
        ) : (
          groups.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {groups.map((g: IGroup, i: number) => (
                <GroupCard key={i} g={g} />
              ))}
            </div>
          ) : (
            <GroupPrompter action={() => setAddGroupOpen(true)} />
          )
        )}
      </div>
      <GroupModal isOpen={addGroupOpen} close={() => setAddGroupOpen(false)} />
    </>
  )
}

export default Groups