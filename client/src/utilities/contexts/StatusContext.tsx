import { createContext } from "react";
import { IStatusContext } from "../../models";

const StatusContext = createContext<IStatusContext>({} as IStatusContext);

export default StatusContext;