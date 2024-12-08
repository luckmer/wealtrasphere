import clsx from 'clsx'
import { ParentComponent } from 'solid-js'
import { IEventType } from '@interfaces/types/Index'

export interface IProps {
  onFocusOut?: (event: IEventType) => void
  styles?: string
}

const Dropdown: ParentComponent<IProps> = (props) => {
  return (
    <div
      tabIndex={0}
      class={clsx(props.styles, 'dropdown  flex gap-[12px] flex-col')}
      onFocusOut={(el) => props.onFocusOut?.(el)}>
      {props.children}
    </div>
  )
}

export default Dropdown
