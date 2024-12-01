import Typography from '@components/Typography/Index'
import { IAccount } from '@interfaces/interfaces/accounts'
import { Component } from 'solid-js'
import {
  capitalizeFirstLetter,
  formatBalance,
  getNativeTokenSymbol,
  shortAddress,
} from '@utils/index'
import { BsThreeDotsVertical } from 'solid-icons/bs'
import Banner from '@components/Banner/Index'

export interface IProps extends IAccount {
  onClick: () => void
  onClickEditAccount: () => void
}

const Account: Component<IProps> = (props) => {
  return (
    <div class="bg-black-400 border border-solid border-black-300  rounded h-auto rounded-6 cursor-pointer p-12">
      <div class="flex flex-col gap-12">
        <div class="flex flex-row gap-12 w-full justify-between items-center">
          <Banner label={capitalizeFirstLetter(props.chain)} />
          <div class="flex flex-row gap-12 items-center">
            <Typography ellipsis color="white" text="caption">
              {shortAddress(props.accountAddress)}
            </Typography>
            <BsThreeDotsVertical
              onClick={() => {
                props.onClickEditAccount()
              }}
              size={18}
              class="hover:fill-purple-200 fill-black-100"
            />
          </div>
        </div>
        <div>
          <Typography ellipsis color="white" text="caption">
            {props.accountName}
          </Typography>
        </div>
        <div class="border-t border-solid border-black-300">
          <div class="flex w-full justify-between pt-12">
            <div class="flex flex-col gap-12">
              <Typography ellipsis color="white" text="caption">
                Balance
              </Typography>
              <Typography ellipsis color="white" text="body">
                {`${formatBalance(props.balance)} ${getNativeTokenSymbol(props.chain)}`}
              </Typography>
            </div>
            <div class="flex flex-col gap-12 text-right">
              <Typography ellipsis color="white" text="caption">
                (Soon)
              </Typography>
              <Typography ellipsis color="white" text="body">
                ---
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
