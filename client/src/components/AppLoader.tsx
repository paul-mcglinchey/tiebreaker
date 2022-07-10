import { Transition } from "@headlessui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Navigate } from "react-router"
import { ApplicationProvider, GroupProvider } from "../contexts"
import { useAuthService, useGroupService, useUserService } from "../hooks"
import { IChildrenProps } from "../models"
import { combineClassNames } from "../services"
import { WideIcon } from "./Common"

const AppLoader = ({ children }: { children: any }) => {

  const [authCompleted, setAuthCompleted] = useState<boolean>(false)
  const [groupLoadingComplete, setGroupLoadingComplete] = useState<boolean>(false)
  const [userLoadingComplete, setUserLoadingComplete] = useState<boolean>(false)

  const [isAppLoading, setIsAppLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)

  const { isLoading: isAuthLoading, user } = useAuthService()

  useEffect(() => {
    !isAuthLoading && setAuthCompleted(true)
  }, [isAuthLoading])

  useEffect(() => {
    setTimeout(() => setProgress(30), 200)
  }, [authCompleted])

  useEffect(() => {
    groupLoadingComplete && setTimeout(() => setProgress(70), 500)
  }, [groupLoadingComplete])

  useEffect(() => {
    userLoadingComplete && setTimeout(() => setProgress(100), 500)
  }, [userLoadingComplete])

  useEffect(() => {
    progress === 100 && setTimeout(() => setIsAppLoading(false), 500)
  }, [progress])

  return (
    <>
      <Transition
        show={isAppLoading}
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed justify-center items-center flex z-50 w-screen h-screen bg-gray-900 overflow-hidden inset-0">
          <div className="flex flex-col space-y-4 transform -translate-y-12">
            <WideIcon className="h-24 w-auto" />
            <div className="w-full bg-gray-800 rounded h-3">
              <div className={combineClassNames(
                "h-full rounded-lg bg-blue-500 transition-all duration-500",
                progress === 0 && "w-0", progress === 30 && "w-1/3", progress === 70 && "w-3/4", progress === 100 && "w-full"
              )} />
            </div>
          </div>
        </div>
      </Transition>
      {authCompleted && (
        user ? (
          <ApplicationProvider>
            <GroupProvider>
              <GroupLoader setGroupLoadingComplete={setGroupLoadingComplete}>
                {groupLoadingComplete && (
                  <UserLoader setUserLoadingComplete={setUserLoadingComplete}>{children}</UserLoader>
                )}
              </GroupLoader>
            </GroupProvider >
          </ApplicationProvider >
        ) : (
          <Navigate to="/login" />
        )
      )}
    </>
  )
}

interface IGroupLoaderProps {
  setGroupLoadingComplete: Dispatch<SetStateAction<boolean>>
}

const GroupLoader = ({ children, setGroupLoadingComplete }: IChildrenProps & IGroupLoaderProps) => {

  const { isLoading: isGroupsLoading } = useGroupService()

  useEffect(() => {
    !isGroupsLoading && setGroupLoadingComplete(true)

  }, [isGroupsLoading])

  return (
    <>
      {children}
    </>
  )
}

interface IUserLoaderProps {
  setUserLoadingComplete: Dispatch<SetStateAction<boolean>>
}

const UserLoader = ({ children, setUserLoadingComplete }: IChildrenProps & IUserLoaderProps) => {

  const { isLoading: isUsersLoading } = useUserService()

  useEffect(() => {
    !isUsersLoading && setUserLoadingComplete(true)

  }, [isUsersLoading])

  return (
    <>
      {children}
    </>
  )
}

export default AppLoader