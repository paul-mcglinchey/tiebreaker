import { RotaCreateButton, RotaInfoDisplay } from ".";
import { Fetch } from '..';
import { useFetch } from "../../hooks";
import { IFetch } from "../../models/fetch.model";
import { requestBuilder } from "../../services";
import { endpoints } from "../../utilities";

const RotaToolbar = () => {
  return (

    <>
      <div className="text-white">
        <Fetch
          fetchOutput={useFetch(endpoints.rotas, requestBuilder())}
          render={({ response }: IFetch) => (
            <>
              {response && response.rotas && (
                <div className="flex md:space-x-4 justify-end">
                  <div className="hidden md:flex space-x-4">
                    <RotaInfoDisplay rotaCount={response.count} />
                    <RotaCreateButton />
                  </div>
                </div>
              )}
            </>
          )}
        />
      </div>
    </>
  )
}

export default RotaToolbar;