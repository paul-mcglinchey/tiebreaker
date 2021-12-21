import { GroupToolbar } from "..";

const Toolbar = ({userGroup, setUserGroup, children}) => {
  return (
    <div className="flex justify-between pb-4 text-white">
      <div className="flex space-x-4 text-4xl font-bold text-white tracking-wider items-baseline">
        <span>{children}</span>
      </div>
      <GroupToolbar
        userGroup={userGroup}
        setUserGroup={setUserGroup}
      />
    </div>
  )
}

export default Toolbar;