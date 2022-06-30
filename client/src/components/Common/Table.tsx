import { IChildrenProps, ISortable, ITable, ITableHeader } from "../../models"
import { SpinnerIcon, TableHeader, TableInteractiveHeader } from "."

interface ITableProps extends ITable, IChildrenProps { }

const Table = ({
  isLoading,
  children
}: ITableProps) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full">
        {children}
      </table>
      {isLoading && (
        <div className="absolute left-0 top-0 rounded-md w-full h-full bg-gray-800 flex flex-grow justify-center pt-16 bg-opacity-20">
          <SpinnerIcon className="text-white h-12 w-12" />
        </div>
      )}
    </div>
  )
}

Table.Header = ({ headers }: ITableHeader) => {
  return (
    <thead className="bg-gray-800">
      <tr>
        {headers.map((h, i) => (
          <TableHeader key={i}>
            <span>{h.name}</span>
          </TableHeader>
        ))}
      </tr>
    </thead>
  )
}

Table.SortableHeader = ({ headers, sortField, sortDirection, setSortField, setSortDirection }: ITableHeader & ISortable) => {
  return (
    <thead className="bg-gray-800">
      <tr>
        {headers.map((h, i) => (
          <TableHeader key={i}>
            {h.interactive ? (
              <TableInteractiveHeader sortField={sortField} sortDirection={sortDirection} setSortField={setSortField} setSortDirection={setSortDirection} key={i} value={h.value}>
                {h.name}
              </TableInteractiveHeader>
            ) : (
              <span>
                {h.name}
              </span>
            )}
          </TableHeader>
        ))}
      </tr>
    </thead>
  )
}

Table.Body = ({ children }: IChildrenProps) => {
  return (
    <tbody className="divide-y divide-gray-700">
      {children}
    </tbody>
  )
}

export default Table;