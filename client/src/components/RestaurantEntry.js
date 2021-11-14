const RestaurantEntry = (props) => {
  return (
    <div className="container flex justify-between">
      <div>{props.name}</div>
      <div>{props.cuisine}</div>
    </div>
  )
}

export default RestaurantEntry;