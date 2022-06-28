import { Fragment } from "react"
import { ITable } from "../../models"
import { SpinnerIcon, TableHeader, TableInteractiveHeader } from "."

interface ITableProps extends ITable {
  children: JSX.Element
}

const Table = ({
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  isLoading,
  headers,
  children
}: ITableProps) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full">
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
                    {h.value}
                  </span>
                )}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <Fragment>
          <tbody className="divide-y divide-gray-700">
            {children}
          </tbody>
        </Fragment>
      </table>
      {isLoading && (
        <div className="absolute left-0 top-0 rounded-md w-full h-full bg-gray-800 flex flex-grow justify-center pt-16 bg-opacity-20">
          <SpinnerIcon className="text-white h-12 w-12" />
        </div>
      )}
    </div>
  )
}

export default Table;