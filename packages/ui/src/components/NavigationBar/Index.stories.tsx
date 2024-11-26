import { type Meta, type StoryObj } from 'storybook-solidjs'
import NavigationBar from './Index'

const meta: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  title: 'Components/NavigationBar',
}

export default meta
type Story = StoryObj<typeof NavigationBar>

export const Default: Story = {
  render: () => {
    return <NavigationBar onClickAddAccount={() => {}} />
  },
}
