import { Fragment } from "react";
import { GroupList, Toolbar } from "..";


const GroupDashboard = () => {
  return (
    <Fragment>
      <Toolbar>Group Management</Toolbar>
      <GroupList />
    </Fragment>
  )
}

export default GroupDashboard;