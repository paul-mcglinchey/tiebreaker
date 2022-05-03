import { useContext } from "react";
import { IRota, ISchedule, IScheduleService } from "../models"
import { ScheduleContext } from "../contexts";
import { endpoints } from '../config'
import { useAsyncHandler, useResolutionService, useGroupService, useRotaService, useRequestBuilder } from "../hooks";

const useScheduleService = (): IScheduleService => {
  
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  
  const { groupId } = useGroupService()
  const { getRotaEmployees } = useRotaService()

  const scheduleContext = useContext(ScheduleContext)
  const { getSchedules, refresh } = scheduleContext

  const getSchedule = (startDate: Date, rota: IRota): ISchedule => {
    const schedule = getSchedules().find((schedule: ISchedule) => new Date(schedule.startDate || "").toISOString().split('T')[0] === startDate.toISOString().split('T')[0])
    const rotaEmployees = getRotaEmployees(rota)

    const startDateIso = new Date(startDate.setDate(startDate.getDate() + 7)).toISOString().split('T')[0] || ""
    const currentDateIso = new Date().toISOString().split('T')[0] || ""

    const startDateInPast: boolean = startDateIso < currentDateIso

    if (schedule) {
      return startDateInPast ? { ...schedule, locked: true } : schedule
    } else {
      return {
        startDate: new Date(startDate),
        employeeSchedules: rotaEmployees.map(re => ({ employeeId: re._id, shifts: [] })),
        locked: startDateInPast ? true : false
      }
    }
  }

  const updateSchedule = asyncHandler(async (values: ISchedule, scheduleId: string | undefined,  rotaId: string | undefined) => {
    if (!rotaId || !groupId || !scheduleId) throw new Error()

    const res = await fetch(endpoints.schedule(rotaId, groupId, scheduleId), requestBuilder("PUT", undefined, values))
    const json = res.json()

    handleResolution(res, json, 'update', 'schedule', [() => refresh()])
  })

  const createSchedule = asyncHandler(async (values: ISchedule, rotaId: string | undefined) => {
    let startDate = new Date(values.startDate || "").toISOString().split('T')[0];
    if (!rotaId || !groupId || !startDate) throw new Error()

    const res = await fetch(endpoints.schedules(rotaId, groupId), requestBuilder('POST', undefined, values))
    const json = res.json()

    handleResolution(res, json, 'create', 'schedule', [() => refresh()])
  })

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

  return { ...scheduleContext, getSchedule, getWeek, updateSchedule, createSchedule }
}

export default useScheduleService