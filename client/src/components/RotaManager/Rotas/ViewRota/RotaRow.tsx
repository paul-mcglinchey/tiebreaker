import { Fragment } from "react";
import { IEmployee, IRota } from "../../../../models";

interface IRotaRowProps {
  rota: IRota,
  employee: IEmployee
}

const RotaRow = ({}) => {
  return (
    <Fragment>
      <tr className="bg-gray-900 border-gray-700">
      </tr>
    </Fragment>
  )
}

export default RotaRow;