import { Transition } from '@headlessui/react';
import { useDelayedRendering } from '../../../hooks';
import Button from './Button';

interface IconProps {
  childComp?: React.ReactNode
  className: any
}

interface IPrompterProps {
  title: string,
  subtitle?: string,
  action: () => void,
  Icon?: React.FC<IconProps>
}

const Prompter = ({ Icon, title, subtitle, action }: IPrompterProps) => {

  const show = useDelayedRendering(100);

  return (
    <Transition
      show={show}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      className="flex mt-24 justify-center rounded-md text-gray-200"
    >
      <div className="flex flex-col border-2 border-blue-500 p-4 rounded-lg">
        <div>
          <h3 className='whitespace-nowrap text-gray-100 font-extrabold tracking-wide text-xl mb-2'>
            {title}
          </h3>
          {subtitle && (
            <p className='tracking-wide'>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex justify-end mt-20">
          <Button action={() => action()} Icon={Icon} content='Lets go!' />
        </div>
      </div>
    </Transition>
  )
}

export default Prompter;