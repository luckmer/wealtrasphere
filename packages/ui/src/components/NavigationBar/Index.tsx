import IconButton from '@components/buttons/IconButton/Index'
import Typography from '@components/Typography/Index'
import { RiSystemAddCircleLine } from 'solid-icons/ri'
import { Component } from 'solid-js'

export interface IProps {
  onClickAddAccount: () => void
}

const NavigationBar: Component<IProps> = (props) => {
  return (
    <div class="w-full flex flex-row justify-between items-center pr-16">
      <Typography text="h2Medium" color="white">
        Accounts
      </Typography>
      <div class="bg-purple-200 hover:bg-purple-100 duration-[250ms] rounded-6">
        <IconButton
          onClick={props.onClickAddAccount}
          title="Add account"
          text="smallBold"
          color="black">
          <RiSystemAddCircleLine color="black" />
        </IconButton>
      </div>
    </div>
  )
}

export default NavigationBar
