import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useAuthService, useDelayedRendering, useGroupService, useUserService } from "../hooks"
import { combineClassNames } from "../services"
import { WideIcon } from "./Common"

const AppLoader = ({ children }: { children: any }) => {

  const { isLoading: authLoading } = useAuthService()
  const { isLoading: groupsLoading } = useGroupService()
  const { isLoading: usersLoading } = useUserService()

  const [progress, setProgress] = useState(0)
  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    if (!authLoading && !groupsLoading && !usersLoading) {
      setTimeout(() => setProgress(100), 300)
      setTimeout(() => setShowApp(true), 1000)
    }

    return () => clearTimeout()
  }, [authLoading, groupsLoading, usersLoading])
  
  const show = useDelayedRendering(100)

  return (
    <>
      <Transition
        appear
        show={!showApp}
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed justify-center items-center flex z-50 w-screen h-screen bg-gray-900 overflow-hidden inset-0">
          <div className="flex flex-col space-y-4 transform -translate-y-12">
            <WideIcon className="h-24 w-auto"/>
            <div className="w-full bg-gray-800 rounded h-3">
              <div className={combineClassNames(
                progress < 100 ? "w-0" : "w-full",
                "h-full rounded-lg bg-blue-500 transition-all duration-500"
                )} />
            </div>
          </div>
        </div>
      </Transition>
      {show && children}
    </>
  )
}

export default AppLoader