import { createContext, useState } from "react";
import { IChildrenProps } from "../models";
import { ILoadingContext } from "./interfaces";

export const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  setIsLoading: () => {}
});

export const LoadingProvider = ({ children }: IChildrenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const contextValue = {
    isLoading,
    setIsLoading
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
} 