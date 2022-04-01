import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { DayOfWeek, IEmployee, IRota } from "../../../../models";
import { SquareIconButton } from "../../../Common";
import { Header } from "../RotaTable";
import RotaRow from "./RotaRow";

const ViewRota = ({ rota }: { rota: IRota }) => {

  const getDayCycle = (): number[] => {
    let dayCycle: number[] = [];
    let startDay: number = Number.parseInt(rota.startDay?.toString() || "0");

    for (let i = 0; i <= 6; i++) {
      let current: number = startDay + i;
      (current) <= 6 ? dayCycle.push(current) : dayCycle.push(current - 7);
    }

    return dayCycle;
  }

  const dayCycle: number[] = getDayCycle();

  const getCurrentDate = () => {
    let current = new Date;
    let first = current.getDate() - current.getDay();
    let last = first + 6;

    var firstDay = new Date(current.setDate(first)).toLocaleDateString();
    var lastDay = new Date(current.setDate(last)).toLocaleDateString();

    return { firstDay, lastDay };
  }

  return (
    <div className="flex flex-col space-y-4 text-gray-200">
      <div>
        <h1 className="pt-4 text-4xl font-semibold tracking-wider">View rota</h1>
      </div>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-between">
          <div>
            <SquareIconButton Icon={ArrowLeftIcon} />
            {getCurrentDate().firstDay}
          </div>
          <div>
            {getCurrentDate().lastDay}
            <SquareIconButton Icon={ArrowRightIcon} />
          </div>
        </div>
        <div className="relative shadow overflow-x-scroll md:overflow-x-auto rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                {dayCycle.map((day: number) => (
                  <Header key={day}>{DayOfWeek[day]}</Header>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {rota.employees && rota.employees.map((e: IEmployee, key: number) => (
                <RotaRow rota={rota} employee={e} key={key} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewRota;