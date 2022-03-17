import { ICustomCheckBoxProps } from '../../../models';
import { combineClassNames } from '../../../services';

const CustomCheckbox = ({ state, setState, label }: ICustomCheckBoxProps) => {
  const toggleChecked = () => setState(!state);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center">
        {label && (
          <label className="font-bold text-gray-500 mb-1 uppercase">
            {label}
          </label>
        )}
      </div>
      <div onClick={() => toggleChecked()} className="flex flex-grow items-center justify-center">
        <div className="h-6 w-12 bg-gray-800 rounded-full hover:bg-gray-700 transition-all">
          <button type="button" className={combineClassNames(
            "w-1/2 h-full rounded-full transform transition-transform drop-shadow-lg", state ? "bg-green-500 translate-x-full" : "bg-gray-500"
          )} />
        </div>
      </div>
    </div>
  )
}

export default CustomCheckbox;