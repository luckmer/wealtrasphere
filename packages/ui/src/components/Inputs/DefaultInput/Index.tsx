import { IEventInput } from '@interfaces/types/Index'
import { Component } from 'solid-js'

export interface IProps {
  error?: string
  placeholder?: string
  onChange: (value: IEventInput) => void
  onBlur?: () => void
  value: string
}

const DefaultInput: Component<IProps> = (props) => {
  return (
    <div class="w-full flex flex-col gap-4">
      <input
        onBlur={() => {
          props.onBlur?.()
        }}
        value={props.value}
        onInput={(e) => {
          props.onChange(e)
        }}
        class="w-full p-12 rounded-6 border border-solid  bg-black-400 outline-none text-white-100"
        classList={{
          'border-red-100': typeof props.error !== 'undefined',
          'border-black-400': !props.error,
        }}
        placeholder={props.placeholder ?? '...'}
      />
    </div>
  )
}

export default DefaultInput
