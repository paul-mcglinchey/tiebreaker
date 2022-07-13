import { Dispatch, SetStateAction } from "react";

export interface ILoadingContext {
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}