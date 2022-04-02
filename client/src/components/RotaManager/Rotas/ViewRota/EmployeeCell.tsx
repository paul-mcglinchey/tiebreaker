import { useEffect, useRef, useState } from "react";
import { IEmployee, ISchedule, IScheduleEmployees, IScheduleShift } from "../../../../models"

interface IEmployeeCellProps {
  employee: IEmployee,
  schedule: ISchedule,
  day: number
}

const EmployeeCell = ({ employee, schedule, day }: IEmployeeCellProps) => {

  const [employeeShift, setEmployeeShift] = useState<IScheduleShift | undefined>(undefined);
  const componentIsMounted = useRef(true);

  const getEmployeeShift = (): IScheduleShift | undefined => {
    var startDate = new Date(schedule.startDate);
    startDate.setDate(startDate.getDate() + day);

    let shifts = schedule.employees.filter((e: IScheduleEmployees) => e.employee._id === employee._id)[0]?.shifts;
    let shift = shifts?.filter((s: IScheduleShift) => s.date === startDate)[0];

    return shift;
  }

  useEffect(() => {
    
    componentIsMounted.current && setEmployeeShift(getEmployeeShift());
    
    return () => {
      componentIsMounted.current = false;
    }
  }, [])

  return (
    <div>
      { employeeShift ? 'Woooo theres a shift!' : 'Awww no shift'}
    </div>
  )
}

export default EmployeeCell;