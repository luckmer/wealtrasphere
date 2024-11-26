import { type Meta, type StoryObj } from 'storybook-solidjs'
import Typography from './Index'

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Components/Typography',
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  render: () => {
    return (
      <Typography color="grey" text="body">
        Typography
      </Typography>
    )
  },
}
