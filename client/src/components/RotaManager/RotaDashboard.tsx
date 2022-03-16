import { Fragment, useState } from 'react';

import { Fetch, Toolbar, ProgressBar, SpinnerIcon } from '..';
import { useFetch } from '../../hooks';
import { ToolbarType } from '../../models';
import { IFetch } from '../../models/fetch.model';
import { IRotasResponse } from '../../models/rotas-response.model';
import { requestBuilder } from '../../services';
import { endpoints } from '../../utilities';
import RotaList from './Rotas/RotaList';
import RotaPrompter from './Rotas/RotaPrompter';

const RotaDashboard = () => {
  
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(!refresh);
  const [rotasLoaded, setRotasLoaded] = useState(false);

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.rotas, requestBuilder(), [refresh])}
      render={({ response, error, isLoading, progress }: IFetch<IRotasResponse>) => (
        <Fragment>
          {rotasLoaded ? (
          response && response.count > 0 && !error ? (
              <>
                <Toolbar toolbarType={ToolbarType.Rotas}>Rotas</Toolbar>
                <RotaList />
              </>
            ) : (
              error ? (
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
              ) : (
                <RotaPrompter />
              )
            )
          ) : (
            <ProgressBar setLoaded={setRotasLoaded} progress={progress} />
          )})
        </Fragment>
      )}
    />
  )
}

export default RotaDashboard;