import { GroupCreateButton } from "./GroupToolbar";
import { IToolbarProps } from "./models";

const Toolbar = ({ children, title, createGroupAction }: IToolbarProps) => {
  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <span className="text-3xl font-bold tracking-wider">{title}</span>
        <div className="flex space-x-4 items-center">
          {createGroupAction && (
            <GroupCreateButton action={createGroupAction} />
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Toolbar;