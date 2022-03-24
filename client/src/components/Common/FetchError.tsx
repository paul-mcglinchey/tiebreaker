import { useState } from "react";
import { IProps } from "../../models";
import { SpinnerIcon } from "./icons";

const FetchError = ({ error, isLoading }: IProps) => {

  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(!refresh);

  return (
    <>
      <div className="text-lg md:text-2xl font-semibold md:font-bold tracking-wider text-white md:w-3/4 text-center mx-auto my-20 p-2 border-2 border-red-500 rounded-lg align-middle">
        <div className="flex-col">
          <div className="flex justify-between text-left text-base font-normal text-gray-500">
            <span>
              {error}
            </span>
            {isLoading && (
              <SpinnerIcon className="w-6 h-6" />
            )}
          </div>
          <div className="md:px-4 py-4">
            <span>We ran into a problem fetching your data, </span>
            <button onClick={() => toggleRefresh()} className="font-bold text-red-300 hover:text-red-500">
              try again?
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FetchError;