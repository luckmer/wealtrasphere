import Banner from '@components/Banner/Index'
import Typography from '@components/Typography/Index'
import { Component, Show } from 'solid-js'

export interface IProps {
  allocation: string
  chain: string
  balance: string
}

const AssetSummary: Component<IProps> = (props) => {
  return (
    <div class="flex flex-row w-full justify-between items-center px-12 gap-6">
      <div class="flex flex-row gap-12 items-center">
        <Banner label={props.chain} />
        <Typography color="white" text="body">
          Asset allocation ({props.allocation})
        </Typography>
      </div>
      <Show when={props.balance}>
        <Typography color="white" text="body">
          ${props.balance}
        </Typography>
      </Show>
    </div>
  )
}

export default AssetSummary
