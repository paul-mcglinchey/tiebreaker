import { createContext } from "react";
import { IApplicationContext } from "../../models";

const ApplicationContext = createContext<IApplicationContext>({} as IApplicationContext);

export default ApplicationContext;