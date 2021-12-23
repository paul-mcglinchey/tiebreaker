import { GroupToolbar, StatusBar, StatusHeader } from "..";

const Toolbar = ({ userGroup, setUserGroup, status, children }) => {
  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <StatusHeader status={status}>{children}</StatusHeader>
        <GroupToolbar
          userGroup={userGroup}
          setUserGroup={setUserGroup}
        />
      </div>
      <StatusBar status={status} />
    </div>
  )
}

export default Toolbar;