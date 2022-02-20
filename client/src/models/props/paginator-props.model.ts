export interface IPaginatorProps {
  pageSize: number,
  pageNumber: number,
  setPageNumber: (page: number) => void,
  setPageSize: (size: number) => void,
  totalClients: number
}