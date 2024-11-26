import { type Meta, type StoryObj } from 'storybook-solidjs'
import Accounts from './Index'

const meta: Meta<typeof Accounts> = {
  component: Accounts,
  title: 'Pages/Accounts',
}

export default meta
type Story = StoryObj<typeof Accounts>

export const Default: Story = {
  render: () => {
    return (
      <Accounts
        onClickAddAccount={() => {}}
        accounts={[]}
        isFetching={false}
        onClickEditAccount={() => {}}
        onClickOpenAccount={() => {}}
      />
    )
  },
}
