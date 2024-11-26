import IconButton from '@components/buttons/IconButton/Index'
import Typography from '@components/Typography/Index'
import { BiRegularGhost } from 'solid-icons/bi'
import { CgAdd } from 'solid-icons/cg'
import { Component } from 'solid-js'

export interface IProps {
  onClickAddAccount: () => void
}

const MissingAccounts: Component<IProps> = (props) => {
  return (
    <div class="flex flex-col items-center gap-24">
      <BiRegularGhost size={164} fill="grey" />
      <div class="flex flex-col items-center gap-12">
        <Typography text="h1" color="grey">
          Whooops!
        </Typography>
        <Typography text="h1" color="grey">
          We couldn't find any accounts.
        </Typography>
      </div>
      <div class="bg-purple-200 hover:bg-purple-100 duration-[250ms] rounded-6">
        <IconButton
          onClick={props.onClickAddAccount}
          title="Add account"
          text="caption"
          color="black">
          <CgAdd color="black" />
        </IconButton>
      </div>
    </div>
  )
}

export default MissingAccounts
