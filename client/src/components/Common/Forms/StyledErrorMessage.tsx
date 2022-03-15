import { IChildrenProps } from "../../../models";

const StyledErrorMessage = ({ children }: IChildrenProps) => {
  return (
    <div className="text-red-500 uppercase font-bold text-opacity-80 text-sm">
      <span className="inline-block align-middle">
        {children}
      </span>
    </div>
  )
}

export default StyledErrorMessage;