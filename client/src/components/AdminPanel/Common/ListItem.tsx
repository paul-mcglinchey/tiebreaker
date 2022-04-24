import { XIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";
import { IChanges, IconButtonSize, IList, IListCollection, IListValue } from "../../../models";
import { ColourPicker, SquareIconButton } from "../../Common";
import ListItemInput from "./ListItemInput";

interface IGrouplistItemProps {
  value: IListValue,
  listId: string,
  setSystemListCollection: (state: React.SetStateAction<IListCollection>, cb?: (state: IListCollection | undefined) => void) => void,
  setChanges: React.Dispatch<React.SetStateAction<IChanges>>
}

const ListItem = ({ value, listId, setSystemListCollection, setChanges }: IGrouplistItemProps) => {
  
  const firstTrigger = useRef(true);

  const updateListItem = (listValueValue: string, listValueName: string) => {
    
    setSystemListCollection(systemListCollection => ({
      ...systemListCollection, 
      lists: systemListCollection.lists.map((tList: IList) => {
        return tList._id === listId
          ? { 
            ...tList, 
            values: tList.values.map((tListValue: IListValue) => {
              return tListValue._id === value._id 
                ? { ...value, [listValueName]: listValueValue }
                : tListValue
            })
          } 
          : tList
      }) 
    }));

    if (firstTrigger.current) {
      setChanges(changes => ({ ...changes, edits: changes.edits + 1 }))
      firstTrigger.current = false;
    }
  }

  const removeListItem = () => {
    setSystemListCollection(systemListCollection => ({
      ...systemListCollection,
      lists: systemListCollection.lists.map((tList: IList) => {
        return tList._id === listId
          ? {
            ...tList,
            values: tList.values.filter((tValue: IListValue) => tValue._id !== value._id)
          }
          : tList
      })
    }), () => setChanges(changes => ({ ...changes, deletions: changes.deletions + 1 })))
  }

  return (
    <div className="flex justify-between items-center px-2 border-b border-gray-600 pb-2">
      <div className="flex space-x-4">
        <ListItemInput onChange={(value) => updateListItem(value, "long")} value={value.long} name="long" />
        <ListItemInput onChange={(value) => updateListItem(value, "short")} value={value.short || ''} name="short" />
      </div>
      <div className="flex items-center space-x-2">
        <ColourPicker square={true} colour={value.colour} setColour={(pc) => updateListItem(pc, "colour")} />
        <SquareIconButton buttonSize={IconButtonSize.XS} colour="red-500" Icon={XIcon} action={removeListItem} />
      </div>
    </div>
  )
}

export default ListItem;