import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { IconButtonSize, IGroupList, IGrouplistResponse, IGroupListValue } from "../../../models";
import { generateColour } from "../../../services";
import { Button, ColourPicker, SquareIconButton } from "../../Common";
import ListItemInput from "./ListItemInput";

interface IAddListItemProps {
  setDefaultGrouplists: (state: React.SetStateAction<IGrouplistResponse>, cb?: (state: IGrouplistResponse) => void) => void,
  updateDefaultLists: (lists: IGrouplistResponse) => void,
  listId: string
}

const AddListItem = ({ setDefaultGrouplists, updateDefaultLists, listId }: IAddListItemProps) => {

  const [values, setValues] = useState<IGroupListValue>({
    short: '',
    long: '',
    colour: generateColour()
  })

  const addListItem = () => {
    setDefaultGrouplists(defaultGrouplists => ({
      ...defaultGrouplists,
      lists: defaultGrouplists.lists.map((tList: IGroupList) => {
        console.log(tList._id === listId);
        return tList._id === listId ? {
          ...tList,
          values: [...tList.values, values]
        } : tList
      })
    }), lists => updateDefaultLists(lists));

    setValues({ short: '', long: '', colour: generateColour() });
  }

  const clearValues = (): void => {
    setValues({ short: '', long: '', colour: generateColour() });
  }

  return (
    <div className="flex flex-col px-2 space-y-4">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <ListItemInput value={values.long} name="long" placeholder="List item label" onChange={(value) => setValues(values => ({ ...values, long: value }))} />
          <ListItemInput value={values.short || ''} name="short" placeholder="List item short name" onChange={(value) => setValues(values => ({ ...values, short: value }))} />
        </div>
        <div className="flex space-x-2">
          <ColourPicker square colour={values.colour} setColour={(pc) => setValues(values => ({ ...values, colour: pc }))} />
          <SquareIconButton buttonSize={IconButtonSize.XS} colour="red-500" Icon={XIcon} action={() => clearValues()} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="button" action={() => addListItem()} content="Add item" />
      </div>
    </div>
  )
}

export default AddListItem;