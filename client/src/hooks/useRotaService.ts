import { IRota, IRotaService, ISchedule, Notification } from "../models"
import { endpoints } from "../utilities";
import { useRequestBuilder, useNotification } from ".";
import { useNavigate } from "react-router";

const useRotaService = (refresh: () => void = () => {}): IRotaService => {
  
  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()
  const navigate = useNavigate();

  const addRota = (values: IRota, groupId: string) => {
    if (!groupId) return addNotification('Group must be set', Notification.Error);

    fetch(endpoints.rotas(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification('Successfully added rota', Notification.Success);
        } else {
          addNotification('A problem occurred adding rota', Notification.Error);
        }
      })
      .catch(() => {
        addNotification('A problem ocurred adding rota', Notification.Error);
      })
      .finally(() => {
        navigate('/rotas/dashboard', { replace: true });
      })
  }

  const updateRota = (values: IRota, rotaId: string | undefined, groupId: string | undefined) => {    
    if (!rotaId || !groupId) return addNotification('Something went wrong...', Notification.Error);

    fetch(endpoints.rota(rotaId, groupId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification('Successfully updated rota', Notification.Success);
        } else {
          addNotification('A problem occurred updating rota', Notification.Error);
        }
      })
      .catch(() => {
        addNotification('A problem ocurred updating rota', Notification.Error);
      })
      .finally(() => refresh())
  }

  const deleteRota = (rotaId: string | undefined, groupId: string | undefined) => {
    if (!rotaId || !groupId) return addNotification(`Something went wrong...`, Notification.Error);

    fetch(endpoints.rota(rotaId, groupId), requestBuilder("DELETE"))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully deleted rota`, Notification.Success);
        } else {
          addNotification(`A problem ocurred deleting the rota`, Notification.Error);
        }
      })
      .catch(() => {
        addNotification(`A problem occurred deleting the rota`, Notification.Error);
      })
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
    let startDate = new Date(values.startDate || "").toISOString().split('T')[0];
    if (!rotaId || !groupId || !startDate) return addNotification('Something went wrong...', Notification.Error);

    fetch(endpoints.schedule(rotaId, groupId, startDate), requestBuilder("PUT", undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification(`Successfully updated schedule`, Notification.Success);
        } else {
          addNotification(`A problem ocurred updating the schedule`, Notification.Error);
        }
      })
      .catch(() => {
        addNotification(`A problem occurred updating the schedule`, Notification.Error);
      })
      .finally(() => refresh())
  }

  return { addRota, updateRota, deleteRota, getWeek, updateSchedule }
}

export default useRotaService