import { createContext, useCallback, useState } from "react";
import { IChildrenProps, IStatus } from "../../models";

interface IStatusContext {
  status: IStatus[],
  isLoading: boolean
  addStatus: (status: IStatus) => void,
  removeStatus: (statusId: string) => void,
  setLoading: (isLoading: boolean) => void
}

export const StatusContext = createContext<IStatusContext>({
  status: [],
  isLoading: false,
  addStatus: () => {},
  removeStatus: () => {},
  setLoading: () => {},
});

export const StatusProvider = ({ children }: IChildrenProps) => {
  const [status, setStatus] = useState<IStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addStatus = (status: IStatus) => setStatus(prev => [...prev, status]);
  const removeStatus = (statusId: string) => setStatus(prev => prev.filter((s: IStatus) => s._id !== statusId));

  const contextValue = {
    status,
    isLoading,
    addStatus: useCallback((status: IStatus) => addStatus(status), []),
    removeStatus: useCallback((statusId: string) => removeStatus(statusId), []),
    setLoading: useCallback((isLoading: boolean) => setIsLoading(isLoading), [])
  }

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  )
} 