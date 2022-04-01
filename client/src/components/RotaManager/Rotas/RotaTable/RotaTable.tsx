import { Fragment } from "react";
import { SpinnerIcon } from "../../..";
import { IRota, ISortable } from "../../../../models";
import RotaPrompter from "../RotaPrompter";
import Header from "./Header";
import InteractiveHeader from "./InteractiveHeader";
import RotaListRow from "./RotaListRow";

interface IRotaTableProps extends ISortable {
  rotas: IRota[],
  count: number,
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>,
  isLoading: boolean
}

const RotaTable = ({
  rotas,
  count,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  headers,
  isLoading
}: IRotaTableProps) => {

  return (
    <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
      <table className="min-w-full">
        <thead className="bg-gray-800">
          <tr>
            {headers.map((h, i) => (
              <Header key={i}>
                {h.interactive ? (
                  <InteractiveHeader sortField={sortField} sortDirection={sortDirection} setSortField={setSortField} setSortDirection={setSortDirection} key={i} value={h.value}>
                    {h.name}
                  </InteractiveHeader>
                ) : (
                  <span>
                    {h.value}
                  </span>
                )}
              </Header>
            ))}
          </tr>
        </thead>
        <Fragment>
          {rotas && count > 0 ? (
            <tbody className="divide-y divide-gray-700">
              {rotas.map((r) => (
                <RotaListRow rota={r} key={r._id} />
              ))}
            </tbody>
          ) : (
            <RotaPrompter />
          )}
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

export default RotaTable;