import { IRota, IRotaService, ISchedule, Status } from "../models"
import { endpoints } from "../utilities";
import { useRequestBuilder, useStatus } from ".";

const useRotaService = (refresh: () => void = () => {}): IRotaService => {
  
  const { appendStatus, updateIsLoading } = useStatus()
  const { requestBuilder } = useRequestBuilder()

  const addRota = (values: IRota, groupId: string) => {
    updateIsLoading(true);

    if (!groupId) {
      return appendStatus(false, 'Group must be set', Status.Error);
    }

    fetch(endpoints.rotas(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          appendStatus(false, 'Successfully added rota', Status.Success);
        } else {
          appendStatus(false, 'A problem occurred adding rota', Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, 'A problem ocurred adding rota', Status.Error);
      })
      .finally(() => {
        updateIsLoading(false);
        refresh();
      })
  }

  const updateRota = (values: IRota, rotaId: string | undefined, groupId: string | undefined) => {
    
    if (!rotaId || !groupId) return appendStatus(false, 'Something went wrong...', Status.Error);

    updateIsLoading(true);

    fetch(endpoints.rota(rotaId, groupId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          appendStatus(false, 'Successfully updated rota', Status.Success);
        } else {
          appendStatus(false, 'A problem occurred updating rota', Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, 'A problem ocurred updating rota', Status.Error);
      })
      .finally(() => {
        updateIsLoading(false);
        refresh();
      })
  }

  const deleteRota = (rotaId: string | undefined, groupId: string | undefined) => {
    updateIsLoading(true);

    if (!rotaId || !groupId) return appendStatus(false, `Something went wrong...`, Status.Error);

    fetch(endpoints.rota(rotaId, groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully deleted rota`, Status.Success);
        } else {
          appendStatus(false, `A problem ocurred deleting the rota`, Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, `A problem occurred deleting the rota`, Status.Error);
      })
      .finally(() => updateIsLoading(false))
  }

  const getWeek = (weekModifier: number): { firstDay: Date, lastDay: Date } => {
    let current = new Date();
    let today = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate()))
    today.setDate(today.getDate() + (weekModifier * 7));

    // Using custom index here to ensure that the current week is not calculated off of Sunday being the first day
    let mondayAsFirstDayIndex = [6, 0, 1, 2, 3, 4, 5];

    let first = today.getDate() - (mondayAsFirstDayIndex[today.getDay()] || 0);
    let last = first + 6;

    var firstDay = new Date(new Date(today.setDate(first)).toISOString());
    var lastDay = new Date(new Date(today.setDate(last)).toISOString());

    return { firstDay, lastDay };
  }

  const updateSchedule = (values: ISchedule, rotaId: string | undefined, groupId: string | undefined) => {
    updateIsLoading(true);
    
    let startDate = new Date(values.startDate || "").toISOString().split('T')[0];
    if (!rotaId || !groupId || !startDate) return appendStatus(false, 'Something went wrong...', Status.Error);

    fetch(endpoints.schedule(rotaId, groupId, startDate), requestBuilder("PUT", undefined, values))
      .then(res => {
        if (res.ok) {
          appendStatus(false, `Successfully updated schedule`, Status.Success);
        } else {
          appendStatus(false, `A problem ocurred updating the schedule`, Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, `A problem occurred updating the schedule`, Status.Error);
      })
      .finally(() => {
        updateIsLoading(false);
        refresh();
      })
  }

  return { addRota, updateRota, deleteRota, getWeek, updateSchedule }
}

export default useRotaService