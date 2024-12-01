import { type Meta, type StoryObj } from 'storybook-solidjs'
import PortfolioBalance from './Index'

const meta: Meta<typeof PortfolioBalance> = {
  component: PortfolioBalance,
  title: 'Components/PortfolioBalance',
}
export default meta
type Story = StoryObj<typeof PortfolioBalance>

export const Default: Story = {
  render: () => {
    return <PortfolioBalance balance="165,737.8" profit={-0.00114} percent={-2.38} />
  },
}
export const Positive: Story = {
  render: () => {
    return <PortfolioBalance balance="165,737.8" profit={0.00114} percent={2.38} />
  },
}
