export interface ISortable {
  sortField: string,
  setSortField: (sortField: string) => void,
  sortDirection: string,
  setSortDirection: (sortDirection: string) => void
}