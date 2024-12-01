import { type Meta, type StoryObj } from 'storybook-solidjs'
import Banner from './Index'

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: 'Components/Banner',
}

export default meta
type Story = StoryObj<typeof Banner>

export const Default: Story = {
  render: () => {
    return <Banner label="Solana" />
  },
}
