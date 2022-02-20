import { IFilter } from "..";

export interface ISearchBarProps {
  filters: IFilter,
  setFilters: (filter: IFilter) => void,
  key: string
}