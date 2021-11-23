import { Fragment } from "react";

const ClientSessions = (props) => {

  return (
    <Fragment>
      {props.clientData.length !== 0 && Array.isArray(props.clientData) && (
        <div className="flex-grow border-2 border-purple-300 rounded-xl">
          {props.clientData.map(s => {
            return (
              <div key={s._id}>
                {s.title}
              </div>
            )
          })}
        </div>
      )}
    </Fragment>
  )
}

export default ClientSessions;