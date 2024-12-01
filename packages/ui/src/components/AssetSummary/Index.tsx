import Typography from '@components/Typography/Index'
import { Component } from 'solid-js'

export interface IProps {
  allocation: string
  balance: string
}

const AssetSummary: Component<IProps> = (props) => {
  return (
    <div class="flex flex-row w-full justify-between">
      <Typography color="white" text="body">
        Asset allocation ({props.allocation})
      </Typography>
      <Typography color="white" text="body">
        ${props.balance}
      </Typography>
    </div>
  )
}

export default AssetSummary
