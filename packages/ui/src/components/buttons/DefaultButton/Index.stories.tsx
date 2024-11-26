import { type Meta, type StoryObj } from 'storybook-solidjs'
import DefaultButton from './Index'

const meta: Meta<typeof DefaultButton> = {
  component: DefaultButton,
  title: 'Components/Buttons/DefaultButton',
}

export default meta
type Story = StoryObj<typeof DefaultButton>

export const Default: Story = {
  render: () => {
    return <DefaultButton title="Portfolio" onClick={() => {}} />
  },
}
