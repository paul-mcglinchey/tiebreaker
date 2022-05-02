import { Switch as HeadlessSwitch } from '@headlessui/react'

interface ISwitchProps {
  enabled: boolean
  setEnabled: () => void
  description: string
}

const Switch = ({ enabled, setEnabled, description }: ISwitchProps) => {
  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-green-500' : 'bg-gray-900'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
    >
      <span className="sr-only">{description}</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-all`}
      />
    </HeadlessSwitch>
  )
}

export default Switch