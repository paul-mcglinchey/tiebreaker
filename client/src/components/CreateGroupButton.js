const CreateGroupButton = (props) => {

  const handleClick = () => {
    props.setNewClientActive(true);
    props.setFormVisible(true);
  }

  return (
    <div>
      <button type="button" onClick={() => handleClick()} className={props.className}>Create Group</button>
    </div>
  )
}

export default CreateGroupButton;