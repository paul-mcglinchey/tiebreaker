import { useContext } from "react";
import { IRota, ISchedule } from "../models"
import { IScheduleService } from "./interfaces";
import { ScheduleContext } from "../contexts";
import { endpoints } from '../config'
import { addDays } from "date-fns";
import { useAsyncHandler, useResolutionService, useGroupService, useRotaService, useRequestBuilder } from "../hooks";

const useScheduleService = (): IScheduleService => {
  
  const { asyncReturnHandler } = useAsyncHandler()
  const { requestBuilder } = useRequestBuilder()
  const { handleResolution } = useResolutionService()
  
  const { currentGroup } = useGroupService()
  const { getRotaEmployees } = useRotaService()

  const scheduleContext = useContext(ScheduleContext)
  const { getSchedules, setSchedules } = scheduleContext

  const getSchedule = (startDate: Date, rota: IRota, week: Date[]): ISchedule => {
    const schedule = getSchedules().find((schedule: ISchedule) => new Date(schedule.startDate || "").toISOString().split('T')[0] === startDate.toISOString().split('T')[0])
    const rotaEmployees = getRotaEmployees(rota)

    const startDateIso = addDays(startDate, 7).toISOString().split('T')[0] || ""
    const currentDateIso = new Date().toISOString().split('T')[0] || ""

    const startDateInPast: boolean = startDateIso < currentDateIso

    if (schedule) {
      return startDateInPast 
        ? { ...schedule, locked: true } 
        : { ...schedule, employeeSchedules: rotaEmployees.map(re => ({ employeeId: re._id, shifts: schedule.employeeSchedules.find(es => re._id === es.employeeId)?.shifts || week.map(d => ({ date: new Date(d)})) }))}
    } else {
      return {
        startDate: new Date(startDate),
        employeeSchedules: startDateInPast ? [] : rotaEmployees.map(re => ({ employeeId: re._id, shifts: week.map(d => ({ date: new Date(d) })) })),
        locked: startDateInPast ? true : false
      }
    }
  }

  const updateSchedule = asyncReturnHandler<ISchedule>(async (values: ISchedule, scheduleId: string | undefined,  rotaId: string | undefined): Promise<ISchedule> => {
    if (!rotaId || !currentGroup?._id || !scheduleId) throw new Error()

    const res = await fetch(endpoints.schedule(rotaId, currentGroup._id, scheduleId), requestBuilder("PUT", undefined, values))
    const json: ISchedule = await res.json()

    handleResolution(res, json, 'update', 'schedule', [() => updateSchedulesInContext(json, scheduleId)])

    return json
  })

  const createSchedule = asyncReturnHandler<ISchedule>(async (values: ISchedule, rotaId: string | undefined): Promise<ISchedule> => {
    let startDate = new Date(values.startDate || "").toISOString().split('T')[0];
    if (!rotaId || !currentGroup?._id || !startDate) throw new Error()

    const res = await fetch(endpoints.schedules(rotaId, currentGroup._id), requestBuilder('POST', undefined, values))
    const json: ISchedule = await res.json()

    handleResolution(res, json, 'create', 'schedule', [() => updateSchedulesInContext(json)])

    return json
  })

  const updateSchedulesInContext = (values: ISchedule, scheduleId?: string) => {
    const schedules = getSchedules()
    
    if (scheduleId) {
      schedules[schedules.findIndex(s => s._id === scheduleId)] = values
    } else {
      schedules.push(values)
    }

    setSchedules(schedules)
  }

  const getWeek = (weekModifier: number): { firstDay: Date, lastDay: Date, week: Date[] } => {
    let current = new Date();
    let today = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate()))
    today.setDate(today.getDate() + (weekModifier * 7));

    // Using custom index here to ensure that the current week is not calculated off of Sunday being the first day
    let mondayAsFirstDayIndex = [6, 0, 1, 2, 3, 4, 5];

    let first = today.getDate() - (mondayAsFirstDayIndex[today.getDay()] || 0);
    let last = first + 6;
    
    var firstDay = new Date(new Date(today.setDate(first)).toISOString());
    var lastDay = new Date(new Date(today.setDate(last)).toISOString());
    let week: Date[] = mondayAsFirstDayIndex.map((_d, i) => addDays(firstDay, i))

    return { firstDay, lastDay, week };
  }

  return { ...scheduleContext, getSchedule, getWeek, updateSchedule, createSchedule }
}

export default useScheduleService