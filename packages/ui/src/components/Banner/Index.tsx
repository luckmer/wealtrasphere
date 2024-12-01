import Typography from '@components/Typography/Index'
import { Component } from 'solid-js'

export interface IProps {
  label: string
}

const Banner: Component<IProps> = (props) => {
  return (
    <div class="bg-black-300 p-6 px-12 rounded-6 inline-block">
      <Typography ellipsis color="white" text="small">
        {props.label}
      </Typography>
    </div>
  )
}

export default Banner
