import { IFetch } from "../fetch.model";

export interface IFetchProps {
  render: (fetchOutput: IFetch) => JSX.Element,
  fetchOutput: IFetch
}