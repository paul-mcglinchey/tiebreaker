import { IRota, IRotaService } from "../models"
import { endpoints, RotaContext } from "../utilities";
import { useRequestBuilder } from ".";
import { useNavigate } from "react-router";
import useAsyncHandler from "./useAsyncHandler";
import { useContext } from "react";
import useResolutionService from "./useResolutionService";

const useRotaService = (): IRotaService => {
  
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const navigate = useNavigate();
  
  const rotaContext = useContext(RotaContext)
  const { getRotas, refresh } = rotaContext

  const getRota = (rotaId: string | undefined): IRota | undefined => {
    return getRotas().filter((rota: IRota) => rota._id === rotaId)[0]
  }

  const addRota = asyncHandler(async (values: IRota, groupId: string | undefined) => {
    if (!groupId) throw new Error()

    const res = await fetch(endpoints.rotas(groupId), requestBuilder('POST', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'create', 'rota', [() => refresh()])
  })

  const updateRota = asyncHandler(async (values: IRota, rotaId: string | undefined, groupId: string | undefined) => {    
    if (!rotaId || !groupId) throw new Error();

    const res = await fetch(endpoints.rota(rotaId, groupId), requestBuilder('PUT', undefined, values))
    const json = await res.json()

    handleResolution(res, json, 'update', 'rota', [() => refresh()])
  })

  const deleteRota = asyncHandler(async (rotaId: string | undefined, groupId: string | undefined) => {
    if (!rotaId || !groupId) throw new Error()

    const res = await fetch(endpoints.rota(rotaId, groupId), requestBuilder("DELETE"))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'rota', [() => refresh(), () => navigate('/rotas/dashboard')])
  })

  return { ...rotaContext, getRota, addRota, updateRota, deleteRota }
}

export default useRotaService