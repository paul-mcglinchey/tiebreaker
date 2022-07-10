import { useState } from "react";
import { useParams } from "react-router";
import { Toolbar } from "../Common";
import { EmployeeModal, EmployeeList } from ".";

const EmployeeDashboard = () => {
  const { isAddEmployeeOpen } = useParams();

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(isAddEmployeeOpen ? true : false);

  return (
    <>
      <>
        <Toolbar title="Employees" addEmployeeAction={() => setAddEmployeeOpen(true)} />
        <EmployeeList setAddEmployeesOpen={setAddEmployeeOpen} />
      </>
      <>
        <EmployeeModal isOpen={addEmployeeOpen} close={() => setAddEmployeeOpen(false)} compact />
      </>
    </>
  )
}

export default EmployeeDashboard;