import { type Meta, type StoryObj } from 'storybook-solidjs'
import Progressbar from './Index'

const meta: Meta<typeof Progressbar> = {
  component: Progressbar,
  title: 'Pages/Progressbar',
}

export default meta
type Story = StoryObj<typeof Progressbar>

export const Default: Story = {
  render: () => {
    return <Progressbar step={1} />
  },
}
