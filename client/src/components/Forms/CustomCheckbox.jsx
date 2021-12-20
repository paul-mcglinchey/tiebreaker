import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/solid';

const CustomCheckbox = (props) => {

  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    props.action();
    setChecked(!checked);
  }

  return (
    <div onClick={() => toggleChecked()} className="bg-gray-800 rounded h-10 w-10 hover:bg-gray-700 transition-all text-blue-800">
      <div>
        {checked &&
          <CheckIcon />
        }
      </div>
    </div>
  )
}

export default CustomCheckbox;