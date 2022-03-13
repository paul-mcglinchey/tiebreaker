import { IFetch } from "../fetch.model";

export interface IFetchProps<T> {
  render: (fetchOutput: IFetch<T>) => JSX.Element,
  fetchOutput: IFetch<T>
}