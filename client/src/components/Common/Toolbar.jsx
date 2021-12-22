import { GroupToolbar, StatusBar, StatusHeader } from "..";

const Toolbar = ({ userGroup, setUserGroup, isLoading, success, children }) => {
  return (
    <div className="flex-col xl:flex">
      <div className="flex justify-between pb-4 text-white">
        <StatusHeader isLoading={isLoading} success={success}>{children}</StatusHeader>
        <GroupToolbar
          userGroup={userGroup}
          setUserGroup={setUserGroup}
        />
      </div>
      <StatusBar success={success} />
    </div>
  )
}

export default Toolbar;