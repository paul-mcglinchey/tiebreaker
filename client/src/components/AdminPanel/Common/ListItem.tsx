import { useState } from "react";
import { IGroup, IGroupList, IGrouplistItemProps, IGrouplistResponse, IGroupListValue } from "../../../models";
import { ColourPicker } from "../../Common";
import ListItemInput from "./ListItemInput";

const ListItem = ({ value, list, defaultGrouplists, setDefaultGrouplists }: IGrouplistItemProps) => {

  const updateListItem = (listValue: string) => {
    setDefaultGrouplists(defaultGrouplists => ({
      ...defaultGrouplists, 
      lists: defaultGrouplists.lists.map((tList: IGroupList) => {
        return tList._id === list._id 
          ? { 
            ...tList, 
            values: tList.values.map((tListValue: IGroupListValue) => {
              return tListValue._id === value._id 
                ? { ...value, }
                : tListValue
            })
          } 
          : tList
      }) 
    }));
  }

  return (
    <div className="flex justify-between items-center px-2 border-b border-gray-600 pb-1">
      <ListItemInput updateListItem={(value, name) => updateListItem(value, name)} value={listValue.long} name="long" />
      <div>
        <ColourPicker square={true} colour={value.colour} setColour={(pc) => updateListItem(pc, "colour")} />
      </div>
    </div>
  )
}

export default ListItem;