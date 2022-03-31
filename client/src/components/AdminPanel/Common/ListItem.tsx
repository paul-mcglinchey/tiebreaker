import { XIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";
import { IChanges, IconButtonSize, IGroupList, IGrouplistResponse, IGroupListValue } from "../../../models";
import { ColourPicker, SquareIconButton } from "../../Common";
import ListItemInput from "./ListItemInput";

interface IGrouplistItemProps {
  value: IGroupListValue,
  listId: string,
  setDefaultGrouplists: (state: React.SetStateAction<IGrouplistResponse>, cb?: (state: IGrouplistResponse) => void) => void,
  setChanges: React.Dispatch<React.SetStateAction<IChanges>>
}

const ListItem = ({ value, listId, setDefaultGrouplists, setChanges }: IGrouplistItemProps) => {
  
  const firstTrigger = useRef(true);

  const updateListItem = (listValueValue: string, listValueName: string) => {
    
    setDefaultGrouplists(defaultGrouplists => ({
      ...defaultGrouplists, 
      lists: defaultGrouplists.lists.map((tList: IGroupList) => {
        return tList._id === listId
          ? { 
            ...tList, 
            values: tList.values.map((tListValue: IGroupListValue) => {
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
    setDefaultGrouplists(defaultGrouplists => ({
      ...defaultGrouplists,
      lists: defaultGrouplists.lists.map((tList: IGroupList) => {
        return tList._id === listId
          ? {
            ...tList,
            values: tList.values.filter((tValue: IGroupListValue) => tValue._id !== value._id)
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