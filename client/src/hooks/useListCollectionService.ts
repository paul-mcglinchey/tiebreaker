import { IListCollection, Notification } from "../models"
import { endpoints } from "../utilities"
import useNotification from "./useNotification"
import useRequestBuilder from "./useRequestBuilder"

const useListCollectionService = (refresh: () => void = () => {}) => {

  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()

  const init = async () => {
    const res = await fetch(endpoints.systemlistcollections, requestBuilder('POST', undefined, { lists: [] }))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully initialized system list collection`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)

    return addNotification(`${res.status}: A problem occurred initializing system list collection`, Notification.Error)
  }

  const update = (listcollectionId: string | undefined, values: IListCollection) => {
    if (!listcollectionId) return addNotification('Something went wrong...', Notification.Error)

    fetch(endpoints.systemlistcollection(listcollectionId), requestBuilder('PUT', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification('Successfully updated system list collection', Notification.Success);
        } else {
          addNotification('A problem occurred updating system list collection', Notification.Error);
        }
      })
      .catch(() => {
        addNotification('A problem ocurred updating system list collection', Notification.Error);
      })
      .finally(() => refresh())
  }

  return { init, update }
}

export default useListCollectionService