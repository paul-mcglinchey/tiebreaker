import { Fragment } from "react";

const InfoPillBox = (props) => {
  return (
    <Fragment>
      <span className="inline-block px-2 py-1 rounded-xl bg-purple-100 hover:bg-purple-800 hover:text-white font-bold">
        {props.children}: {props.data}
      </span>
    </Fragment>
  )
}

export default InfoPillBox;