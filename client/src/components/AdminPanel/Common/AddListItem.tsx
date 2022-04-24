import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { IconButtonSize, IList, IListCollection, IListValue } from "../../../models";
import { generateColour } from "../../../services";
import { Button, ColourPicker, SquareIconButton } from "../../Common";
import ListItemInput from "./ListItemInput";

interface IAddListItemProps {
  setSystemListCollection: (state: React.SetStateAction<IListCollection>, cb?: (state: IListCollection | undefined) => void) => void,
  updateSystemListCollection: (lists: IListCollection) => void,
  listId: string
}

const AddListItem = ({ setSystemListCollection, updateSystemListCollection, listId }: IAddListItemProps) => {

  const [values, setValues] = useState<IListValue>({
    short: '',
    long: '',
    colour: generateColour()
  })

  const addListItem = () => {
    setSystemListCollection(systemListCollection => ({
      ...systemListCollection,
      lists: systemListCollection.lists.map((tList: IList) => {
        console.log(tList._id === listId);
        return tList._id === listId ? {
          ...tList,
          values: [...tList.values, values]
        } : tList
      })
    }), lists => lists && updateSystemListCollection(lists));

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