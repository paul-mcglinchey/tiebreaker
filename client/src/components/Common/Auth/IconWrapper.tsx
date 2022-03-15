import { WideIcon } from "../.."

const IconWrapper = ({ children }: any) => {
  return (
    <div className="relative max-w-login h-screen mx-auto">
      <WideIcon className="w-full h-auto text-gray-300 relative top-4" />
      {children}
    </div>
  )
}

export default IconWrapper;