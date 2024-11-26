import { type Meta, type StoryObj } from 'storybook-solidjs'
import Account from './Index'
import { BLOCKCHAIN } from '@interfaces/enums'

const meta: Meta<typeof Account> = {
  component: Account,
  title: 'Components/Account',
}

export default meta
type Story = StoryObj<typeof Account>

export const Default: Story = {
  render: () => {
    return (
      <Account
        onClick={() => {}}
        onClickEditAccount={() => {}}
        id="1"
        balance={0.46}
        accountName="Account 1"
        accountAddress="0x1234567890"
        chain={BLOCKCHAIN.SOLANA}
      />
    )
  },
}
