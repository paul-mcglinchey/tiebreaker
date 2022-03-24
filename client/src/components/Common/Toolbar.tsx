import { IToolbarProps } from "../../models";
import { ClientGroupToolbar } from "../Groups";

const Toolbar = ({ children }: IToolbarProps) => {

  return (
    <div className="flex-col xl:flex">
      <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between pb-4 text-white">
        <span className="text-3xl font-bold tracking-wider">{children}</span>
        <ClientGroupToolbar />
      </div>
    </div>
  )
}

export default Toolbar;