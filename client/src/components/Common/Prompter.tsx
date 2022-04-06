import { Transition } from '@headlessui/react';
import { useDelayedRendering } from '../../hooks';

interface IconProps {
  childComp?: React.ReactNode
  className: any
}

interface IPrompterProps {
  title: string,
  action: () => void,
  Icon: React.FC<IconProps>
}

const Prompter = ({ Icon, title, action }: IPrompterProps) => {

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
      className="flex justify-center"
    >
      <button onClick={() => action()} className="flex justify-center mt-32">
        <div className="flex bg-gray-800 text-3xl sm:text-5xl text-white font-extrabold p-4 rounded-lg transform hover:scale-105 transition-all text-center">
          <div className="flex tracking-wide">
            <div>
              {title}
            </div>
            <span className="inline-block align-middle">
              <Icon className="h-10 w-10 lg:h-12 lg:w-12 ml-2 md:ml-4 mb-2 hover:fill-current transition-all" />
            </span>
          </div>
        </div>
      </button>
    </Transition>
  )
}

export default Prompter;