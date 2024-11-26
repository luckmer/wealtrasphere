import { type Meta, type StoryObj } from 'storybook-solidjs'
import DropdownItem from './Index'

const meta: Meta<typeof DropdownItem> = {
  component: DropdownItem,
  title: 'Components/Dropdown/DropdownItem',
}
export default meta
type Story = StoryObj<typeof DropdownItem>

export const Default: Story = {
  render: () => {
    return <DropdownItem label="Item" onClick={() => {}} />
  },
}

export const Active: Story = {
  render: () => {
    return <DropdownItem label="Item" onClick={() => {}} isActive />
  },
}
