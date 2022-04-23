import { createContext } from "react";
import { IProgressContext } from "../../models";

const ProgressContext = createContext<IProgressContext>({ progress: 0, setProgress: (progress: number) => console.log(progress)});

export default ProgressContext;