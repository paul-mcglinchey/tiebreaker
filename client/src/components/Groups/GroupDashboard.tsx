import { Fragment } from "react";
import { GroupList, Toolbar } from "..";
import { ToolbarType } from "../../models";


const GroupDashboard = () => {
  return (
    <Fragment>
      <Toolbar toolbarType={ToolbarType.Groups}>Group Management</Toolbar>
      <GroupList />
    </Fragment>
  )
}

export default GroupDashboard;