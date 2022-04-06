import Dialog from "./Dialog";
interface IDeleteModalProps {
  dialogOpen: boolean,
  toggleDialogOpen: () => void,
  itemType: string
  deleteAction: () => void,
}

const DeleteDialog = ({ dialogOpen, toggleDialogOpen, itemType, deleteAction }: IDeleteModalProps) => {
  return (
    <Dialog 
      dialogOpen={dialogOpen} 
      toggleDialogOpen={toggleDialogOpen} 
      title={`Are you sure you want to delete this ${itemType}?`} 
      action={deleteAction} 
    />
  )
}

export default DeleteDialog;