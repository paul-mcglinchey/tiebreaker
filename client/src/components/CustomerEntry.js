const CustomerEntry = (props) => {
  return (
    <div className="container flex justify-between p-3 my-2 border-black border-2 rounded">
      <div className="flex flex-col">
        <span className="inline-block">{props.name}</span>
        <span className="inline-block text-sm text-purple-600">{props.email}</span>
      </div>
      <div>

      </div>
    </div>
  )
}

export default CustomerEntry;