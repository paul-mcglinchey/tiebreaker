import { IProps } from "../../models";

const RotaInfoDisplay = ({ rotaCount }: IProps) => {

  return (
    <div className="hidden xl:flex items-center text-gray-400 space-x-1">
      <div>
        <span className="font-light align-baseline">
          <span className="font-medium">{rotaCount}</span> rota{rotaCount > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

export default RotaInfoDisplay;