import { type Meta, type StoryObj } from 'storybook-solidjs'
import MissingAccounts from './Index'

const meta: Meta<typeof MissingAccounts> = {
  component: MissingAccounts,
  title: 'Components/MissingAccounts',
}

export default meta
type Story = StoryObj<typeof MissingAccounts>

export const Default: Story = {
  render: () => {
    return (
      <MissingAccounts
        onClickAddAccount={() => {
          console.log('add accounts')
        }}
      />
    )
  },
}
