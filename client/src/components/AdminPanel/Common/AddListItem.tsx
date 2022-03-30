import { useState } from "react";
import { generateColour } from "../../../services";
import { ColourPicker } from "../../Common";
import ListItemInput from "./ListItemInput";

const AddListItem = () => {

  const [values, setValues] = useState({
    short: '',
    long: '',
    colour: generateColour()
  })


  return (
    <div className="px-2">
      <ListItemInput value={values.long} name="long" updateListItem={() => )}/>
      <ColourPicker colour={values.colour} setColour={(pc) => setValues(values => ({ ...values, colour: pc }))} />
    </div>
  )
}

export default AddListItem;