import { Fragment } from "react";

const InfoPillBox = (props) => {
  return (
    <Fragment>
      <span className="inline-block px-3 py-1 rounded-xl text-blue-500 transition-all font-bold border-blue-500 border-2">
        {props.children}: {props.data}
      </span>
    </Fragment>
  )
}

export default InfoPillBox;