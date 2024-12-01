import { typography } from '@common/typography'
import Typography from '@components/Typography/Index'
import { VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { ParentComponent } from 'solid-js'

export interface IProps {
  onClick: () => void
  title: string
  hideText?: boolean
  active?: boolean
  class?: string
  reverse?: boolean
  styles?: string
}

export interface ButtonProps extends IProps, VariantProps<typeof typography> {}

const IconButton: ParentComponent<ButtonProps> = (props) => {
  return (
    <div
      onClick={() => {
        props.onClick()
      }}
      class={clsx(
        props.styles,
        'rounded-6 flex flex-row gap-12 p-12 group group-hover:fill-white cursor-pointer transition-rotate duration-[250ms] w-full items-center'
      )}
      classList={{
        'bg-black-300': props.active ?? false,
        'flex-row-reverse justify-between': props.reverse,
      }}>
      {props.children}
      <div
        classList={{ 'w-[0px] opacity-0 invisible absolute': props.hideText }}
        class="transition-opacity duration-[250ms] ease-in-out ">
        <Typography {...props} color={props.color}>
          {props.title}
        </Typography>
      </div>
    </div>
  )
}

export default IconButton
