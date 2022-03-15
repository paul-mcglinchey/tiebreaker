import { Link } from "react-router-dom";
import { Application, IProps } from "../models";

const Dashboard = ({ setCurrentApplication }: IProps) => {

  setCurrentApplication(undefined);
  const applicationLink = "p-4 m-1 rounded-lg hover:bg-gray-700";

  return (
    <div className="flex justify-center text-gray-200 mt-10 font-semibold tracking-wide space-x-4">
      <Link className={applicationLink} to="/clients/dashboard">
        {Application.ClientManager}
      </Link>
      <Link className={applicationLink} to="/rotas/dashboard">
        {Application.RotaManager}
      </Link>
    </div>
  )
}

export default Dashboard;