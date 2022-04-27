import { SortDirection } from "./types";

export interface ISortable {
  sortField: string | undefined,
  setSortField: (sortField: string) => void,
  sortDirection: SortDirection,
  setSortDirection: (sortDirection: SortDirection) => void
}