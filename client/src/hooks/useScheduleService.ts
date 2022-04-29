import { ISchedule, IScheduleService } from "../models"
import { endpoints, ScheduleContext } from "../utilities";
import { useRequestBuilder } from ".";
import useAsyncHandler from "./useAsyncHandler";
import { useContext } from "react";
import useResolutionService from "./useResolutionService";
import useGroupService from "./useGroupService";

const useScheduleService = (): IScheduleService => {
  
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()
  const { groupId } = useGroupService()
  
  const scheduleContext = useContext(ScheduleContext)
  const { getSchedules, refresh } = scheduleContext

  const getSchedule = (startDate: Date): ISchedule | undefined => {
    console.log(startDate, getSchedules().map((schedule: ISchedule) => new Date(schedule.startDate || "").toISOString().split('T')))
    return getSchedules().find((schedule: ISchedule) => new Date(schedule.startDate || "").toISOString().split('T')[0] === startDate.toISOString().split('T')[0])
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