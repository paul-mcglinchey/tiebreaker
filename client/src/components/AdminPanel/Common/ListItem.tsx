import { useState } from "react";
import { IGroupList, IGrouplistItemProps, IGroupListValue } from "../../../models";
import { ColourPicker } from "../../Common";

const ListItem = ({ value, list, defaultGrouplists, setDefaultGrouplists }: IGrouplistItemProps) => {

  const [listValue, setListValue] = useState<IGroupListValue>(value);

  const updateListItem = (value: string, name: string) => {

    let tempListValue = { ...listValue };
    tempListValue[name as keyof IGroupListValue] = value;

    setListValue(tempListValue);

    let tempDefaultGrouplists = { ...defaultGrouplists };
    let listsIndex = tempDefaultGrouplists.lists.findIndex((tList: IGroupList) => tList._id === list._id);

    let listValueIndex = tempDefaultGrouplists.lists[listsIndex]!.values.findIndex((tValue: IGroupListValue) => tValue._id === listValue._id);

    tempDefaultGrouplists.lists[listsIndex]!.values[listValueIndex] = tempListValue;

    setDefaultGrouplists(tempDefaultGrouplists);
  }

  return (
    <div className="flex justify-between items-center px-2 border-b border-gray-600 pb-1">
      <input 
        name="long" 
        onChange={(e) => updateListItem(e.target.value, e.target.name)} 
        value={listValue.long}
        className="bg-gray-800 px-2 py-1 rounded text-gray-500" 
      />
      <div>
        <ColourPicker square={true} colour={value.colour} setColour={(pc) => updateListItem(pc, "colour")} />
      </div>
    </div>
  )
}

export default ListItem;