import { type Meta, type StoryObj } from 'storybook-solidjs'
import DropdownList from './Index'

const meta: Meta<typeof DropdownList> = {
  component: DropdownList,
  title: 'Components/Dropdown/DropdownList',
}
export default meta
type Story = StoryObj<typeof DropdownList>

export const Default: Story = {
  render: () => {
    return (
      <DropdownList
        activeElement="Item 1"
        data={['Item 1', 'Item 2']}
        onClick={(name) => {
          console.log('clicked', name)
        }}
      />
    )
  },
}
