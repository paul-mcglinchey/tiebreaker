import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/solid';

const CustomCheckbox = (props) => {

  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    props.action();
    setChecked(!checked);
  }

  return (
    <div onClick={() => toggleChecked()} className="bg-gray-200 rounded h-10 w-10 hover:bg-gray-300 transition-all text-purple-500">
      <div>
        {checked &&
          <CheckIcon />
        }
      </div>
    </div>
  )
}

export default CustomCheckbox;