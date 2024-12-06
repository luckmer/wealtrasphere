import Typography from '@components/Typography/Index'
import { Component } from 'solid-js'

export interface IProps {
  balance: string
  profit: number
  percent: number
}

export const PortfolioBalance: Component<IProps> = (props) => {
  return (
    <div class="flex flex-col gap-6">
      <Typography class="!text-[48px] !leading-[50px]" color="white">
        ${props.balance}
      </Typography>
      <div class="flex flex-row gap-6 items-center">
        <Typography text="body" color={props.profit > 0 ? 'green' : 'red'}>
          {props.profit}
        </Typography>
        <div
          class="p-4 rounded-6"
          classList={{
            'bg-green-translucent-100': props.percent > 0,
            'bg-red-translucent-100': props.percent < 0,
          }}>
          <Typography text="caption" color={props.percent > 0 ? 'green' : 'red'}>
            {props.percent}%
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PortfolioBalance
