import { createContext } from "react";
import { IChildrenProps } from "../../models";
import { useRefresh } from "../../hooks";

interface IRotaContext {
  refresh: () => void
  dependency: boolean
}

export const RotaContext = createContext<IRotaContext>({
  refresh: () => {},
  dependency: false
});

export const RotaProvider = ({ children }: IChildrenProps) => {
  const { refresh, dependency } = useRefresh()

  const contextValue = {
    refresh,
    dependency
  }

  return (
    <RotaContext.Provider value={contextValue}>
      {children}
    </RotaContext.Provider>
  )
} 