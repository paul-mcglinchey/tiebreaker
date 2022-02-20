import { IFilter } from "..";

export interface ISearchBarProps {
  filters: IFilter,
  setFilters: (filter: IFilter) => void,
  searchField: string
}