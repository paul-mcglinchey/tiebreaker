import { WideIcon } from '.'
import { IChildrenProps } from '../../models'

const PublicWrapper = ({ children }: IChildrenProps) => {
  return (
    <div className="relative h-screen lg:h-auto lg:rounded-lg max-w-3xl lg:mt-12 mx-auto bg-gray-800 p-8">
      <WideIcon className="w-full sm:h-16 text-gray-300 mb-8" />
      <div className="rounded filter drop-shadow-sm">
        {children}
      </div>
    </div>
  )
}

export default PublicWrapper