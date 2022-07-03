import { IPermission } from "../../models"
import { ListboxMultiSelector } from "."
import { usePermissionService } from "../../hooks"

interface IPermissionMultiSelectorProps {
  label: string,
  showLabel?: boolean
  initialSelected: IPermission[]
  onUpdate: (permissions: IPermission[]) => void
  classes?: string
  selectorClasses?: string
  optionsClasses?: string
}

const PermissionMultiSelector = (props: IPermissionMultiSelectorProps) => {

  const { permissions } = usePermissionService()

  return (
    <ListboxMultiSelector<IPermission>
      {...props}
      items={permissions}
      labelFieldName="name"
    />
  )
}

export default PermissionMultiSelector