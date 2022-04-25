import { IListCollection, Notification } from "../models"
import { endpoints } from "../utilities"
import useNotification from "./useNotification"
import useRequestBuilder from "./useRequestBuilder"

const useListCollectionService = (refresh: () => void = () => {}) => {

  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()

  const init = () => {
    fetch(endpoints.systemlistcollections, requestBuilder('POST', undefined, { lists: [] }))
      .then(res => {
        if (res.ok) {
          addNotification('Successfully initialized system list collection', Notification.Success);
        } else {
          addNotification('A problem occurred initializing system list collection', Notification.Error);
        } 
      })
      .catch(() => {
        addNotification('A problem ocurred initializing system list collection', Notification.Error);
      })
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