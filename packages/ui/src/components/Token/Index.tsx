import Typography from '@components/Typography/Index'
import { shortAddress } from '@utils/index'
import { Component } from 'solid-js'

export interface IProps {
  label: string
  address: string
  balance: string
  value: string
  price: string
}

const Token: Component<IProps> = (props) => {
  return (
    <div class="p-12 rounded-6 grid grid-cols-4 gap-6 items-center cursor-pointer hover:bg-black-300">
      <div class="flex flex-row gap-12 items-center">
        <div class="w-24 h-24 rounded-100 bg-blue-100" />
        <div class="flex flex-col gap-4">
          <Typography color="white" text="caption">
            {props.label}
          </Typography>
          <Typography color="white" text="caption">
            {shortAddress(props.address)}
          </Typography>
        </div>
      </div>
      <Typography class="text-right" text="body" color="white">
        {props.balance}
      </Typography>
      <Typography class="text-right" text="body" color="white">
        {props.balance}
      </Typography>
      <Typography class="text-right" text="body" color="white">
        ${props.value}
      </Typography>
    </div>
  )
}

export default Token
