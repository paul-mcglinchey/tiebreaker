import { createContext } from "react";
import { IApplicationContext } from "../../models";

const DefaultAppContext: IApplicationContext = {
  userGroup: null, setUserGroup: null, status: null, setStatus: null
}

const ApplicationContext = createContext<IApplicationContext>(DefaultAppContext);

export default ApplicationContext;